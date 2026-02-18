'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, Crown } from 'lucide-react';

interface GamificationCardProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  rank: string;
}

export default function GamificationCard({ level, xp, nextLevelXp, rank }: GamificationCardProps) {
  const progressPercentage = (xp / nextLevelXp) * 100;

  return (
    <motion.div 
      className="relative overflow-hidden bg-[#0A0A0F]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-6 h-full flex flex-col justify-between group hover:border-white/10 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* 1. Header: Rank Title */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown size={16} className="text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400/80">Current Rank</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{rank}</h3>
        </div>
        
        {/* Level Circle Indicator */}
        <div className="relative w-12 h-12 flex items-center justify-center">
           <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: progressPercentage / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-indigo-500 drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="1, 0" // Reset for pathLength animation
              />
           </svg>
           <span className="text-sm font-bold text-white">{level}</span>
        </div>
      </div>

      {/* 2. XP Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>XP Progress</span>
          <span className="text-white">{xp.toLocaleString()} / {nextLevelXp.toLocaleString()}</span>
        </div>
        
        <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
          {/* Background Pulse */}
          <div className="absolute inset-0 bg-indigo-500/10 animate-pulse" />
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
            className="absolute h-full left-0 top-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          >
            {/* Shimmer Effect on Bar */}
            <div className="absolute top-0 right-0 bottom-0 w-[20px] bg-white/30 skew-x-[-20deg] blur-[2px] animate-shimmer" />
          </motion.div>
        </div>
        
        <div className="text-[10px] text-slate-500 text-right mt-1 font-medium">
          {Math.floor(nextLevelXp - xp)} XP to Level {level + 1}
        </div>
      </div>

      {/* 3. Daily Streak Badge (Mini-Widget) */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
          <Flame size={16} />
        </div>
        <div>
          <div className="text-sm font-bold text-white">48 Day Streak</div>
          <div className="text-[10px] text-slate-500">Top 5% Consistency</div>
        </div>
      </div>

    </motion.div>
  );
}