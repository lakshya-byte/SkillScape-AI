"use client";

import React from "react";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    institute?: string;
    role?: string;
    friendshipStatus: "none" | "pending_sent" | "pending_received" | "friends";
    requestId?: string | null;
  };
  onAddFriend: (userId: string) => void;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onCancel: (requestId: string) => void;
  loading?: string | null;
}

export default function UserCard({
  user,
  onAddFriend,
  onAccept,
  onReject,
  onCancel,
  loading,
}: UserCardProps) {
  const isLoading = loading === user._id;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-[#0d0b18]/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/10">
              {getInitials(user.name)}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0d0b18]" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">
            {user.name}
          </h3>
          {user.institute && (
            <p className="text-[11px] text-gray-500 truncate mt-0.5">
              {user.institute}
            </p>
          )}
          {user.role && (
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.15em] text-violet-400/70 bg-violet-500/10 px-2 py-0.5 rounded-full mt-1.5">
              {user.role}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          {user.friendshipStatus === "none" && (
            <button
              onClick={() => onAddFriend(user._id)}
              disabled={isLoading}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all disabled:opacity-50"
            >
              {isLoading ? "..." : "Add Friend"}
            </button>
          )}

          {user.friendshipStatus === "pending_sent" && (
            <button
              onClick={() => user.requestId && onCancel(user.requestId)}
              disabled={isLoading}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50"
            >
              {isLoading ? "..." : "Pending"}
            </button>
          )}

          {user.friendshipStatus === "pending_received" && (
            <div className="flex gap-1.5">
              <button
                onClick={() => user.requestId && onAccept(user.requestId)}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all disabled:opacity-50"
              >
                Accept
              </button>
              <button
                onClick={() => user.requestId && onReject(user.requestId)}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}

          {user.friendshipStatus === "friends" && (
            <span className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Friends ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
