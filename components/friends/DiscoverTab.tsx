"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Users } from "lucide-react";
import api from "@/lib/api";
import UserCard from "./UserCard";

interface SearchUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  institute?: string;
  role?: string;
  friendshipStatus: "none" | "pending_sent" | "pending_received" | "friends";
  requestId: string | null;
}

export default function DiscoverTab() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch users — on mount (all users) and on query change (filtered)
  const fetchUsers = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      const url = searchQuery.trim()
        ? `/friends/search?q=${encodeURIComponent(searchQuery)}`
        : `/friends/search`;
      const res = await api.get(url);
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all users on mount
  useEffect(() => {
    fetchUsers("");
  }, [fetchUsers]);

  // Debounced search on query change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, fetchUsers]);

  const handleAddFriend = useCallback(async (userId: string) => {
    setActionLoading(userId);
    try {
      await api.post(`/friends/request/${userId}`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, friendshipStatus: "pending_sent" } : u,
        ),
      );
    } catch (err: any) {
      console.error("Add friend failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleAccept = useCallback(async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await api.patch(`/friends/accept/${requestId}`);
      setUsers((prev) =>
        prev.map((u) =>
          u.requestId === requestId ? { ...u, friendshipStatus: "friends" } : u,
        ),
      );
    } catch (err) {
      console.error("Accept failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleReject = useCallback(async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await api.patch(`/friends/reject/${requestId}`);
      setUsers((prev) =>
        prev.map((u) =>
          u.requestId === requestId
            ? { ...u, friendshipStatus: "none", requestId: null }
            : u,
        ),
      );
    } catch (err) {
      console.error("Reject failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleCancel = useCallback(async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await api.delete(`/friends/cancel/${requestId}`);
      setUsers((prev) =>
        prev.map((u) =>
          u.requestId === requestId
            ? { ...u, friendshipStatus: "none", requestId: null }
            : u,
        ),
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-[#080515] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400 animate-spin" />
        )}
      </div>

      {/* Results */}
      {loading && users.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
            <Users className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-400 mb-1">
            {query.trim() ? `No users found for "${query}"` : "No users found"}
          </h3>
          <p className="text-xs text-gray-600 max-w-xs">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onAddFriend={handleAddFriend}
              onAccept={handleAccept}
              onReject={handleReject}
              onCancel={handleCancel}
              loading={actionLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
