"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Cpu, ChevronDown } from "lucide-react";

interface Props {
    onTestCreated: (test: any) => void;
}

const DIFFICULTIES = ["beginner", "intermediate", "advanced", "expert"];
const QUESTION_COUNTS = [5, 10, 20];

const TestGenerator: React.FC<Props> = ({ onTestCreated }) => {
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("intermediate");
    const [totalQuestions, setTotalQuestions] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { generateTechTest } = await import("@/lib/authApi");
            const res = await generateTechTest({ topic: topic.trim(), difficulty, totalQuestions });
            onTestCreated(res.data);
        } catch (err: any) {
            setError(err.message || "Failed to generate test");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                    <Cpu className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-white">Generate Intelligence Test</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                        AI-Powered Question Generation
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Topic */}
                <div>
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1.5 pl-1">
                        Topic
                    </label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. TensorFlow, React, Kubernetes..."
                        disabled={loading}
                        className="w-full bg-[#0a0514] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition disabled:opacity-50"
                    />
                </div>

                {/* Difficulty + Count */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1.5 pl-1">
                            Difficulty
                        </label>
                        <div className="relative">
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                disabled={loading}
                                className="w-full bg-[#0a0514] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-200 appearance-none focus:outline-none focus:border-purple-500 transition disabled:opacity-50 cursor-pointer"
                            >
                                {DIFFICULTIES.map((d) => (
                                    <option key={d} value={d}>
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1.5 pl-1">
                            Questions
                        </label>
                        <div className="relative">
                            <select
                                value={totalQuestions}
                                onChange={(e) => setTotalQuestions(Number(e.target.value))}
                                disabled={loading}
                                className="w-full bg-[#0a0514] border border-gray-800 rounded-xl py-3 px-4 text-sm text-gray-200 appearance-none focus:outline-none focus:border-purple-500 transition disabled:opacity-50 cursor-pointer"
                            >
                                {QUESTION_COUNTS.map((n) => (
                                    <option key={n} value={n}>
                                        {n} Questions
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-xs text-red-400 font-medium px-1">{error}</p>
                )}

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-3 transition-all duration-300 ${!loading && topic.trim()
                            ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.5)] cursor-pointer"
                            : "bg-white/5 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="animate-pulse">Generating Intelligence Test...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Test</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TestGenerator;
