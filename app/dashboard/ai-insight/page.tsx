"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Cpu, History, ChevronDown, FileText, Clock } from "lucide-react";
import ResumeUpload from "@/components/aiInsight/ResumeUpload";
import ResumeInsightsDisplay, {
  type ResumeInsights,
} from "@/components/aiInsight/ResumeInsightsDisplay";
import { analyzeResume, getResumeHistory } from "@/lib/authApi";
import Navbar from "@/components/landing/navbar/Navbar";

/* ─── Types ──────────────────────────────────────────────────── */
interface InsightResult {
  _id: string;
  originalFilename: string;
  insights: ResumeInsights;
  createdAt: string;
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AiInsightPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<InsightResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<InsightResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  /* ── Fetch history ──────────────────────────────────────────── */
  const fetchHistory = useCallback(async () => {
    try {
      setLoadingHistory(true);
      const res = await getResumeHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  /* ── Handle analyze ─────────────────────────────────────────── */
  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setCurrentResult(null);

    try {
      const res = await analyzeResume(file);
      setCurrentResult(res.data);
      // Refresh history
      fetchHistory();
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* ── View a past result ─────────────────────────────────────── */
  const viewHistoryItem = (item: InsightResult) => {
    setCurrentResult(item);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 relative w-full">
        {/* Ambient glow */}
        <div
          className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 px-4 md:px-8 pt-24 md:pt-20 pb-10 max-w-5xl mx-auto">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Resume Intelligence
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  Powered by Velion AI Engine
                </p>
              </div>
            </div>
          </div>

          {/* ── Upload Section ───────────────────────────────────── */}
          <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6 mb-6">
            <ResumeUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* ── Error ────────────────────────────────────────────── */}
          {error && (
            <div className="mb-6 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {/* ── Loading Skeleton ─────────────────────────────────── */}
          {isAnalyzing && (
            <div className="space-y-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-800 rounded w-1/3 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-800/60 rounded w-full" />
                    <div className="h-3 bg-gray-800/40 rounded w-4/5" />
                    <div className="h-3 bg-gray-800/30 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Insights Display ─────────────────────────────────── */}
          {currentResult && !isAnalyzing && (
            <ResumeInsightsDisplay
              insights={currentResult.insights}
              filename={currentResult.originalFilename}
            />
          )}

          {/* ── History Section ──────────────────────────────────── */}
          {history.length > 0 && (
            <div className="mt-10">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold transition-colors mb-4"
              >
                <History className="w-4 h-4" />
                <span>Previous Analyses ({history.length})</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showHistory ? "rotate-180" : ""}`}
                />
              </button>

              {showHistory && (
                <div className="space-y-3">
                  {history.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => viewHistoryItem(item)}
                      className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${currentResult?._id === item._id
                          ? "bg-purple-500/10 border-purple-500/30"
                          : "bg-[#110d1b] border-gray-800/80 hover:border-gray-700"
                        }`}
                    >
                      <div className="p-2 rounded-lg bg-white/5 text-gray-500">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">
                          {item.originalFilename}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span className="text-[10px] text-gray-600 font-mono">
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-lg font-black ${item.insights.overallScore >= 80
                              ? "text-emerald-400"
                              : item.insights.overallScore >= 60
                                ? "text-purple-400"
                                : item.insights.overallScore >= 40
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                        >
                          {item.insights.overallScore}
                        </span>
                        <span className="text-[9px] text-gray-600 block">
                          / 100
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
