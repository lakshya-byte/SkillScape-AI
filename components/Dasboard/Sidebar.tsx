"use client"

import React, { useState } from "react";

/* ─── Nav item types ─────────────────────────────────────────────────────── */
interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    section?: string; // section label above the item
}

/* ─── Icons (inline SVG, no external deps) ──────────────────────────────── */
const IconDeepProject = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
);
const IconAIInsight = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
    </svg>
);
const IconNeuralOps = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
);
const IconNetwork = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 100 6 3 3 0 000-6z" /><path d="M19 16a3 3 0 100 6 3 3 0 000-6z" /><path d="M5 16a3 3 0 100 6 3 3 0 000-6z" /><path d="M12 8v3M5.5 17.5L10 13M18.5 17.5L14 13" />
    </svg>
);
const IconLeaderboard = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21V10M12 21V3M16 21v-7" />
    </svg>
);
const IconMission = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M12 12v10" /><path d="M2 7v10l10 5" /><path d="M22 7v10l-10 5" />
    </svg>
);

const NAV_ITEMS: NavItem[] = [
    { id: "deep-project", label: "Deep Project Analysis", icon: <IconDeepProject /> },
    { id: "ai-insight", label: "AI Insight", icon: <IconAIInsight /> },
    { id: "neural-ops", label: "Neural Ops", icon: <IconNeuralOps /> },
    { id: "network", label: "Network", icon: <IconNetwork /> },
    { id: "leaderboard", label: "Leaderboard", icon: <IconLeaderboard /> },
    { id: "mission", label: "Mission Section", icon: <IconMission />, section: "MISSIONS" },
];

/* ─── Sidebar component ──────────────────────────────────────────────────── */
const Sidebar: React.FC = () => {
    const [active, setActive] = useState("deep-project");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-white/10 text-white shadow-lg"
            >
                {isOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 pt-30 left-0 h-full w-[185px] flex flex-col z-40 select-none transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{
                    background: "#0d0d14",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Logo */}
                {/* <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 0 16px rgba(124,58,237,0.5)" }}
                    >
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" />
                        </svg>
                    </div>
                    <span className="font-display text-[15px] font-bold text-white tracking-tight">SkillScape AI</span>
                </div> */}

                {/* Nav */}
                <nav className="flex-1 px-2 pt-3 pb-2 overflow-y-auto flex flex-col gap-0.5">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.id}>
                            {/* Section label */}
                            {item.section && (
                                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.15em] px-3 pt-4 pb-1.5">
                                    {item.section}
                                </p>
                            )}
                            <button
                                onClick={() => setActive(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group ${active === item.id
                                        ? "bg-violet-600/20 border border-violet-500/30 text-white"
                                        : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent"
                                    }`}
                            >
                                {/* Active indicator bar */}
                                {active === item.id && (
                                    <span
                                        className="absolute left-0 w-[3px] h-8 rounded-r-full bg-violet-500"
                                        style={{ boxShadow: "0 0 8px rgba(124,58,237,0.8)" }}
                                    />
                                )}
                                <span className={active === item.id ? "text-violet-400" : "text-gray-600 group-hover:text-gray-400"}>
                                    {item.icon}
                                </span>
                                <span className="text-[12px] font-mono leading-tight">{item.label}</span>
                            </button>
                        </React.Fragment>
                    ))}
                </nav>

                {/* User profile */}
                <div className="px-3 py-4 border-t border-white/[0.06]">
                    <button className="w-full flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.04] transition-colors group">
                        {/* Avatar */}
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[13px]"
                            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                        >
                            A
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[12px] font-mono font-bold text-white truncate">Alex Morgan</p>
                            <p className="text-[10px] font-mono text-violet-400 truncate">Pro Member</p>
                        </div>
                        {/* Chevron */}
                        <svg className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;