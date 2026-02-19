"use client"

import React from 'react';
import { 
  LayoutGrid, 
  List, 
  Search, 
  ArrowRight, 
  FileText, 
  RefreshCcw, 
  Shield, 
  Zap, 
  Trophy, 
  ChevronRight,
  PlayCircle,
  Clock,
  Code2,
  Database,
  Boxes,
  CheckCircle2
} from 'lucide-react';
import { UserProvider } from '@/contexts/UserContext';
import Sidebar from '@/components/Dasboard/Sidebar';
import Navbar from '@/components/landing/navbar/Navbar';

const MissionCenter = () => {
  return (
    <UserProvider>
      <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <Navbar />
        
        {/* ── Fixed Sidebar ─────────────────────────────────────────────── */}
        <Sidebar />

        {/* ── Main content — offset by sidebar width ─────────────────────── */}
        <main className="flex-1 relative w-full overflow-x-hidden">
          {/* Ambient glow top-right of content area */}
          <div
            className="fixed top-0 left-0 md:left-[220px] right-0 h-[50vh] pointer-events-none z-0"
            style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
          />

          {/* Scrollable content container */}
          <div className="relative z-10 px-4 md:px-8 md:ml-[220px] pt-24 md:pt-20 pb-7 flex flex-col gap-5 max-w-7xl mx-auto">
        
            {/* Hero Header */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <div className="flex items-center gap-2 text-purple-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                  <Zap size={12} fill="currentColor" /> Active Intelligence Phase
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Technical Mission Center</h1>
                <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                  Bridge your <span className="text-purple-400">intelligence gaps</span> through hands-on technical challenges. Complete missions to evolve your profile and unlock advanced neural pathways.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1425] border border-gray-800 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition">
                  <FileText size={16} /> Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-900/20">
                  <RefreshCcw size={16} /> Rescan Stack
                </button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total Skills', val: '142', sub: '+8 this week', icon: <Boxes size={16} />, color: 'text-blue-400' },
                { label: 'Active Missions', val: '04', sub: '2 pending review', icon: <FileText size={16} />, color: 'text-purple-400' },
                { label: 'Neural XP', val: '2.4k', sub: 'Top 5% rank', icon: <Zap size={16} />, color: 'text-yellow-400' },
                { label: 'Skill Growth', val: '+12%', sub: 'Month over month', icon: <RefreshCcw size={16} />, color: 'text-green-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#130d1f] border border-gray-800/50 rounded-xl p-5 hover:border-gray-700 transition group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                    <div className={`${stat.color} opacity-50 group-hover:opacity-100 transition`}>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                  <div className={`text-[10px] font-bold ${stat.color}`}>{stat.sub}</div>
                  <div className="mt-4 h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600/30 w-1/3" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Missions Section */}
              <div className="col-span-12 lg:col-span-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <LayoutGrid size={18} className="text-purple-500" />
                    <h2 className="font-bold text-white">Intelligence Missions</h2>
                  </div>
                  <div className="flex bg-[#1a1425] p-1 rounded-lg border border-gray-800">
                    <button className="p-1.5 bg-purple-600 rounded text-white"><LayoutGrid size={14} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-white"><List size={14} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mission Card 1 */}
                  <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-green-500/50">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <Code2 size={24} />
                      </div>
                      <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-500/20 uppercase tracking-tighter">High Priority</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Refactor Legacy Auth Module</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Replace deprecated Passport.js patterns with modern OAuth2.0 standards in <span className="text-gray-400">core-service</span>.</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-tighter">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-purple-400">45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 w-[45%] shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mb-6">
                      <span className="flex items-center gap-1"><Zap size={12} className="text-purple-500" /> 800 XP</span>
                      <span className="flex items-center gap-1"><Shield size={12} className="text-blue-500" /> Security Badge</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Clock size={12} /> 2h remaining
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
                        Resume Mission <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Mission Card 2 */}
                  <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <Shield size={24} />
                      </div>
                      <span className="text-[9px] font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-500/20 uppercase tracking-tighter">Recommended</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Implement Rust Security</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Integrate memory-safe concurrency patterns to mitigate race conditions in the <span className="text-gray-400">explorer-m</span> repo.</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-tighter">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-purple-400">12%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 w-[12%]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mb-6">
                      <span className="flex items-center gap-1"><Zap size={12} className="text-purple-500" /> 650 XP</span>
                      <span className="flex items-center gap-1 italic text-gray-500">"The Architect"</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Clock size={12} /> 1 week remaining
                      </div>
                      <button className="bg-[#1a1425] border border-purple-500/30 text-purple-400 hover:bg-purple-900/20 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
                        Continue <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Mission Card 3 */}
                  <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-gray-900 rounded-xl text-gray-600">
                        <Database size={24} />
                      </div>
                      <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-500/20 uppercase tracking-tighter">New Discovery</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Scale Kubernetes Nodes</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-8">Optimize resource allocation for the production cluster to reduce latency by 20%.</p>
                    <div className="text-[10px] text-purple-400 font-bold mb-6 flex items-center gap-1">
                       <Zap size={12} /> 1200 XP
                    </div>
                    <button className="w-full bg-white/5 border border-white/5 text-gray-400 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition">
                      <PlayCircle size={16} /> Start Mission
                    </button>
                  </div>

                  {/* Level Lock Card */}
                  <div className="bg-[#0e0a18] border border-dashed border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-4 text-gray-700">
                       <Boxes size={24} />
                    </div>
                    <h3 className="text-white/40 font-bold mb-1">Architectural Bridge</h3>
                    <p className="text-[10px] text-gray-600 max-w-[180px]">Sync 4 new GitHub repositories and map knowledge silos.</p>
                    <div className="mt-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">Level 45 Required</div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Next Intelligence Gap */}
                <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-purple-400 mb-6">
                    <Search size={18} />
                    <h2 className="font-semibold text-white text-sm">Next Intelligence Gap</h2>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#1a1425] border border-gray-800 rounded-xl text-purple-500">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold">Advanced Rust Security</h4>
                      <p className="text-[10px] text-gray-500">Based on recent commits</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] mb-2 font-bold text-gray-500 uppercase tracking-widest">
                      <span>Relevance Score</span>
                      <span className="text-purple-400">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 w-[92%] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-6 italic">
                    AI detected 12 security vulnerabilities in your recent Rust commits.
                  </p>
                  <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-xs hover:bg-purple-500 transition shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 uppercase">
                    Start Neural Learning <Zap size={14} fill="white" />
                  </button>
                </div>

                {/* Intelligence Feed */}
                <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Intelligence Feed</h2>
                    <ChevronRight size={14} className="text-gray-600" />
                  </div>
                  <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-800">
                    {[
                      { text: 'Skill "GraphQL" added', sub: 'Detected via 46 commits', icon: <CheckCircle2 size={10} className="text-white" />, color: 'bg-purple-600' },
                      { text: 'Neural Sync Completed', sub: 'Analyzed 1.2m lines of code', icon: <CheckCircle2 size={10} className="text-white" />, color: 'bg-green-500' },
                      { text: 'Proficiency Level Up', sub: 'Top 5% of Rust developers', icon: <Zap size={10} fill="white" className="text-white" />, color: 'bg-pink-500' },
                    ].map((feed, i) => (
                      <div key={i} className="relative pl-8">
                        <div className={`absolute left-0 top-1 z-10 w-4 h-4 rounded-full ${feed.color} flex items-center justify-center`}>{feed.icon}</div>
                        <div className="text-[11px] font-bold text-white mb-0.5">{feed.text}</div>
                        <div className="text-[10px] text-gray-500 leading-tight">{feed.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Card */}
            <section className="mt-16 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-purple-500/10 rounded-[40px] p-8 md:p-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Expand Your Intelligence Network</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
                Invite collaborators to map out organizational knowledge silos and optimize team distribution with SkillScape AI Enterprise.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-3.5 bg-white text-black font-bold rounded-xl text-xs hover:bg-gray-200 transition">
                  Upgrade to Enterprise
                </button>
                <button className="px-10 py-3.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 font-bold rounded-xl text-xs hover:bg-purple-600/20 transition">
                  Refer a Teammate
                </button>
              </div>
            </section>

            <footer className="mt-20 text-center text-[10px] text-gray-600 tracking-[0.4em] uppercase font-black">
              &copy; 2026 SkillScape AI Intelligence Systems. All neural pathways protected.
            </footer>
          </div>
        </main>
      </div>
    </UserProvider>
  );
};

export default MissionCenter;