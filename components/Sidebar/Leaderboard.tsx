"use client"

import React from 'react';
import { 
  TrendingUp, Download, Filter, Search, 
  ChevronLeft, ChevronRight, Github, 
  Code2, Rocket, Zap, User, ExternalLink
} from 'lucide-react';

const Leaderboard = () => {
  return (
    <div className="text-gray-300 font-sans p-4 md:p-10">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Technical Intelligence <span className="text-purple-500">Leaderboard</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Real-time ranking of technical excellence based on code quality, skill evolution, and architectural impact across 42 active projects.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition uppercase tracking-wider text-gray-400">
            <Filter size={14} /> Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-500/20 uppercase tracking-wider">
            <Download size={14} /> Export Rankings
          </button>
        </div>
      </div>

      {/* --- PODIUM SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-16">
        {/* Silver - 2nd Place */}
        <div className="bg-[#11111a] border border-white/5 rounded-3xl p-8 text-center relative order-2 md:order-1 h-fit">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-500/10 border border-gray-500/30 text-gray-400 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em]">
            #2 Silver
          </div>
          <div className="relative w-24 h-24 mx-auto mb-4">
             <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
             <div className="relative w-full h-full rounded-full border-2 border-gray-500/30 bg-[#06060a] flex items-center justify-center overflow-hidden">
                <User size={48} className="text-gray-600" />
             </div>
             <div className="absolute bottom-0 right-0 bg-gray-600 w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#11111a]">2</div>
          </div>
          <h3 className="text-xl font-bold text-white">Jordan S.</h3>
          <p className="text-xs text-purple-400 font-medium mb-6">Senior Security Architect</p>
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
             <div className="text-left">
                <p className="text-[10px] font-bold text-gray-600 uppercase">Growth</p>
                <p className="text-sm font-bold text-green-400">+14.2%</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-gray-600 uppercase">Score</p>
                <p className="text-sm font-bold text-white">9,420</p>
             </div>
          </div>
        </div>

        {/* Gold - 1st Place */}
        <div className="bg-[#11111a] border border-purple-500/30 rounded-[2.5rem] p-10 text-center relative order-1 md:order-2 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-[0.2em]">
            #1 MVP
          </div>
          <div className="relative w-32 h-32 mx-auto mb-6">
             <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl" />
             <div className="relative w-full h-full rounded-full border-4 border-purple-500 bg-[#06060a] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <User size={64} className="text-gray-400" />
             </div>
             <div className="absolute top-0 right-0 bg-yellow-500 w-8 h-8 rounded-full text-xs font-bold text-black flex items-center justify-center border-4 border-[#11111a]">🏆</div>
          </div>
          <h3 className="text-2xl font-bold text-white">Sarah Connor</h3>
          <p className="text-sm text-purple-400 font-medium mb-8">Staff Cloud Engineer</p>
          <div className="flex justify-between items-center pt-8 border-t border-white/5">
             <div className="text-left">
                <p className="text-[10px] font-bold text-gray-600 uppercase">EVOLUTION</p>
                <p className="text-xl font-bold text-green-400">+22.8%</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-gray-600 uppercase">SCORE</p>
                <p className="text-xl font-bold text-white">12,850</p>
             </div>
          </div>
        </div>

        {/* Bronze - 3rd Place */}
        <div className="bg-[#11111a] border border-white/5 rounded-3xl p-8 text-center relative order-3 h-fit">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-900/20 border border-orange-500/30 text-orange-500 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em]">
            #3 Bronze
          </div>
          <div className="relative w-24 h-24 mx-auto mb-4">
             <div className="relative w-full h-full rounded-full border-2 border-orange-500/30 bg-[#06060a] flex items-center justify-center overflow-hidden">
                <User size={48} className="text-gray-600" />
             </div>
             <div className="absolute bottom-0 right-0 bg-orange-700 w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#11111a]">3</div>
          </div>
          <h3 className="text-xl font-bold text-white">Michael Chen</h3>
          <p className="text-xs text-purple-400 font-medium mb-6">Backend Architect</p>
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
             <div className="text-left">
                <p className="text-[10px] font-bold text-gray-600 uppercase">Growth</p>
                <p className="text-sm font-bold text-green-400">+9.5%</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-gray-600 uppercase">Score</p>
                <p className="text-sm font-bold text-white">8,315</p>
             </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="max-w-7xl mx-auto bg-[#0d0d14] border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-lg font-bold text-white">Full Rankings</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by intelligence id..." 
              className="bg-[#06060a] border border-white/10 rounded-xl py-2 pl-12 pr-4 text-xs focus:outline-none focus:border-purple-500/50 w-full md:w-80 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-6">Rank</th>
                <th className="px-8 py-6">Developer</th>
                <th className="px-8 py-6">Primary Stack</th>
                <th className="px-8 py-6">Projects</th>
                <th className="px-8 py-6">Skill Growth</th>
                <th className="px-8 py-6">Evaluation Score</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { rank: '04', name: 'Marcus Volkov', role: 'System Architect', stack: ['Rust', 'C++'], proj: 13, growth: '+5.2%', score: 72, color: 'text-green-400' },
                { rank: '05', name: 'Alex Rivera', role: 'Product Designer', stack: ['React', 'Next.js'], proj: 38, growth: '+12.4%', score: 94, color: 'text-purple-400', highlighted: true },
                { rank: '06', name: 'Elena Petrov', role: 'AI Engineer', stack: ['Python', 'PyTorch'], proj: 7, growth: '+8.1%', score: 65, color: 'text-green-400' },
              ].map((row, i) => (
                <tr key={i} className={`group hover:bg-white/[0.02] transition-colors ${row.highlighted ? 'bg-purple-500/[0.03]' : ''}`}>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500 font-mono italic">#{row.rank}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-white/10">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{row.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{row.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      {row.stack.map(s => (
                        <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-white">{row.proj}</td>
                  <td className={`px-8 py-6 text-xs font-bold ${row.color}`}>
                    <div className="flex items-center gap-1"><TrendingUp size={14} /> {row.growth}</div>
                  </td>
                  <td className="px-8 py-6 min-w-[180px]">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold text-gray-500 w-8">{row.score}%</span>
                       <div className="h-1 flex-1 bg-white/5 rounded-full">
                         <div 
                          className={`h-full rounded-full ${row.highlighted ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-purple-600'}`} 
                          style={{ width: `${row.score}%` }} 
                         />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {row.highlighted ? (
                      <button className="px-4 py-2 bg-purple-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-purple-500 transition">Evolution Hub</button>
                    ) : (
                      <button className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition">View Profile</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-8 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
           <span>Showing 1-10 of 124 Intelligences</span>
           <div className="flex gap-2">
              <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition"><ChevronLeft size={16} /></button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 hover:bg-white/5 transition rounded-lg">2</button>
              <button className="px-3 py-1 hover:bg-white/5 transition rounded-lg">3</button>
              <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition"><ChevronRight size={16} /></button>
           </div>
        </div>
      </div>

      {/* --- STATS SUMMARY BAR --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-16">
        {[
          { icon: <Zap size={18} />, label: 'Avg Intelligence', val: '8,420', growth: '+12%', color: 'text-purple-500' },
          { icon: <Code2 size={18} />, label: 'Avg Pull Requests', val: '12.8M', growth: '+2.4%', color: 'text-blue-500' },
          { icon: <Rocket size={18} />, label: 'Missions Finished', val: '2,543', growth: 'top 5%', color: 'text-orange-500' },
          { icon: <TrendingUp size={18} />, label: 'Skill Growth', val: '418', growth: '+1.5%', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#11111a] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                 {stat.icon}
               </div>
               <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">{stat.growth}</span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white italic">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="max-w-7xl mx-auto text-center py-20 relative overflow-hidden rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full" />
        <h2 className="text-3xl font-bold text-white mb-4 relative z-10 italic">Boost Your <span className="text-purple-500">Evolution Score</span></h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
          Analyze more repositories and complete intelligence gaps to climb global rankings. Your evolution score is recalculated every Sunday at 00:00 UTC.
        </p>
        <div className="flex justify-center gap-4 relative z-10">
          <button className="px-8 py-4 bg-purple-600 text-white text-[10px] font-black rounded-xl tracking-[0.2em] hover:bg-purple-500 transition shadow-lg shadow-purple-900/40 uppercase">
             Connect New Repository
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-xl tracking-[0.2em] hover:bg-white/10 transition uppercase">
             Compare with Peers
          </button>
        </div>
      </div>

      {/* --- SYSTEM FOOTER --- */}
      <footer className="flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] pb-8">
        <div className="flex items-center gap-2 italic">
          <div className="w-2 h-2 bg-purple-500/50 rounded-full" /> Velion AI &copy; 2024
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Documentation</a>
          <a href="#" className="hover:text-gray-400">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;