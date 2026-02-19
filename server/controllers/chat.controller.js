import { Chat } from "../models/Chat.model.js";
import { Message } from "../models/Message.model.js";
import { FriendRequest } from "../models/FriendRequest.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// ─── POST /api/chats/:friendId — get or create a 1-on-1 chat ────
export const getOrCreateChat = async (req, res) => {
  try {
    const myId = req.user._id;
    const friendId = req.params.friendId;

    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json(new ApiError(400, "Invalid user ID"));
    }

    if (myId.toString() === friendId) {
      return res
        .status(400)
        .json(new ApiError(400, "Cannot chat with yourself"));
    }

    // Verify friendship
    const friendship = await FriendRequest.findOne({
      status: "accepted",
      $or: [
        { sender: myId, receiver: friendId },
        { sender: friendId, receiver: myId },
      ],
    });

    if (!friendship) {
      return res
        .status(403)
        .json(new ApiError(403, "You can only chat with friends"));
    }

    // Sort IDs to ensure consistent participant order (prevents duplicates)
    const participants = [myId.toString(), friendId].sort();

    let chat = await Chat.findOne({
      participants: { $all: participants, $size: 2 },
    });

    if (!chat) {
      chat = await Chat.create({ participants });
    }

    // Populate participant info
    await chat.populate("participants", "name avatar email institute");

    return res.status(200).json(new ApiResponse(200, chat, "Chat ready"));
  } catch (error) {
    console.error("getOrCreateChat error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// ─── GET /api/chats — list all chats for current user ────────────
export const getMyChats = async (req, res) => {
  try {
    const myId = req.user._id;

    const chats = await Chat.find({ participants: myId })
      .populate("participants", "name avatar email institute")
      .sort({ updatedAt: -1 })
      .lean();

    // Add a `friend` field with the other participant for convenience
    const result = chats.map((chat) => {
      const friend = chat.participants.find(
        (p) => p._id.toString() !== myId.toString(),
      );
      return { ...chat, friend };
    });

    return res.status(200).json(new ApiResponse(200, result, "Chats fetched"));
  } catch (error) {
    console.error("getMyChats error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// ─── GET /api/chats/:chatId/messages?page=1&limit=50 ────────────
export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { chatId } = req.params;

    if (!mongoose.isValidObjectId(chatId)) {
      return res.status(400).json(new ApiError(400, "Invalid chat ID"));
    }

    // Verify user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: myId,
    });

    if (!chat) {
      return res
        .status(404)
        .json(new ApiError(404, "Chat not found or access denied"));
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const messages = await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Message.countDocuments({ chatId });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          messages: messages.reverse(), // Return in chronological order
          page,
          totalPages: Math.ceil(total / limit),
          total,
        },
        "Messages fetched",
      ),
    );
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};
