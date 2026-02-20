"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import { useUser } from "@/contexts/UserContext";
import { getSocket, disconnectSocket } from "@/lib/socket";
import ChatSidebar from "./ChatLayout";
import ChatWindow from "./ChatWindow";

interface ChatItem {
  _id: string;
  friend: {
    _id: string;
    name: string;
    avatar?: string;
  };
  lastMessage?: {
    content: string;
    createdAt: string;
  };
}

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  initialFriendId?: string | null;
}

export default function ChatPanel({
  open,
  onClose,
  initialFriendId,
}: ChatPanelProps) {
  const { user } = useUser();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null);

  // Fetch chat list
  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/chats");
      setChats(res.data?.data || []);
    } catch (err) {
      console.error("Fetch chats failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Connect socket on open
  useEffect(() => {
    if (open) {
      getSocket();
      fetchChats();
    }
  }, [open, fetchChats]);

  // Open chat with friend if initialFriendId is provided
  useEffect(() => {
    if (!open || !initialFriendId) return;

    const openChat = async () => {
      try {
        const res = await api.post(`/chats/${initialFriendId}`);
        const chat = res.data?.data;
        if (chat) {
          const friend = chat.participants?.find(
            (p: any) => p._id !== user?._id,
          );
          const chatItem: ChatItem = {
            _id: chat._id,
            friend: friend || { _id: initialFriendId, name: "Friend" },
            lastMessage: chat.lastMessage,
          };
          setActiveChat(chatItem);
          // Refresh chat list to include the new chat
          fetchChats();
        }
      } catch (err) {
        console.error("Open chat failed:", err);
      }
    };

    openChat();
  }, [open, initialFriendId, user?._id, fetchChats]);

  // Listen for new message notifications to refresh sidebar
  useEffect(() => {
    if (!open) return;
    const socket = getSocket();

    const handleNotification = () => {
      fetchChats();
    };

    socket.on("new_message_notification", handleNotification);
    return () => {
      socket.off("new_message_notification", handleNotification);
    };
  }, [open, fetchChats]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[800px] bg-[#0a0a14] border-l border-white/[0.06] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#0a0a14]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            {activeChat && (
              <button
                onClick={() => setActiveChat(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all md:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <MessageCircle className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              {activeChat ? activeChat.friend.name : "Messages"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div
            className={`w-[280px] border-r border-white/[0.06] shrink-0 ${
              activeChat ? "hidden md:block" : ""
            }`}
          >
            <ChatSidebar
              chats={chats}
              activeChatId={activeChat?._id || null}
              onSelect={setActiveChat}
              loading={loading}
            />
          </div>

          {/* Chat Window */}
          <div className={`flex-1 ${!activeChat ? "hidden md:flex" : "flex"}`}>
            {activeChat && user ? (
              <div className="flex-1 flex flex-col">
                <ChatWindow
                  chatId={activeChat._id}
                  currentUserId={user._id}
                  friendName={activeChat.friend.name}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Select a conversation</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Choose a friend from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
