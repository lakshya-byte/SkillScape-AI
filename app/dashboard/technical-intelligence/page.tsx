"use client";

import React, { useState, useCallback } from "react";
import { BrainCircuit } from "lucide-react";
import Navbar from "@/components/landing/navbar/Navbar";
import TestGenerator from "@/components/technical-intelligence/TestGenerator"; 
import TestAttempt from "@/components/technical-intelligence/TestAttempt";
import TestReview from "@/components/technical-intelligence/TestReview";
import TestHistory from "@/components/technical-intelligence/TestHistory";

/* ─── View States ────────────────────────────────────────────── */
type View =
  | { type: "dashboard" }
  | { type: "attempt"; test: any }
  | { type: "review"; result: any; topic: string; difficulty: string };

export default function TechnicalIntelligencePage() {
  const [view, setView] = useState<View>({ type: "dashboard" });
  const [historyKey, setHistoryKey] = useState(0); // force re-fetch

  /* ── Handlers ───────────────────────────────────────────────── */
  const handleTestCreated = (test: any) => {
    setView({ type: "attempt", test });
  };

  const handleTestSubmitted = (result: any) => {
    const test = (view as any).test;
    setView({
      type: "review",
      result,
      topic: test?.topic || "Unknown",
      difficulty: test?.difficulty || "intermediate",
    });
  };

  const handleBackToDashboard = () => {
    setView({ type: "dashboard" });
    setHistoryKey((k) => k + 1); // refresh history
  };

  const handleNewTest = () => {
    setView({ type: "dashboard" });
  };

  const handleSelectAttempt = useCallback(async (attemptId: string) => {
    try {
      const { getAttemptById } = await import("@/lib/authApi");
      const res = await getAttemptById(attemptId);
      const attempt = res.data;
      setView({
        type: "review",
        result: {
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
          percentage: attempt.percentage,
          aiReview: attempt.aiReview,
          durationSeconds: attempt.durationSeconds,
        },
        topic: attempt.testId?.topic || "Unknown",
        difficulty: attempt.testId?.difficulty || "intermediate",
      });
    } catch (err) {
      console.error("Failed to load attempt:", err);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 relative w-full">
        {/* Ambient glow */}
        <div
          className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 px-4 md:px-8 pt-24 md:pt-20 pb-10 max-w-5xl mx-auto">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Technical Intelligence
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  AI-Powered Knowledge Assessment
                </p>
              </div>
            </div>
          </div>

          {/* ── Dashboard View ──────────────────────────────────── */}
          {view.type === "dashboard" && (
            <div className="space-y-8">
              <TestGenerator onTestCreated={handleTestCreated} />
              <TestHistory
                key={historyKey}
                onSelectAttempt={handleSelectAttempt}
              />
            </div>
          )}

          {/* ── Test Attempt View ───────────────────────────────── */}
          {view.type === "attempt" && (
            <TestAttempt
              test={view.test}
              onSubmit={handleTestSubmitted}
              onBack={handleBackToDashboard}
            />
          )}

          {/* ── Review View ─────────────────────────────────────── */}
          {view.type === "review" && (
            <TestReview
              result={view.result}
              topic={view.topic}
              difficulty={view.difficulty}
              onBack={handleBackToDashboard}
              onRetake={handleNewTest}
            />
          )}
        </div>
      </div>
    </div>
  );
}
