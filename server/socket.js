import jwt from "jsonwebtoken";
import { User } from "./models/User.model.js";
import { Chat } from "./models/Chat.model.js";
import { Message } from "./models/Message.model.js";

/**
 * Initialize Socket.IO on the HTTP server.
 * @param {import("socket.io").Server} io
 */
export function initializeSocket(io) {
  // ─── JWT Authentication Middleware ───────────────────────────────
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.cookie
          ?.split("; ")
          .find((c) => c.startsWith("accessToken="))
          ?.split("=")[1];

      if (!token) return next(new Error("Authentication required"));

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded._id).select(
        "_id name avatar email",
      );

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  // ─── Connection Handler ─────────────────────────────────────────
  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();
    console.log(`⚡ Socket connected: ${socket.user.name} (${userId})`);

    // Join personal room for direct targeting
    socket.join(`user:${userId}`);

    // Broadcast online status
    socket.broadcast.emit("user_online", { userId });

    // ── join_chat ──────────────────────────────────────────────────
    socket.on("join_chat", async ({ chatId }) => {
      try {
        const chat = await Chat.findOne({
          _id: chatId,
          participants: socket.user._id,
        });

        if (!chat) {
          return socket.emit("error", { message: "Chat not found" });
        }

        socket.join(`chat:${chatId}`);
        console.log(`${socket.user.name} joined chat:${chatId}`);
      } catch (err) {
        socket.emit("error", { message: "Failed to join chat" });
      }
    });

    // ── leave_chat ────────────────────────────────────────────────
    socket.on("leave_chat", ({ chatId }) => {
      socket.leave(`chat:${chatId}`);
    });

    // ── send_message ──────────────────────────────────────────────
    socket.on("send_message", async ({ chatId, content }) => {
      try {
        if (!content || !content.trim()) return;
        if (!chatId) return;

        // Verify sender is participant
        const chat = await Chat.findOne({
          _id: chatId,
          participants: socket.user._id,
        });

        if (!chat) {
          return socket.emit("error", { message: "Not a participant" });
        }

        // Save message to DB
        const message = await Message.create({
          chatId,
          senderId: socket.user._id,
          content: content.trim(),
          type: "text",
        });

        // Update chat's lastMessage
        chat.lastMessage = {
          content: content.trim().slice(0, 100),
          senderId: socket.user._id,
          createdAt: message.createdAt,
        };
        chat.updatedAt = new Date();
        await chat.save();

        const messageObj = {
          _id: message._id,
          chatId: message.chatId,
          senderId: message.senderId,
          content: message.content,
          type: message.type,
          createdAt: message.createdAt,
        };

        // Emit to everyone in the chat room (including sender for confirmation)
        io.to(`chat:${chatId}`).emit("receive_message", messageObj);

        // Also emit to participants' personal rooms (in case they haven't joined the chat room)
        chat.participants.forEach((pId) => {
          const pid = pId.toString();
          if (pid !== userId) {
            io.to(`user:${pid}`).emit("new_message_notification", {
              chatId,
              message: messageObj,
            });
          }
        });
      } catch (err) {
        console.error("send_message error:", err);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // ── typing indicators ─────────────────────────────────────────
    socket.on("typing", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("user_typing", { userId, chatId });
    });

    socket.on("stop_typing", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("user_stop_typing", { userId, chatId });
    });

    // ── disconnect ────────────────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${socket.user.name}`);
      socket.broadcast.emit("user_offline", { userId });
    });
  });
}
