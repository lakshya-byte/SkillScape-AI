"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

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

interface ChatSidebarProps {
  chats: ChatItem[];
  activeChatId: string | null;
  onSelect: (chat: ChatItem) => void;
  loading?: boolean;
}

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelect,
  loading,
}: ChatSidebarProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const timeLabel = (date?: string) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  if (loading) {
    return (
      <div className="p-3 space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.06]" />
            <div className="flex-1">
              <div className="h-3 w-24 bg-white/[0.06] rounded mb-2" />
              <div className="h-2.5 w-32 bg-white/[0.04] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <MessageCircle className="w-8 h-8 text-gray-600 mb-3" />
        <p className="text-xs text-gray-500">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-0.5 overflow-y-auto">
      {chats.map((chat) => (
        <button
          key={chat._id}
          onClick={() => onSelect(chat)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
            activeChatId === chat._id
              ? "bg-violet-600/20 border border-violet-500/20"
              : "hover:bg-white/[0.04] border border-transparent"
          }`}
        >
          {chat.friend.avatar ? (
            <img
              src={chat.friend.avatar}
              alt={chat.friend.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10 shrink-0">
              {getInitials(chat.friend.name)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white truncate">
                {chat.friend.name}
              </p>
              {chat.lastMessage?.createdAt && (
                <span className="text-[10px] text-gray-600 shrink-0 ml-2">
                  {timeLabel(chat.lastMessage.createdAt)}
                </span>
              )}
            </div>
            {chat.lastMessage?.content && (
              <p className="text-[11px] text-gray-500 truncate mt-0.5">
                {chat.lastMessage.content}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
