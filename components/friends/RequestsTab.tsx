"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Inbox, Clock } from "lucide-react";
import api from "@/lib/api";

interface RequestUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  institute?: string;
}

interface IncomingRequest {
  _id: string;
  sender: RequestUser;
  createdAt: string;
}

interface OutgoingRequest {
  _id: string;
  receiver: RequestUser;
  createdAt: string;
}

interface RequestsTabProps {
  onCountChange?: (count: number) => void;
}

export default function RequestsTab({ onCountChange }: RequestsTabProps) {
  const [incoming, setIncoming] = useState<IncomingRequest[]>([]);
  const [outgoing, setOutgoing] = useState<OutgoingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/friends/pending");
      const data = res.data?.data || {};
      setIncoming(data.incoming || []);
      setOutgoing(data.outgoing || []);
      onCountChange?.(data.incoming?.length || 0);
    } catch (err) {
      console.error("Fetch pending failed:", err);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleAccept = useCallback(async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await api.patch(`/friends/accept/${requestId}`);
      setIncoming((prev) => prev.filter((r) => r._id !== requestId));
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
      setIncoming((prev) => prev.filter((r) => r._id !== requestId));
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

  if (incoming.length === 0 && outgoing.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
          <Inbox className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-400 mb-1">
          No pending requests
        </h3>
        <p className="text-xs text-gray-600 max-w-xs">
          All caught up! Check back later or search for new people
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Incoming */}
      {incoming.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
            Incoming Requests ({incoming.length})
          </h3>
          <div className="space-y-2">
            {incoming.map((req) => (
              <div
                key={req._id}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0d0b18]/80"
              >
                {req.sender.avatar ? (
                  <img
                    src={req.sender.avatar}
                    alt={req.sender.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10">
                    {getInitials(req.sender.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {req.sender.name}
                  </p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(req.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(req._id)}
                    disabled={actionLoading === req._id}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    disabled={actionLoading === req._id}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outgoing */}
      {outgoing.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
            Sent Requests ({outgoing.length})
          </h3>
          <div className="space-y-2">
            {outgoing.map((req) => (
              <div
                key={req._id}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0d0b18]/80"
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
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(req.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(req._id)}
                  disabled={actionLoading === req._id}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50 shrink-0"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
