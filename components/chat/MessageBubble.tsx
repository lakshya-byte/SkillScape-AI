"use client";

import React from "react";

interface MessageBubbleProps {
  content: string;
  isMine: boolean;
  timestamp: string;
  showAvatar?: boolean;
  senderName?: string;
}

export default function MessageBubble({
  content,
  isMine,
  timestamp,
  senderName,
}: MessageBubbleProps) {
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1 group`}
    >
      <div className={`max-w-[70%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && senderName && (
          <p className="text-[10px] text-gray-500 mb-0.5 ml-3">{senderName}</p>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isMine
              ? "bg-violet-600 text-white rounded-br-md"
              : "bg-white/[0.06] text-gray-200 border border-white/[0.06] rounded-bl-md"
          }`}
        >
          {content}
        </div>
        <p
          className={`text-[10px] text-gray-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${
            isMine ? "text-right mr-1" : "ml-3"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
