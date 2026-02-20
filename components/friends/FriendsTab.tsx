"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Users } from "lucide-react";
import api from "@/lib/api";
import FriendCard from "./FriendCard";

interface Friend {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  institute?: string;
  since: string;
}

interface FriendsTabProps {
  onChat: (friendId: string) => void;
}

export default function FriendsTab({ onChat }: FriendsTabProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/friends");
      setFriends(res.data?.data || []);
    } catch (err) {
      console.error("Fetch friends failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleUnfriend = useCallback(async (userId: string) => {
    if (!confirm("Are you sure you want to unfriend this person?")) return;
    setActionLoading(userId);
    try {
      await api.delete(`/friends/unfriend/${userId}`);
      setFriends((prev) => prev.filter((f) => f._id !== userId));
    } catch (err) {
      console.error("Unfriend failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
          <Users className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-400 mb-1">
          No friends yet
        </h3>
        <p className="text-xs text-gray-600 max-w-xs">
          Go to the Discover tab to find and connect with people
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {friends.map((friend) => (
        <FriendCard
          key={friend._id}
          friend={friend}
          onChat={onChat}
          onUnfriend={handleUnfriend}
          loading={actionLoading}
        />
      ))}
    </div>
  );
}
