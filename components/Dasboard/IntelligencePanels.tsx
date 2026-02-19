"use client"

import React from "react";

/* ─── Feed data ─────────────────────────────────────────────────────────── */
const feedItems = [
  {
    icon: "◈",
    iconBg: "bg-violet-500/15",
    iconBorder: "border-violet-500/30",
    iconColor: "text-violet-400",
    title: "Skill 'GraphQL' added to profile",
    desc: (
      <>
        Detected via PR analysis on{" "}
        <span className="text-violet-400">e-commerce-app</span> repository,
        skill level assigned: <span className="text-violet-400">Intermediate</span>.
      </>
    ),
    time: "4 hours ago",
  },
  {
    icon: "⟳",
    iconBg: "bg-blue-500/15",
    iconBorder: "border-blue-500/30",
    iconColor: "text-blue-400",
    title: "Neural Sync Completed",
    desc: "Connected 4 new GitHub repositories and analyzed 1,240 lines of code. Discovered 3 hidden technical debts.",
    time: "Yesterday, 11:32",
  },
  {
    icon: "▲",
    iconBg: "bg-emerald-500/15",
    iconBorder: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    title: "Proficiency Level Up!",
    desc: (
      <>
        Logic Level detected at{" "}
        <span className="text-violet-400">A9(8-9)</span>. You are now in the
        top 5% of React developers globally.
      </>
    ),
    time: "Nov 15, 2025",
  },
];

/* ─── Next Intelligence Gap ─────────────────────────────────────────────── */
const NextIntelligenceGap: React.FC = () => (
  <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-[18px] flex flex-col">
    {/* Title */}
    <div className="flex items-center gap-2 mb-4">
      <span className="text-violet-400 text-xs">✦</span>
      <h3 className="font-display text-[14px] font-bold text-white">Next Intelligence Gap</h3>
    </div>

    {/* Skill card */}
    <div className="bg-violet-600/10 border border-violet-500/25 rounded-xl p-3 mb-3">
      <div className="flex gap-3 items-start">
        <div className="w-9 h-9 rounded-lg bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-lg flex-shrink-0">
          🦀
        </div>
        <div>
          <p className="font-display text-[13px] font-bold text-gray-100 mb-0.5">Advanced Rust Security</p>
          <p className="text-[10px] font-mono text-violet-400">Expected to boost profile by 34%</p>
        </div>
      </div>
      {/* Relevance bar */}
      <div className="mt-3">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Relevance Score</span>
          <span className="text-[10px] font-mono text-violet-400">88%</span>
        </div>
        <div className="h-1 bg-white/[0.08] rounded-full">
          <div className="h-full w-[88%] bg-gradient-to-r from-violet-600 to-violet-400 rounded-full" />
        </div>
      </div>
    </div>

    <p className="text-[11px] font-mono text-gray-500 leading-relaxed mb-4">
      Our AI detected 12 security vulnerabilities in your recent Rust commits that could be mitigated with memory-safe concurrency patterns.
    </p>

    <button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg py-2.5 text-[11px] font-mono font-bold uppercase tracking-widest hover:from-violet-500 hover:to-violet-600 transition-all shadow-lg shadow-violet-900/40">
      Start Neural Learning →
    </button>
  </div>
);

/* ─── Intelligence Feed ──────────────────────────────────────────────────── */
const IntelligenceFeed: React.FC = () => (
  <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-[18px] flex-1 flex flex-col h-full">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-violet-400 text-xs">⚡</span>
        <h3 className="font-display text-[14px] font-bold text-white">Recent Intelligence Feed</h3>
      </div>
      <button className="text-[11px] font-mono text-violet-400 uppercase tracking-widest hover:text-violet-300 transition-colors">
        View History
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {feedItems.map((item, i) => (
        <div key={i} className={`flex gap-3 ${i < feedItems.length - 1 ? "pb-4 border-b border-white/[0.05]" : ""}`}>
          <div className={`w-7 h-7 rounded-lg ${item.iconBg} border ${item.iconBorder} flex items-center justify-center ${item.iconColor} text-xs flex-shrink-0 mt-0.5`}>
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-3">
              <p className="font-display text-[12px] font-semibold text-gray-200 mb-1">{item.title}</p>
              <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">{item.time}</span>
            </div>
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Combined export ────────────────────────────────────────────────────── */
const IntelligencePanels: React.FC = () => (
  <section className="flex flex-col lg:flex-row gap-3">
    <div className="w-full lg:w-[270px] flex-shrink-0">
      <NextIntelligenceGap />
    </div>
    <div className="flex-1 min-w-0">
      <IntelligenceFeed />
    </div>
  </section>
);

export default IntelligencePanels;
export { NextIntelligenceGap, IntelligenceFeed };