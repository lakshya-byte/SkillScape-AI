"use client";

import React from "react";
import { Clock, Trophy, ChevronRight } from "lucide-react";

interface Props {
    attempt: {
        _id: string;
        testId: {
            _id: string;
            topic: string;
            difficulty: string;
            totalQuestions: number;
        };
        score: number;
        totalQuestions: number;
        percentage: number;
        submittedAt: string;
        durationSeconds: number;
    };
    onClick: () => void;
}

const scoreColor = (p: number) => {
    if (p >= 80) return "text-emerald-400";
    if (p >= 60) return "text-purple-400";
    if (p >= 40) return "text-yellow-400";
    return "text-red-400";
};

const difficultyBadge = (d: string) => {
    const map: Record<string, string> = {
        beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        advanced: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        expert: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return map[d] || map.intermediate;
};

const TestCard: React.FC<Props> = ({ attempt, onClick }) => {
    const { testId: test, score, totalQuestions, percentage, submittedAt, durationSeconds } = attempt;
    const mins = Math.floor(durationSeconds / 60);

    return (
        <button
            onClick={onClick}
            className="w-full text-left flex items-center gap-4 p-4 rounded-xl bg-[#110d1b] border border-gray-800/80 hover:border-gray-700 transition-all group"
        >
            {/* Score circle */}
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${scoreColor(percentage)}`}>
                <span className="text-lg font-black">{percentage}%</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-semibold truncate">{test.topic}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold capitalize ${difficultyBadge(test.difficulty)}`}>
                        {test.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {score}/{totalQuestions}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mins}m
                    </span>
                </div>
                <p className="text-[10px] text-gray-600 font-mono mt-1">
                    {new Date(submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors shrink-0" />
        </button>
    );
};

export default TestCard;
