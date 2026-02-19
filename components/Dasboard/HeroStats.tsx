"use client"

import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  subColor?: string;
  barColor: string;
  barWidth: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, subColor = "text-violet-400", barColor, barWidth, icon }) => (
  <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 pt-4 pb-3 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">{label}</p>
        <p className="font-display text-[26px] font-bold text-white leading-none">
          {value}
          {sub && (
            <span className={`text-[12px] font-mono font-normal ml-2 ${subColor}`}>{sub}</span>
          )}
        </p>
      </div>
      <div className="text-gray-500 opacity-60 mt-1">{icon}</div>
    </div>
    {/* Colored progress bar at bottom */}
    <div className="h-[3px] w-full bg-white/[0.06] rounded-full mt-1">
      <div className={`h-full rounded-full ${barColor}`} style={{ width: barWidth }} />
    </div>
  </div>
);

const HeroStats: React.FC = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-extrabold text-white mb-1">
            Welcome Back, <span className="text-violet-400">Alex</span>
          </h1>
          <p className="text-[12px] font-mono text-gray-500">
            Your technical intelligence has evolved by{" "}
            <span className="text-emerald-400 font-bold">12.4%</span> this week.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] text-gray-400 rounded-lg px-4 py-2 text-[11px] font-mono hover:bg-white/10 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg px-4 py-2 text-[11px] font-mono font-bold hover:from-violet-500 hover:to-violet-600 transition-all shadow-lg shadow-violet-900/40">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rescan Stack
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Skills"
          value="142"
          sub="+3 new"
          subColor="text-violet-400"
          barColor="bg-violet-500"
          barWidth="72%"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />
        <StatCard
          label="Projects Analyzed"
          value="28"
          sub="4 active"
          subColor="text-blue-400"
          barColor="bg-blue-500"
          barWidth="56%"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Dominant Language"
          value="Python"
          sub="85% affinity"
          subColor="text-yellow-400"
          barColor="bg-yellow-500"
          barWidth="85%"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
        <StatCard
          label="Skill Growth"
          value="+12%"
          sub="MoM"
          subColor="text-emerald-400"
          barColor="bg-emerald-500"
          barWidth="88%"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>
    </section>
  );
};

export default HeroStats;