"use client"

import React from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  LineChart, 
  Share2,
  Send
} from 'lucide-react';
import { UserProvider } from '@/contexts/UserContext';
import Sidebar from '../Dasboard/Sidebar'; // Ensure this path is correct
import Navbar from '@/components/landing/navbar/Navbar';

const SkillScapeDashboard = () => {
  return (
    <UserProvider>
      {/* ── Outer Layout Wrapper ─────────────────────────────────────── */}
      <div className="flex min-h-screen w-full overflow-x-hidden" style={{ background: "#0a0a10" }}>
        
        {/* ── Sidebar (Fixed Width Footprint) ─────────────────────────── */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-gray-800/50">
          <Sidebar />
        </aside>
        
        {/* ── Main Content Area ────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col relative min-w-0">
          {/* <Navbar /> */}

          {/* Ambient glow top-right of content area */}
          <div
            className="fixed top-0 left-0 md:left-64 right-0 h-[50vh] pointer-events-none z-0"
            style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
          />

          {/* ── Scrollable Body ────────────────────────────────────────── */}
          <main className="relative z-10 p-4 md:p-8 lg:p-10 w-full max-w-[1400px] mx-auto">
            
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
              
              {/* Left Column: Intelligence Feed & Roadmap */}
              <div className="col-span-12 lg:col-span-8 space-y-8 pt-10">
                
                {/* Intelligence Feed Section */}
                <section className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white">Intelligence Feed</h2>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Powered by Velion AI Engine v2.0</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20 font-bold">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> REAL-TIME
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center shrink-0 border border-purple-500/20 text-purple-400">
                        <Zap size={14} />
                      </div>
                      <div className="text-sm leading-relaxed text-gray-300">
                        I've completed the architectural review of <span className="text-purple-400 cursor-pointer underline decoration-dotted">e-commerce-api</span>. There's a notable pattern of technical debt forming around the legacy payment gateway integration.
                      </div>
                    </div>

                    <div className="ml-0 md:ml-12 bg-[#1a1425] border border-gray-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-orange-400 mt-1">
                          <Search size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-1">Observation</span>
                          <p className="text-sm text-gray-300">
                            High coupling in the <code className="bg-black/40 px-1.5 py-0.5 rounded text-purple-300">/services/legacy-payment</code> directory is causing unit tests to fail intermittently.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center shrink-0 border border-purple-500/20 text-purple-400">
                        <LineChart size={14} />
                      </div>
                      <div className="text-sm italic text-gray-400">Suggest a refactoring strategy that minimizes downtime.</div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        <Zap size={14} />
                      </div>
                      <div className="text-sm text-gray-300">
                        Based on the project's dependency graph, I recommend the <span className="text-white font-bold">Strangler Fig Pattern</span>. Start by abstracting the gateway into a new microservice.
                      </div>
                    </div>

                    {/* Step Cards */}
                    <div className="ml-0 md:ml-12 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      <div className="bg-[#1a1425] border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                        <div>
                          <div className="text-xs font-bold text-white">Define Interface</div>
                          <div className="text-[10px] text-gray-500">Est. 2 Dev Days</div>
                        </div>
                      </div>
                      <div className="bg-[#1a1425] border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 border border-purple-500/20">2</div>
                        <div>
                          <div className="text-xs font-bold text-white">Traffic Shadowing</div>
                          <div className="text-[10px] text-gray-500">Est. 4 Dev Days</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div className="mt-8 relative">
                    <input 
                      type="text" 
                      placeholder="Ask about your technical stack..."
                      className="w-full bg-[#0a0514] border border-gray-800 rounded-xl py-3 px-4 pr-12 text-sm text-gray-200 focus:outline-none focus:border-purple-500 transition shadow-inner"
                    />
                    <button className="absolute right-2 top-1.5 p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition">
                      <Send size={16} />
                    </button>
                  </div>
                </section>

                {/* Optimization Roadmap */}
                <section className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <LineChart size={20} />
                      </div>
                      <h2 className="font-semibold text-white">Optimization Roadmap</h2>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Quarterly Strategy</span>
                  </div>

                  <div className="relative ml-4">
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-gray-700 to-transparent" />
                    
                    <div className="space-y-12">
                      <div className="relative pl-12">
                        <div className="absolute left-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center z-10 border-4 border-[#130d1f] shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                          <Zap size={18} className="text-white" />
                        </div>
                        <div className="bg-[#1a1425] border border-gray-800 rounded-xl p-4 max-w-md">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Week 1-2</span>
                            <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30">High Impact</span>
                          </div>
                          <h3 className="text-white font-bold text-sm">Infra Migration to K8s</h3>
                          <p className="text-xs text-gray-500 mt-1">Transition legacy setups to Kubernetes for better scalability.</p>
                        </div>
                      </div>

                      <div className="relative pl-12">
                        <div className="absolute left-0 w-10 h-10 rounded-full bg-[#1a1425] border border-gray-800 flex items-center justify-center z-10 text-gray-600">
                          <Share2 size={18} />
                        </div>
                        <div className="bg-[#1a1425]/40 border border-gray-800/50 rounded-xl p-4 max-w-md">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Week 3-4</span>
                          </div>
                          <h3 className="text-white/60 font-bold text-sm">OAuth2 Hardening</h3>
                          <p className="text-xs text-gray-600 mt-1">Upgrade authentication flows to OIDC standards.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Alerts & Stats */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                
                {/* Critical Alert */}
                <div className="bg-[#240a0e] border border-red-900/40 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert size={80} />
                  </div>
                  <div className="flex items-center gap-2 text-red-500 mb-4">
                    <ShieldAlert size={18} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Critical Alert</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">CVE-2023-4412</h3>
                  <p className="text-xs text-red-200/60 leading-relaxed mb-6">
                    A high-severity path traversal vulnerability was found in the storage-handler.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-red-200/40">Affected Files</span>
                      <span className="text-white font-mono">12</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-red-200/40">Risk Score</span>
                      <span className="text-red-500 font-bold">9.4/10</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-500 transition">
                    Apply Patch Fix +
                  </button>
                </div>

                {/* Intelligence Gap Card */}
                <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-purple-400 mb-6">
                    <Search size={18} />
                    <h2 className="font-semibold text-white text-sm">Intelligence Gap</h2>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#1a1425] border border-gray-800 rounded-xl text-purple-500">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold">Rust Security</h4>
                      <p className="text-[10px] text-gray-500">Based on recent commits</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] mb-2">
                      <span className="text-gray-500 uppercase font-bold tracking-widest">Relevance</span>
                      <span className="text-purple-400 font-bold">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 w-[92%]" />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-purple-600/10 border border-purple-500/30 text-purple-400 rounded-xl font-bold text-xs hover:bg-purple-600/20 transition flex items-center justify-center gap-2">
                    Start Neural Learning <ArrowRight size={14} />
                  </button>
                </div>

                {/* Architecture Health */}
                <div className="bg-[#130d1f] border border-gray-800 rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-4">
                      <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Arch Health</h2>
                      <span className="text-green-500 text-[10px] font-bold">+4.2%</span>
                   </div>
                   <div className="flex items-end gap-1 h-12 mb-4">
                     {[40, 60, 45, 70, 55, 90].map((h, i) => (
                       <div 
                         key={i} 
                         style={{ height: `${h}%` }} 
                         className={`flex-1 rounded-sm ${i === 5 ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-purple-900/40'}`} 
                       />
                     ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Footer / CTA Section */}
            <footer className="mt-12 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Expand Your Intelligence Network</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                Invite collaborators to map out knowledge silos and optimize team distribution with SkillScape.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition">
                  Upgrade to Enterprise
                </button>
                <button className="px-8 py-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold rounded-xl text-sm hover:bg-purple-600/30 transition">
                  Refer a Teammate
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default SkillScapeDashboard;