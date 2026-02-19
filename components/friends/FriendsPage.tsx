"use client";

import React, { useState, useCallback } from "react";
import { Users } from "lucide-react";
import FriendsTabs, { TabKey } from "./FriendsTabs";
import DiscoverTab from "./DiscoverTab";
import FriendsTab from "./FriendsTab";
import SentRequestsTab from "./SentRequestsTab";
import ReceivedRequestsTab from "./ReceivedRequestsTab";
import ChatPanel from "../chat/ChatPanel";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Discover");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFriendId, setChatFriendId] = useState<string | null>(null);
  const [receivedCount, setReceivedCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  const handleOpenChat = useCallback((friendId: string) => {
    setChatFriendId(friendId);
    setChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setChatOpen(false);
    setChatFriendId(null);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/20">
              <Users className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Friends
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-[52px]">
            Connect, chat, and collaborate with your network
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <FriendsTabs
          active={activeTab}
          onChange={setActiveTab}
          receivedCount={receivedCount}
          sentCount={sentCount}
        />
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "Discover" && <DiscoverTab />}
        {activeTab === "My Friends" && <FriendsTab onChat={handleOpenChat} />}
        {activeTab === "Sent Requests" && (
          <SentRequestsTab onCountChange={setSentCount} />
        )}
        {activeTab === "Received" && (
          <ReceivedRequestsTab onCountChange={setReceivedCount} />
        )}
      </div>

      {/* Chat Panel */}
      <ChatPanel
        open={chatOpen}
        onClose={handleCloseChat}
        initialFriendId={chatFriendId}
      />
    </div>
  );
}
