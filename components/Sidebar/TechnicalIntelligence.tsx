"use client"

import React from 'react';
import { 
  Plus, Minus, Maximize2, Move, 
  TrendingUp, Zap, Target, 
  History, ShieldAlert, ChevronRight,
  FileText, RefreshCw, MoreHorizontal
} from 'lucide-react';

/**
 * SkillScape AI Dashboard
 * Replicates the dark-purple "Intelligence Network" UI.
 */
const SkillScapeDashboard = () => {
  return (
    <div className="text-gray-300 font-sans">
      {/* --- SCROLLABLE CONTENT AREA --- */}
      <main className="p-6 lg:p-10 custom-scrollbar">
        
        {/* --- TOP HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
              Welcome Back, <span className="text-purple-500">Alex</span>
            </h1>
            <p className="text-sm flex items-center gap-2 text-gray-400">
              Your technical intelligence has evolved by 
              <span className="text-green-400 font-medium flex items-center gap-0.5">
                 <TrendingUp size={14} /> 12.4%
              </span> this week.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/10 transition">
              <FileText size={16} /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-500 transition shadow-lg shadow-purple-500/20">
              <RefreshCw size={16} /> Rescan Stack
            </button>
          </div>
        </div>

        {/* --- TOP METRICS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL SKILLS', value: '142', sub: '+2 new', color: 'text-purple-500' },
            { label: 'PROJECTS ANALYZED', value: '28', sub: '4 active', color: 'text-purple-500' },
            { label: 'DOMINANT LANGUAGE', value: 'Python', sub: '42% activity', color: 'text-purple-500' },
            { label: 'SKILL GROWTH', value: '+12%', sub: 'NOM', color: 'text-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#11111a] border border-white/5 p-5 rounded-xl">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-3 uppercase">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className={`text-[11px] font-medium ${stat.color}`}>{stat.sub}</span>
              </div>
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-2/3 shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
              </div>
            </div>
          ))}
        </div>

        {/* --- MAIN GRAPH VISUALIZER SECTION --- */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 lg:col-span-12 bg-[#11111a] border border-white/5 rounded-2xl relative min-h-[500px] overflow-hidden">
            
            {/* Graph Navigation */}
            <div className="absolute top-6 left-8 z-20 flex gap-6 text-[10px] font-bold uppercase tracking-widest">
              <button className="text-white border-b-2 border-purple-500 pb-1">Global Graph</button>
              <button className="text-gray-500 hover:text-white transition">Cluster View</button>
              <button className="text-gray-500 hover:text-white transition">Dependency Map</button>
            </div>

            {/* Node Tooltip (Matches Distributed Systems card in image) */}
            <div className="absolute bottom-10 left-8 z-20 bg-[#0d0d14]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[320px] shadow-2xl">
              <div className="flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase mb-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />
                Intelligence Node Selected
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Distributed Systems</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Level 4 proficiency. High correlation with Kubernetes, Docker, and Go projects found in Repository #14.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-purple-600 text-white text-[10px] font-bold rounded-lg hover:bg-purple-500 transition">DETAILS</button>
                <button className="flex-1 py-2 bg-white/5 text-white text-[10px] font-bold rounded-lg border border-white/10 hover:bg-white/10 transition uppercase">Expand</button>
              </div>
            </div>

            {/* Mockup Network Visualization (SVG/CSS) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="relative w-full h-full">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full shadow-[0_0_30px_#a855f7]" />
                {/* Connection Lines & Orbiting Nodes */}
                <svg className="w-full h-full stroke-purple-500/30 fill-none">
                  <circle cx="50%" cy="50%" r="100" className="stroke-white/5" />
                  <circle cx="50%" cy="50%" r="200" className="stroke-white/5" />
                  <line x1="50%" y1="50%" x2="40%" y2="35%" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="65%" y2="55%" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="55%" y2="80%" strokeWidth="1" />
                </svg>
                <div className="absolute top-[35%] left-[40%] w-4 h-4 bg-purple-400 rounded-full border-4 border-[#11111a]" />
                <div className="absolute top-[55%] left-[65%] w-6 h-6 bg-purple-600 rounded-full border-4 border-[#11111a]" />
                <div className="absolute top-[80%] left-[55%] w-3 h-3 bg-purple-800 rounded-full" />
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
              {[Plus, Minus, Maximize2, Move].map((Icon, idx) => (
                <button key={idx} className="p-3 bg-[#0d0d14] border border-white/10 rounded-lg text-gray-500 hover:text-white transition">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- LOWER FEED & LEARNING GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Next Intelligence Gap */}
          <div className="lg:col-span-4 bg-[#11111a] border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <Zap size={18} className="text-purple-500" />
              <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">Next Intelligence Gap</h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4 border border-purple-500/20">
                <ShieldAlert size={28} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Advanced Rust Security</h3>
              <p className="text-[11px] text-gray-500 mb-6">Suggested based on your latest repos</p>
              
              <div className="w-full mb-8">
                <div className="flex justify-between text-[10px] font-bold mb-2 uppercase">
                  <span className="text-gray-500 tracking-tighter">Relevance Score</span>
                  <span className="text-purple-500">86%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full">
                  <div className="h-full bg-purple-600 w-[86%] rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                </div>
              </div>

              <p className="text-[11px] text-gray-400 italic mb-6">
                "Our AI detected 12 security vulnerabilities in your recent Rust commits that could be mitigated..."
              </p>

              <button className="w-full py-3 bg-purple-600 text-white rounded-xl text-[10px] font-bold tracking-widest hover:bg-purple-500 transition shadow-lg shadow-purple-500/20 uppercase">
                Start Neural Learning
              </button>
            </div>
          </div>

          {/* Recent Intelligence Feed */}
          <div className="lg:col-span-8 bg-[#11111a] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <History size={18} className="text-purple-500" />
                <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">Recent Intelligence Feed</h2>
              </div>
              <button className="text-[10px] font-bold text-gray-500 hover:text-white transition uppercase">View History</button>
            </div>

            <div className="space-y-6">
              {[
                { title: "Skill 'GraphQL' added to profile", desc: "Detected via PR analysis on e-commerce-api. Skill level assigned: Intermediate.", time: "2 hours ago", active: true },
                { title: "Neural Sync Completed", desc: "Connected 4 new GitHub repositories and analyzed 1,240 lines of code. Discovered 2 hidden technical debts.", time: "Yesterday, 14:32", active: false },
                { title: "Proficiency Level Up", desc: "Logic Level detected at Arch-II. You are now in the top 5% of React developers globally.", time: "Nov 22, 2023", active: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 border-[#11111a] ring-2 ${item.active ? 'ring-purple-500 bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'ring-gray-700 bg-gray-800'}`} />
                    {i !== 2 && <div className="w-[1px] h-full bg-gray-800 my-1" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <span className="text-[10px] text-gray-600 font-medium">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- FOOTER CTA SECTION --- */}
        <div className="bg-gradient-to-b from-[#161625] to-[#11111a] border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden mb-12">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-2xl font-bold text-white mb-3">Expand Your Intelligence Network</h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-8">
            Invite collaborators to map out organizational knowledge silos and optimize team distribution with SkillScape AI Enterprise.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-200 transition">Upgrade to Enterprise</button>
            <button className="px-8 py-3 bg-[#11111a] border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/5 transition">Refer a Teammate</button>
          </div>
        </div>

        {/* --- SYSTEM FOOTER --- */}
        <footer className="flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] pb-8">
          <div className="flex items-center gap-2 italic">
            <div className="w-2 h-2 bg-purple-500/50 rounded-full" /> SkillScape AI 2024
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Documentation</a>
            <a href="#" className="hover:text-gray-400">Support</a>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default SkillScapeDashboard;