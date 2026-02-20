"use client";

import React from "react";
import Leaderboard from "@/components/Sidebar/Leaderboard";
import Navbar from "@/components/landing/navbar/Navbar";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content — offset by sidebar width ─────────────────────── */}
      <div className="flex-1 relative w-full">
        {/* Ambient glow top-right of content area */}
        <div
          className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />
        {/* Scrollable content */}
        <div className="relative z-10 px-4 md:px-8 pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
