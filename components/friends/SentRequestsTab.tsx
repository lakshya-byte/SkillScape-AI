"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Clock, Inbox } from "lucide-react";
import api from "@/lib/api";

interface RequestUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  institute?: string;
}

interface OutgoingRequest {
  _id: string;
  receiver: RequestUser;
  createdAt: string;
}

interface SentRequestsTabProps {
  onCountChange?: (count: number) => void;
}

export default function SentRequestsTab({
  onCountChange,
}: SentRequestsTabProps) {
  const [outgoing, setOutgoing] = useState<OutgoingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/friends/pending");
      const data = res.data?.data || {};
      const out = data.outgoing || [];
      setOutgoing(out);
      onCountChange?.(out.length);
    } catch (err) {
      console.error("Fetch sent requests failed:", err);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleCancel = useCallback(async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await api.delete(`/friends/cancel/${requestId}`);
      setOutgoing((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (outgoing.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
          <Inbox className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-400 mb-1">
          No sent requests
        </h3>
        <p className="text-xs text-gray-600 max-w-xs">
          Go to Discover to find and add new friends
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
        Sent Requests ({outgoing.length})
      </h3>
      <div className="space-y-2">
        {outgoing.map((req) => (
          <div
            key={req._id}
            className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0d0b18]/80 transition-all hover:border-violet-500/10"
          >
            {req.receiver.avatar ? (
              <img
                src={req.receiver.avatar}
                alt={req.receiver.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10">
                {getInitials(req.receiver.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {req.receiver.name}
              </p>
              {req.receiver.institute && (
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {req.receiver.institute}
                </p>
              )}
              <p className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {timeAgo(req.createdAt)}
              </p>
            </div>
            <button
              onClick={() => handleCancel(req._id)}
              disabled={actionLoading === req._id}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50 shrink-0"
            >
              {actionLoading === req._id ? "..." : "Cancel"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
