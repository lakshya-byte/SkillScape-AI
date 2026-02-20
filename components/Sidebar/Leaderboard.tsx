"use client"

import React, { useEffect, useState, useCallback } from 'react';
import {
  TrendingUp, Download, Filter, Search,
  ChevronLeft, ChevronRight,
  Code2, Rocket, Zap, User, Trophy, Crown, Medal
} from 'lucide-react';
import { getLeaderboard, getMyRank } from '@/lib/authApi';

/* ─── Types ──────────────────────────────────────────────────── */
interface LeaderboardEntry {
  rank: number;
  _id: string;
  name: string;
  avatar?: string;
  role: string;
  institute?: string;
  rating: number;
  topSkills: string[];
  totalSkills: number;
  totalProjects: number;
}

interface MyRankData {
  rank: number;
  rating: number;
  totalUsers: number;
  name: string;
  avatar?: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

const avatarGradients = [
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #7c3aed, #6d28d9)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f43f5e, #e11d48)",
];
const getGradient = (name: string) => avatarGradients[name.charCodeAt(0) % avatarGradients.length];

const formatRating = (r: number) => r.toLocaleString();

/* ─── Skeleton ───────────────────────────────────────────────── */
const PodiumSkeleton = () => (
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-16">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-[#11111a] border border-white/5 rounded-3xl p-8 animate-pulse">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800" />
        <div className="h-6 bg-gray-800 rounded w-32 mx-auto mb-2" />
        <div className="h-4 bg-gray-800 rounded w-24 mx-auto mb-6" />
        <div className="h-px bg-white/5 mb-4" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-800 rounded w-16" />
          <div className="h-4 bg-gray-800 rounded w-16" />
        </div>
      </div>
    ))}
  </div>
);

const TableSkeleton = () => (
  <div className="space-y-0 divide-y divide-white/5">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className="px-8 py-6 flex gap-8 animate-pulse">
        <div className="h-5 bg-gray-800 rounded w-10" />
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-gray-800" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-800 rounded w-32" />
            <div className="h-3 bg-gray-800 rounded w-20" />
          </div>
        </div>
        <div className="h-4 bg-gray-800 rounded w-20" />
        <div className="h-4 bg-gray-800 rounded w-16" />
        <div className="h-4 bg-gray-800 rounded w-32" />
      </div>
    ))}
  </div>
);

/* ─── Avatar Component ───────────────────────────────────────── */
const AvatarDisplay = ({ name, avatar, size = "md" }: { name: string; avatar?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeMap = { sm: "w-10 h-10 text-xs", md: "w-24 h-24 text-2xl", lg: "w-32 h-32 text-4xl" };
  const cls = sizeMap[size];

  if (avatar) {
    return <img src={avatar} alt={name} className={`${cls} rounded-full object-cover`} />;
  }
  return (
    <div className={`${cls} rounded-full flex items-center justify-center text-white font-bold`}
      style={{ background: getGradient(name) }}>
      {getInitials(name)}
    </div>
  );
};

/* ─── Podium Card ────────────────────────────────────────────── */
const PodiumCard = ({ entry, variant }: { entry: LeaderboardEntry; variant: "gold" | "silver" | "bronze" }) => {
  const config = {
    gold: {
      badge: "#1 MVP",
      badgeCls: "bg-purple-600 text-white",
      border: "border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.1)]",
      rounded: "rounded-[2.5rem]",
      padding: "p-10",
      avatarSize: "lg" as const,
      avatarBorder: "border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      glowCls: "absolute inset-0 bg-purple-500/30 rounded-full blur-2xl",
      rankIcon: <span className="text-xs">🏆</span>,
      rankBg: "bg-yellow-500 text-black w-8 h-8 text-xs border-4",
      rankPos: "absolute top-0 right-0",
      nameSize: "text-2xl",
      order: "order-1 md:order-2",
    },
    silver: {
      badge: "#2 Silver",
      badgeCls: "bg-gray-500/10 border border-gray-500/30 text-gray-400",
      border: "border-white/5",
      rounded: "rounded-3xl",
      padding: "p-8",
      avatarSize: "md" as const,
      avatarBorder: "border-2 border-gray-500/30",
      glowCls: "absolute inset-0 bg-green-500/20 rounded-full blur-xl",
      rankIcon: <span className="font-bold">2</span>,
      rankBg: "bg-gray-600 text-white w-6 h-6 text-[10px] border-2",
      rankPos: "absolute bottom-0 right-0",
      nameSize: "text-xl",
      order: "order-2 md:order-1",
    },
    bronze: {
      badge: "#3 Bronze",
      badgeCls: "bg-orange-900/20 border border-orange-500/30 text-orange-500",
      border: "border-white/5",
      rounded: "rounded-3xl",
      padding: "p-8",
      avatarSize: "md" as const,
      avatarBorder: "border-2 border-orange-500/30",
      glowCls: "",
      rankIcon: <span className="font-bold">3</span>,
      rankBg: "bg-orange-700 text-white w-6 h-6 text-[10px] border-2",
      rankPos: "absolute bottom-0 right-0",
      nameSize: "text-xl",
      order: "order-3",
    },
  };

  const c = config[variant];

  return (
    <div className={`bg-[#11111a] border ${c.border} ${c.rounded} ${c.padding} text-center relative ${c.order} h-fit`}>
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${c.badgeCls} text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em]`}>
        {c.badge}
      </div>
      <div className={`relative ${variant === "gold" ? "w-32 h-32" : "w-24 h-24"} mx-auto ${variant === "gold" ? "mb-6" : "mb-4"}`}>
        {c.glowCls && <div className={c.glowCls} />}
        <div className={`relative w-full h-full rounded-full ${c.avatarBorder} bg-[#06060a] flex items-center justify-center overflow-hidden`}>
          {entry.avatar ? (
            <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
          ) : (
            <User size={variant === "gold" ? 64 : 48} className="text-gray-600" />
          )}
        </div>
        <div className={`${c.rankPos} ${c.rankBg} rounded-full font-bold flex items-center justify-center border-[#11111a]`}>
          {c.rankIcon}
        </div>
      </div>
      <h3 className={`${c.nameSize} font-bold text-white`}>{entry.name}</h3>
      <p className={`text-${variant === "gold" ? "sm" : "xs"} text-purple-400 font-medium ${variant === "gold" ? "mb-8" : "mb-4"}`}>
        {entry.role || "Developer"}
      </p>
      {entry.topSkills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {entry.topSkills.map(s => (
            <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
          ))}
        </div>
      )}
      <div className={`flex justify-between items-center ${variant === "gold" ? "pt-8" : "pt-6"} border-t border-white/5`}>
        <div className="text-left">
          <p className="text-[10px] font-bold text-gray-600 uppercase">Skills</p>
          <p className="text-sm font-bold text-cyan-400">{entry.totalSkills}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-600 uppercase">Rating</p>
          <p className={`${variant === "gold" ? "text-xl" : "text-sm"} font-bold text-white`}>{formatRating(entry.rating)}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/*  LEADERBOARD COMPONENT                                        */
/* ═══════════════════════════════════════════════════════════════ */

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<MyRankData | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const LIMIT = 10;

  const fetchData = useCallback(async (p: number) => {
    try {
      setLoading(true);
      const [lbRes, rankRes] = await Promise.all([
        getLeaderboard(p, LIMIT),
        getMyRank(),
      ]);

      setEntries(lbRes.data.leaderboard);
      setTotalPages(lbRes.data.pagination.totalPages);
      setTotalUsers(lbRes.data.pagination.totalUsers);
      setMyRank(rankRes.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  // Split podium (top 3 on page 1) and table entries
  const isFirstPage = page === 1;
  const podiumEntries = isFirstPage ? entries.slice(0, 3) : [];
  const tableEntries = isFirstPage ? entries.slice(3) : entries;

  // Search filter for the table
  const filteredTable = searchQuery.trim()
    ? tableEntries.filter(e =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.topSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : tableEntries;

  const podiumOrder: ("silver" | "gold" | "bronze")[] = ["silver", "gold", "bronze"];

  return (
    <div className="text-gray-300 font-sans p-4 md:p-10">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Technical Intelligence <span className="text-purple-500">Leaderboard</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Real-time ranking of technical excellence based on skill depth, confidence scores, and development activity across {totalUsers} active developers.
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {myRank && (
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/30 rounded-lg">
              <Trophy size={14} className="text-purple-400" />
              <span className="text-xs font-bold text-purple-300">Your Rank: #{myRank.rank}</span>
              <span className="text-[10px] text-gray-500">({formatRating(myRank.rating)} pts)</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-500/20 uppercase tracking-wider">
            <Download size={14} /> Export Rankings
          </button>
        </div>
      </div>

      {/* --- PODIUM (page 1 only) --- */}
      {isFirstPage && (
        loading ? <PodiumSkeleton /> : (
          podiumEntries.length >= 3 ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-16">
              {podiumEntries.map((entry, idx) => (
                <PodiumCard key={entry._id} entry={entry} variant={podiumOrder[idx]} />
              ))}
            </div>
          ) : podiumEntries.length > 0 ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-16">
              {podiumEntries.map((entry, idx) => (
                <PodiumCard key={entry._id} entry={entry} variant={podiumOrder[idx]} />
              ))}
            </div>
          ) : null
        )
      )}

      {/* --- TABLE SECTION --- */}
      <div className="max-w-7xl mx-auto bg-[#0d0d14] border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-lg font-bold text-white">Full Rankings</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or skill..."
              className="bg-[#06060a] border border-white/10 rounded-xl py-2 pl-12 pr-4 text-xs focus:outline-none focus:border-purple-500/50 w-full md:w-80 transition-all"
            />
          </div>
        </div>

        {loading ? <TableSkeleton /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-8 py-6">Rank</th>
                  <th className="px-8 py-6">Developer</th>
                  <th className="px-8 py-6">Top Skills</th>
                  <th className="px-8 py-6">Projects</th>
                  <th className="px-8 py-6">Rating Score</th>
                  <th className="px-8 py-6 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTable.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-gray-600 text-sm">
                      {searchQuery ? "No developers match your search." : "No developers found."}
                    </td>
                  </tr>
                ) : (
                  filteredTable.map((row) => {
                    const isMe = myRank && row._id === myRank.name; // we check by rank position
                    const isMyRow = myRank && row.rank === myRank.rank;
                    return (
                      <tr key={row._id} className={`group hover:bg-white/[0.02] transition-colors ${isMyRow ? 'bg-purple-500/[0.05] border-l-2 border-l-purple-500' : ''}`}>
                        <td className="px-8 py-6 text-sm font-bold text-gray-500 font-mono italic">
                          <div className="flex items-center gap-2">
                            #{String(row.rank).padStart(2, '0')}
                            {isMyRow && <span className="text-[8px] bg-purple-600 text-white px-1.5 py-0.5 rounded-full font-bold not-italic">YOU</span>}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                              {row.avatar ? (
                                <img src={row.avatar} alt={row.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                                  style={{ background: getGradient(row.name) }}>
                                  {getInitials(row.name)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{row.name}</p>
                              <p className="text-[10px] text-gray-500 font-medium">{row.role || "Developer"}{row.institute ? ` · ${row.institute}` : ""}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex gap-1.5 flex-wrap">
                            {row.topSkills.length > 0 ? row.topSkills.map(s => (
                              <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
                            )) : (
                              <span className="text-[10px] text-gray-600 italic">No skills yet</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-white">{row.totalProjects}</td>
                        <td className="px-8 py-6 min-w-[180px]">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-white w-14">{formatRating(row.rating)}</span>
                            <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${isMyRow ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-purple-600'}`}
                                style={{ width: `${Math.min(100, entries.length > 0 ? (row.rating / Math.max(entries[0]?.rating || 1, 1)) * 100 : 0)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="p-8 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <span>
            Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, totalUsers)} of {totalUsers} Developers
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show pages around current
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded-lg transition ${pageNum === page
                      ? "bg-purple-600 text-white"
                      : "hover:bg-white/5"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS SUMMARY BAR --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-16">
        {[
          { icon: <Zap size={18} />, label: 'Total Developers', val: totalUsers.toLocaleString(), color: 'text-purple-500' },
          { icon: <Code2 size={18} />, label: 'Avg Rating', val: entries.length > 0 ? Math.round(entries.reduce((a, b) => a + b.rating, 0) / entries.length).toLocaleString() : '0', color: 'text-blue-500' },
          { icon: <Rocket size={18} />, label: 'Top Rating', val: entries.length > 0 ? formatRating(Math.max(...entries.map(e => e.rating))) : '0', color: 'text-orange-500' },
          { icon: <TrendingUp size={18} />, label: 'Your Rating', val: myRank ? formatRating(myRank.rating) : '—', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#11111a] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white italic">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="max-w-7xl mx-auto text-center py-20 relative overflow-hidden rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full" />
        <h2 className="text-3xl font-bold text-white mb-4 italic relative z-10">Boost Your <span className="text-purple-500">Rating Score</span></h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
          Analyze more repositories and build your skill graph to climb the rankings. Your rating is computed from skill levels, confidence, commits, and experience.
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
      <footer className="flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] pb-8 mt-12">
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