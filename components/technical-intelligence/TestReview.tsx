"use client";

import React from "react";
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Lightbulb,
    RotateCcw,
    ArrowLeft,
} from "lucide-react";

interface AIReview {
    strengths: string[];
    weaknesses: string[];
    improvementAreas: string[];
    recommendations: string[];
    summary: string;
}

interface Props {
    result: {
        score: number;
        totalQuestions: number;
        percentage: number;
        aiReview: AIReview;
        durationSeconds: number;
    };
    topic: string;
    difficulty: string;
    onBack: () => void;
    onRetake: () => void;
}

const scoreColor = (p: number) => {
    if (p >= 80) return { bg: "bg-emerald-500", text: "text-emerald-400", ring: "#22c55e", label: "Excellent" };
    if (p >= 60) return { bg: "bg-purple-500", text: "text-purple-400", ring: "#a855f7", label: "Good" };
    if (p >= 40) return { bg: "bg-yellow-500", text: "text-yellow-400", ring: "#eab308", label: "Average" };
    return { bg: "bg-red-500", text: "text-red-400", ring: "#ef4444", label: "Needs Work" };
};

const TestReview: React.FC<Props> = ({ result, topic, difficulty, onBack, onRetake }) => {
    const { score, totalQuestions, percentage, aiReview, durationSeconds } = result;
    const color = scoreColor(percentage);
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;

    const mins = Math.floor(durationSeconds / 60);
    const secs = durationSeconds % 60;

    return (
        <div className="space-y-5">
            {/* Score Card */}
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Gauge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                                <circle
                                    cx="60" cy="60" r="54"
                                    stroke={color.ring}
                                    strokeWidth="8" fill="none" strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-3xl font-black ${color.text}`}>{percentage}%</span>
                            </div>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${color.text}`}>
                            {color.label}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-lg font-bold text-white mb-1">Test Complete</h2>
                        <p className="text-xs text-gray-500 font-mono mb-4">
                            {topic} • {difficulty}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                                <span className="text-gray-500">Score: </span>
                                <span className="text-white font-bold">{score}/{totalQuestions}</span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                                <span className="text-gray-500">Time: </span>
                                <span className="text-white font-bold">{mins}m {secs}s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Review Summary */}
            {aiReview.summary && (
                <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-5">
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                        "{aiReview.summary}"
                    </p>
                </div>
            )}

            {/* Review Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Strengths */}
                <ReviewSection
                    title="Strengths"
                    items={aiReview.strengths}
                    icon={<TrendingUp className="w-4 h-4" />}
                    accent="emerald"
                />
                {/* Weaknesses */}
                <ReviewSection
                    title="Weaknesses"
                    items={aiReview.weaknesses}
                    icon={<TrendingDown className="w-4 h-4" />}
                    accent="red"
                />
                {/* Improvement Areas */}
                <ReviewSection
                    title="Improvement Areas"
                    items={aiReview.improvementAreas}
                    icon={<AlertTriangle className="w-4 h-4" />}
                    accent="yellow"
                />
                {/* Recommendations */}
                <ReviewSection
                    title="Recommendations"
                    items={aiReview.recommendations}
                    icon={<Lightbulb className="w-4 h-4" />}
                    accent="purple"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <button
                    onClick={onRetake}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                    <RotateCcw className="w-4 h-4" /> New Test
                </button>
            </div>
        </div>
    );
};

/* ─── Sub-component ──────────────────────────────────────────── */
const ReviewSection = ({
    title,
    items,
    icon,
    accent,
}: {
    title: string;
    items: string[];
    icon: React.ReactNode;
    accent: string;
}) => {
    const colors: Record<string, { bg: string; text: string; dot: string }> = {
        emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
        red: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
        yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
    };
    const c = colors[accent] || colors.purple;

    return (
        <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-1.5 rounded-lg ${c.bg} ${c.text}`}>{icon}</div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
            </div>
            <div className="space-y-2.5">
                {items?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                        <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
                    </div>
                ))}
                {(!items || items.length === 0) && (
                    <p className="text-xs text-gray-600 italic">No data</p>
                )}
            </div>
        </div>
    );
};

export default TestReview;
