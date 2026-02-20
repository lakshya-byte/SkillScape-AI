"use client"

import React from 'react';
import { 
  Zap, Activity, Shield, Cpu, Globe, RefreshCcw, FileText, 
  Database, ChevronRight, Maximize2, Plus, Minus, AlertTriangle, 
  Mail, LayoutGrid, Send, Search
} from 'lucide-react';

// Assuming these are your components
// import Sidebar from '@/components/Dashboard/Sidebar';
// import Navbar from '@/components/landing/navbar/Navbar';

const AssistantDashboard = () => {
  return (
    /* 1. PARENT FLEX CONTAINER: Prevents collapsing */
    <div className="flex min-h-screen w-full overflow-hidden text-gray-300 font-sans " style={{ background: "#0a0a10" }}>
      
      {/* ── SIDEBAR AREA ── */}
      {/* We use 'w-64' (256px) as a standard. 'shrink-0' ensures it never collapses */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-gray-800/50 bg-[#0d0d14] z-20">
        {/* <Sidebar /> */}
        <div className="p-8">
           <div className="flex items-center gap-2 text-purple-500 font-black tracking-tighter text-xl mb-10">
              <Zap size={24} fill="currentColor" /> Velion AI
           </div>
           {/* <nav className="space-y-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <div className="text-purple-400">01. Mission Control</div>
              <div className="hover:text-white cursor-pointer transition">02. Neural Assets</div>
              <div className="hover:text-white cursor-pointer transition">03. GMail Triage</div>
              <div className="hover:text-white cursor-pointer transition">04. Security Hub</div>
           </nav> */}
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      {/* 'flex-1' allows this to take up all remaining space. 'overflow-y-auto' makes it scrollable */}
      <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
        
        {/* Ambient glow effect fixed to the main content background */}
        <div
          className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
        />

        {/* Inner Scrollable Container */}
        <div className="relative z-10 p-6 md:p-10 flex flex-col gap-8 border max-w-[1400px] mx-auto w-full ml-20">
          
          {/* --- HERO HEADER --- */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-purple-500 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
                <Activity size={12} className="animate-pulse" /> Neural Core: Online
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Mission Control Center</h1>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                Automating <span className="text-purple-400 font-medium">GMail triage</span> and identifying <span className="text-purple-400 font-medium">file redundancy</span>. 
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1425] border border-gray-800 rounded-xl text-[10px] font-black tracking-widest hover:bg-gray-800 transition uppercase">
                <FileText size={16} /> Export
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-[10px] font-black tracking-widest hover:bg-purple-500 transition shadow-lg shadow-purple-900/40 uppercase">
                <RefreshCcw size={16} /> Rescan Cluster
              </button>
            </div>
          </header>

          {/* --- TOP STATS GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Neural Tokens', val: '1.2M', sub: '+2.4%', icon: <Cpu size={16} />, color: 'text-blue-400' },
              { label: 'Active Agents', val: '42', sub: 'Running', icon: <Globe size={16} />, color: 'text-purple-400' },
              { label: 'Sync Latency', val: '14ms', sub: 'Optimal', icon: <Activity size={16} />, color: 'text-green-400' },
              { label: 'System Health', val: '99.8%', sub: 'Uptime', icon: <Shield size={16} />, color: 'text-indigo-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#130d1f]/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 group hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start mb-4 text-gray-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                  <div className={`${stat.color} opacity-60`}>{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.val} <span className={`text-[10px] font-bold ${stat.color} ml-1`}>{stat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* --- LEFT: MAIN INTERFACE --- */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Intelligence Feed Section (Matches Previous Design Aesthetic) */}
              <section className="bg-[#130d1f] border border-gray-800 rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-sm">Intelligence Feed</h2>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">Neural Assistant v2.0</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 font-bold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Assistant Message Example */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center shrink-0 border border-purple-500/20 text-purple-400">
                      <Mail size={14} />
                    </div>
                    <div className="text-sm leading-relaxed text-gray-300">
                      I've identified <span className="text-purple-400 font-bold">4 duplicate clusters</span> in your local backups. Clearing these could reclaim <span className="text-white font-mono">12.4GB</span> of storage.
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="relative mt-8">
                    <input 
                      type="text" 
                      placeholder="Ask your assistant to manage files or emails..."
                      className="w-full bg-[#0a0514] border border-gray-800 rounded-xl py-4 px-5 pr-12 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Duplicate Detection Card */}
              <div className="bg-[#130d1f] border border-gray-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <Database size={120} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Automate GMail Triage</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-md">Assistant is currently training an NLP filter on 240 recent unread notifications.</p>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-purple-600 w-[65%] shadow-[0_0_12px_purple]" />
                </div>
                <button className="bg-purple-600 text-white text-[10px] font-black tracking-widest py-3 px-6 rounded-xl hover:bg-purple-500 transition uppercase">
                   Optimize Workflow
                </button>
              </div>
            </div>

            {/* --- RIGHT: SECURITY & LOGS --- */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-[#240a0e] border border-red-900/40 rounded-3xl p-8 group transition-all">
                <div className="flex items-center gap-3 text-red-500 mb-6">
                  <AlertTriangle size={20} />
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">Vulnerability</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Redundant Backups</h3>
                <p className="text-xs text-red-200/60 leading-relaxed mb-8">
                  Identical copies of "hackathon_project_final.zip" detected in 4 directories.
                </p>
                <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] tracking-widest hover:bg-red-500 transition shadow-lg shadow-red-900/40 uppercase">
                  Apply Patch
                </button>
              </div>

              {/* Resource Management */}
              <div className="bg-[#130d1f] border border-gray-800 rounded-3xl p-7">
                <h2 className="font-black text-white text-[10px] uppercase tracking-widest mb-8">System Allocation</h2>
                <div className="space-y-6">
                  {[
                    { label: 'Logic Load', val: '72%', width: '72%' },
                    { label: 'Memory', val: '42.4 GB', width: '66%' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] mb-2 font-black text-gray-500 uppercase tracking-widest">
                        <span>{item.label}</span>
                        <span className="text-purple-400">{item.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-10 text-center text-[10px] text-gray-700 tracking-[0.4em] font-black uppercase">
            © 2026 Velion AI. Neural pathways active.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;