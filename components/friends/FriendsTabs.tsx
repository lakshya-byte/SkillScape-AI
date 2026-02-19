"use client";

import React from "react";

const TABS = ["Discover", "My Friends", "Sent Requests", "Received"] as const;
export type TabKey = (typeof TABS)[number];

interface FriendsTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  receivedCount?: number;
  sentCount?: number;
}

export default function FriendsTabs({
  active,
  onChange,
  receivedCount = 0,
  sentCount = 0,
}: FriendsTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto">
      {TABS.map((tab) => {
        const badge =
          tab === "Received"
            ? receivedCount
            : tab === "Sent Requests"
              ? sentCount
              : 0;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              active === tab
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40"
                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {tab}
            {badge > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full px-1">
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
