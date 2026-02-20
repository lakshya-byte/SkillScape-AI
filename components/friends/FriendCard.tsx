"use client";

import React from "react";
import { MessageCircle, UserX } from "lucide-react";

interface FriendCardProps {
  friend: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    institute?: string;
  };
  onChat: (friendId: string) => void;
  onUnfriend: (friendId: string) => void;
  loading?: string | null;
}

export default function FriendCard({
  friend,
  onChat,
  onUnfriend,
  loading,
}: FriendCardProps) {
  const isLoading = loading === friend._id;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-[#0d0b18]/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {friend.avatar ? (
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/10">
            {getInitials(friend.name)}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">
            {friend.name}
          </h3>
          {friend.institute && (
            <p className="text-[11px] text-gray-500 truncate mt-0.5">
              {friend.institute}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onChat(friend._id)}
            className="p-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/40 text-violet-400 transition-all"
            title="Chat"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUnfriend(friend._id)}
            disabled={isLoading}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all disabled:opacity-50"
            title="Unfriend"
          >
            <UserX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
