"use client"

import React, { useState } from 'react';
import {
  Zap, Activity, Shield, Cpu, Globe, RefreshCcw, FileText, 
  Bell, Code2, Lock, ChevronRight, AlertTriangle, TrendingUp
} from 'lucide-react';

const SkillScapeDashboard = () => {
  const [activeTab, setActiveTab] = useState('Mission Center');

  return (
    <div className="text-gray-300 font-sans selection:bg-purple-500/30">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Neural Tokens', val: '1.2M', sub: '+2.4%', icon: <Cpu size={16} />, color: 'text-blue-400' },
          { label: 'Active Agents', val: '42', sub: 'Running', icon: <Globe size={16} />, color: 'text-purple-400' },
          { label: 'Sync Latency', val: '14ms', sub: 'Optimal', icon: <Activity size={16} />, color: 'text-green-400' },
          { label: 'System Health', val: '99.8%', sub: 'Uptime', icon: <Shield size={16} />, color: 'text-indigo-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#130d1f] border border-gray-800/50 rounded-2xl p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</span>
              <div className={`${stat.color} opacity-60`}>{stat.icon}</div>
            </div>
            <div className="text-xl font-bold text-white flex items-baseline gap-2">
              {stat.val} <span className={`text-[10px] ${stat.color}`}>{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Neural Graph Visualizer */}
          <div className="bg-[#130d1f] border border-gray-800 rounded-3xl overflow-hidden relative min-h-[400px] shadow-2xl">
            <div className="absolute top-6 left-8 z-10 flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <button className="text-white border-b-2 border-purple-500 pb-1">Neural Graph</button>
              <button className="text-gray-600">Cluster View</button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
               {[300, 500, 700].map((size) => (
                <div key={size} style={{ width: size, height: size }} className="absolute border border-gray-600 rounded-full" />
              ))}
            </div>
            <div className="absolute bottom-8 left-8 z-10 bg-[#0a0514]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl w-72">
              <div className="flex items-center gap-2 text-[9px] text-purple-400 font-black uppercase mb-3">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" /> Node Active
              </div>
              <h4 className="text-white font-bold text-base mb-1">Deduplication-Engine-v1</h4>
              <p className="text-[11px] text-gray-500 mb-4">Scanning for file redundancy. Found 32 clusters.</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white text-[10px] font-bold py-2 rounded-lg">RESOLVE</button>
                <button className="flex-1 bg-white/5 text-white text-[10px] font-bold py-2 rounded-lg">EXPAND</button>
              </div>
            </div>
          </div>

          {/* Missions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#130d1f] border border-gray-800 rounded-3xl p-6 border-l-4 border-l-green-500/50">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-green-500/10 rounded-2xl text-green-500"><Code2 size={24} /></div>
                <span className="text-[9px] font-black text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-500/20 uppercase">Priority</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automate Email Triage</h3>
              <p className="text-[11px] text-gray-500 mb-6">Categorize GMail notifications using NLP to separate alerts.</p>
              <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[45%]" />
              </div>
              <button className="w-full bg-purple-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
                RESUME <ChevronRight size={14} />
              </button>
            </div>

            <div className="bg-[#0e0a18] border border-dashed border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <Lock size={24} className="text-gray-700 mb-4" />
              <h3 className="text-white font-bold mb-1">Encrypted Storage</h3>
              <p className="text-[10px] text-gray-600 mb-4">Upgrade system to AES-256 standard.</p>
              <div className="text-[9px] font-black text-gray-500 uppercase border border-gray-800 px-3 py-1 rounded-full">LEVEL 45 REQ</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#240a0e] border border-red-900/40 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-red-500 mb-4">
              <AlertTriangle size={18} />
              <span className="text-[10px] font-black uppercase">Critical Security</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Storage Overflow</h3>
            <p className="text-xs text-red-200/60 mb-6">Redundant log files consuming 12GB space.</p>
            <button className="w-full py-3 bg-red-600 text-white rounded-xl font-black text-[10px]">CLEANUP DUPLICATES</button>
          </div>

          <div className="bg-[#130d1f] border border-gray-800 rounded-3xl p-6">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Intelligence Feed</h2>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-800">
              {[
                { text: "Critical GMail detected", sub: 'Immediate action suggested.', color: 'bg-purple-600' },
                { text: 'Neural Sync Completed', sub: 'Indexed 1,240 new local files.', color: 'bg-green-500' },
              ].map((log, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-[#130d1f] ${log.color} z-10`} />
                  <div className="text-[11px] font-bold text-white mb-0.5">{log.text}</div>
                  <div className="text-[10px] text-gray-500 leading-tight">{log.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#130d1f] border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-purple-400 mb-6">
              <TrendingUp size={18} />
              <h2 className="font-black text-white text-[10px] uppercase tracking-widest">Performance</h2>
            </div>
            <div className="space-y-5">
              {[{ label: 'File Efficiency', val: '92%', width: '92%' }, { label: 'Neural Memory', val: '42GB', width: '60%' }].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-2 font-bold text-gray-500">
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

      <footer className="mt-16 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-purple-500/10 rounded-[40px] p-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Enhance Your Intelligence Network</h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10">Invite collaborators to map out knowledge silos and optimize intelligence.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-3.5 bg-white text-black font-black rounded-xl text-[10px] tracking-widest">UPGRADE TO ENTERPRISE</button>
          <button className="px-10 py-3.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 font-black rounded-xl text-[10px] tracking-widest">REFER A TEAMMATE</button>
        </div>
      </footer>
    </div>
  );
};

export default SkillScapeDashboard;