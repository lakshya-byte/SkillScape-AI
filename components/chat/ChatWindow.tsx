"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
}

interface ChatWindowProps {
  chatId: string;
  currentUserId: string;
  friendName: string;
}

export default function ChatWindow({
  chatId,
  currentUserId,
  friendName,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/chats/${chatId}/messages`);
        setMessages(res.data?.data?.messages || []);
      } catch (err) {
        console.error("Load messages failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [chatId]);

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Socket — join chat room + listen for messages
  useEffect(() => {
    const socket = getSocket();

    socket.emit("join_chat", { chatId });

    const handleReceive = (message: Message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => {
          // Prevent duplicates
          if (prev.some((m) => m._id === message._id)) return prev;
          return [...prev, message];
        });
      }
    };

    const handleTyping = ({ userId }: { userId: string; chatId: string }) => {
      if (userId !== currentUserId) setTyping(true);
    };

    const handleStopTyping = ({
      userId,
    }: {
      userId: string;
      chatId: string;
    }) => {
      if (userId !== currentUserId) setTyping(false);
    };

    socket.on("receive_message", handleReceive);
    socket.on("user_typing", handleTyping);
    socket.on("user_stop_typing", handleStopTyping);

    return () => {
      socket.emit("leave_chat", { chatId });
      socket.off("receive_message", handleReceive);
      socket.off("user_typing", handleTyping);
      socket.off("user_stop_typing", handleStopTyping);
    };
  }, [chatId, currentUserId]);

  // Send message
  const handleSend = useCallback(
    (content: string) => {
      const socket = getSocket();
      socket.emit("send_message", { chatId, content });
    },
    [chatId],
  );

  const handleTyping = useCallback(() => {
    const socket = getSocket();
    socket.emit("typing", { chatId });
  }, [chatId]);

  const handleStopTyping = useCallback(() => {
    const socket = getSocket();
    socket.emit("stop_typing", { chatId });
  }, [chatId]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-gray-500">No messages yet</p>
            <p className="text-xs text-gray-600 mt-1">
              Say hello to {friendName}!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              content={msg.content}
              isMine={msg.senderId === currentUserId}
              timestamp={msg.createdAt}
            />
          ))
        )}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-center gap-2 px-3 py-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
              <div
                className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <span className="text-[11px] text-gray-500">
              {friendName} is typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput
        onSend={handleSend}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
}
