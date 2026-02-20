"use client";

import React from "react";
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Cpu,
    Briefcase,
    Lightbulb,
    MapPin,
    ChevronRight,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
export interface ResumeInsights {
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    skillGaps: string[];
    extractedSkills: string[];
    recommendedRoles: string[];
    improvementSuggestions: string[];
    careerRoadmap: string[];
}

interface Props {
    insights: ResumeInsights;
    filename: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const scoreColor = (s: number) => {
    if (s >= 80) return { ring: "#22c55e", text: "text-emerald-400", label: "Excellent" };
    if (s >= 60) return { ring: "#a855f7", text: "text-purple-400", label: "Good" };
    if (s >= 40) return { ring: "#eab308", text: "text-yellow-400", label: "Average" };
    return { ring: "#ef4444", text: "text-red-400", label: "Needs Work" };
};

/* ─── Sub-components ─────────────────────────────────────────── */

const ScoreGauge = ({ score }: { score: number }) => {
    const { ring, text, label } = scoreColor(score);
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                        cx="60" cy="60" r="54"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="60" cy="60" r="54"
                        stroke={ring}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${text}`}>{score}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-0.5">
                        / 100
                    </span>
                </div>
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${text}`}>
                {label}
            </span>
        </div>
    );
};

const SectionCard = ({
    title,
    icon,
    items,
    accentClass = "text-purple-400",
    bgClass = "bg-purple-500/10",
    borderClass = "border-purple-500/20",
    type = "list",
}: {
    title: string;
    icon: React.ReactNode;
    items: string[];
    accentClass?: string;
    bgClass?: string;
    borderClass?: string;
    type?: "list" | "badges" | "numbered" | "timeline";
}) => (
    <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700/80 transition-colors">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
            <div className={`p-1.5 rounded-lg ${bgClass} ${accentClass}`}>{icon}</div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <span className="ml-auto text-[10px] text-gray-600 font-mono">
                {items.length}
            </span>
        </div>

        {/* Content by type */}
        {type === "badges" ? (
            <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <span
                        key={i}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${borderClass} ${bgClass} ${accentClass}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        ) : type === "numbered" ? (
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                        <span
                            className={`w-6 h-6 rounded-full ${bgClass} ${accentClass} flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5`}
                        >
                            {i + 1}
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
                    </div>
                ))}
            </div>
        ) : type === "timeline" ? (
            <div className="relative ml-3">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent" />
                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 relative">
                            <div
                                className={`w-4 h-4 rounded-full shrink-0 mt-0.5 border-2 z-10 ${i === 0
                                        ? "bg-purple-500 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                                        : "bg-[#110d1b] border-gray-700"
                                    }`}
                            />
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
                                <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-2.5">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <div
                            className={`w-1.5 h-1.5 rounded-full ${accentClass.replace("text-", "bg-")} mt-1.5 shrink-0`}
                        />
                        <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
);

/* ─── Main Component ─────────────────────────────────────────── */
const ResumeInsightsDisplay: React.FC<Props> = ({ insights, filename }) => {
    return (
        <div className="space-y-6">
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <ScoreGauge score={insights.overallScore} />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-lg font-bold text-white mb-1">
                            Resume Intelligence Report
                        </h2>
                        <p className="text-xs text-gray-500 font-mono mb-4">
                            {filename}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                                <span className="text-gray-500">Skills: </span>
                                <span className="text-white font-bold">
                                    {insights.extractedSkills.length}
                                </span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                                <span className="text-gray-500">Gaps: </span>
                                <span className="text-yellow-400 font-bold">
                                    {insights.skillGaps.length}
                                </span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                                <span className="text-gray-500">Roles: </span>
                                <span className="text-purple-400 font-bold">
                                    {insights.recommendedRoles.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Grid ─────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SectionCard
                    title="Strengths"
                    icon={<TrendingUp className="w-4 h-4" />}
                    items={insights.strengths}
                    accentClass="text-emerald-400"
                    bgClass="bg-emerald-500/10"
                    borderClass="border-emerald-500/20"
                />

                <SectionCard
                    title="Weaknesses"
                    icon={<TrendingDown className="w-4 h-4" />}
                    items={insights.weaknesses}
                    accentClass="text-red-400"
                    bgClass="bg-red-500/10"
                    borderClass="border-red-500/20"
                />

                <SectionCard
                    title="Skill Gaps"
                    icon={<AlertTriangle className="w-4 h-4" />}
                    items={insights.skillGaps}
                    accentClass="text-yellow-400"
                    bgClass="bg-yellow-500/10"
                    borderClass="border-yellow-500/20"
                />

                <SectionCard
                    title="Recommended Roles"
                    icon={<Briefcase className="w-4 h-4" />}
                    items={insights.recommendedRoles}
                    accentClass="text-blue-400"
                    bgClass="bg-blue-500/10"
                    borderClass="border-blue-500/20"
                    type="badges"
                />
            </div>

            {/* ── Full-width sections ──────────────────────────────────── */}
            <SectionCard
                title="Extracted Skills"
                icon={<Cpu className="w-4 h-4" />}
                items={insights.extractedSkills}
                accentClass="text-purple-400"
                bgClass="bg-purple-500/10"
                borderClass="border-purple-500/20"
                type="badges"
            />

            <SectionCard
                title="Improvement Suggestions"
                icon={<Lightbulb className="w-4 h-4" />}
                items={insights.improvementSuggestions}
                accentClass="text-amber-400"
                bgClass="bg-amber-500/10"
                borderClass="border-amber-500/20"
                type="numbered"
            />

            <SectionCard
                title="Career Roadmap"
                icon={<MapPin className="w-4 h-4" />}
                items={insights.careerRoadmap}
                accentClass="text-purple-400"
                bgClass="bg-purple-500/10"
                borderClass="border-purple-500/20"
                type="timeline"
            />
        </div>
    );
};

export default ResumeInsightsDisplay;
