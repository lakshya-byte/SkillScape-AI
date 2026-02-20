"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Loader2,
    Send,
} from "lucide-react";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: string;
    tags: string[];
}

interface Props {
    test: {
        _id: string;
        topic: string;
        difficulty: string;
        totalQuestions: number;
        questions: Question[];
    };
    onSubmit: (result: any) => void;
    onBack: () => void;
}

const TestAttempt: React.FC<Props> = ({ test, onSubmit, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const startedAtRef = useRef(new Date().toISOString());

    // Timer
    useEffect(() => {
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const q = test.questions[currentIndex];
    const answered = Object.keys(answers).length;
    const progress = (answered / test.totalQuestions) * 100;

    const selectAnswer = (option: string) => {
        setAnswers((prev) => ({ ...prev, [q.id]: option }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const { submitTestAttempt } = await import("@/lib/authApi");
            const payload = {
                testId: test._id,
                answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
                    questionId,
                    selectedAnswer,
                })),
                startedAt: startedAtRef.current,
            };
            const res = await submitTestAttempt(payload);
            onSubmit(res.data);
        } catch (err: any) {
            alert(err.message || "Submit failed");
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-5">
            {/* Header Bar */}
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>
                <div className="text-center">
                    <p className="text-xs font-bold text-white">{test.topic}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{test.difficulty}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(seconds)}
                </div>
            </div>

            {/* Progress */}
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-4">
                <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-gray-500 uppercase font-bold tracking-widest">
                        Progress
                    </span>
                    <span className="text-purple-400 font-bold">
                        {answered}/{test.totalQuestions}
                    </span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-purple-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {/* Question dots */}
                <div className="flex gap-1.5 mt-3 flex-wrap">
                    {test.questions.map((question, i) => (
                        <button
                            key={question.id}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all ${i === currentIndex
                                ? "bg-purple-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                                : answers[question.id]
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-white/5 text-gray-600 border border-white/5"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">
                        Question {currentIndex + 1} of {test.totalQuestions}
                    </span>
                    <div className="flex gap-1.5">
                        {q.tags?.map((tag, i) => (
                            <span
                                key={i}
                                className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="text-base font-semibold text-white leading-relaxed mb-6">
                    {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {q.options.map((option, i) => {
                        const isSelected = answers[q.id] === option;
                        const letter = String.fromCharCode(65 + i);
                        return (
                            <button
                                key={i}
                                onClick={() => selectAnswer(option)}
                                className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all group ${isSelected
                                    ? "bg-purple-500/15 border-purple-500/40 text-white"
                                    : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/15 hover:bg-white/[0.04] hover:text-gray-200"
                                    }`}
                            >
                                <span
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${isSelected
                                        ? "bg-purple-600 text-white"
                                        : "bg-white/5 text-gray-500 group-hover:bg-white/10"
                                        }`}
                                >
                                    {letter}
                                </span>
                                <span className="text-sm">{option}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentIndex < test.totalQuestions - 1 ? (
                    <button
                        onClick={() =>
                            setCurrentIndex((i) => Math.min(test.totalQuestions - 1, i + 1))
                        }
                        className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || answered === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${submitting || answered === 0
                            ? "bg-white/5 text-gray-600 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                            }`}
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="animate-pulse">Evaluating...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Test ({answered}/{test.totalQuestions})
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TestAttempt;
