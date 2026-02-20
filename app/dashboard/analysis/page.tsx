"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  Brain,
  Maximize2,
  Zap,
} from "lucide-react";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Sidebar from "@/components/Dasboard/Sidebar";
import Navbar from "@/components/landing/navbar/Navbar";
import api from "@/lib/api";
import { transformSkillsGraph, type GraphData } from "@/lib/graphTransformer";

import dynamic from "next/dynamic";

const SkillIntelligenceGraph = dynamic(
  () => import("@/components/graph/SkillIntelligenceGraph"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    ),
  },
);

// ─── Inner Component ─────────────────────────────────────────────
function AnalysisContent() {
  const { user, loading: userLoading } = useUser();
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [rerunning, setRerunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGraph, setShowGraph] = useState(false);

  // ── Load graph (uses cache) ────────────────────────────────────
  const loadGraph = useCallback(async () => {
    if (!user?._id) return;

    setLoading(true);
    setError(null);

    try {
      // Check context first
      const contextSkills = (user as any)?.skills;
      if (contextSkills?.nodes && contextSkills.nodes.length > 0) {
        setGraphData(transformSkillsGraph(contextSkills));
        setLoading(false);
        return;
      }

      // Fresh fetch
      const userRes = await api.get("/user/me");
      const userData = userRes.data?.data || userRes.data;
      const skills = userData?.skills;

      if (skills?.nodes && skills.nodes.length > 0) {
        setGraphData(transformSkillsGraph(skills));
        setLoading(false);
        return;
      }

      // Generate via n8n
      setGenerating(true);
      const graphRes = await api.get(`/graph/generate/${user._id}`);
      const generated = graphRes.data?.data?.graph || graphRes.data?.graph;

      if (generated?.nodes && generated.nodes.length > 0) {
        setGraphData(transformSkillsGraph(generated));
      } else {
        setError("Graph generation returned empty data. Please try again.");
      }
    } catch (err: any) {
      console.error("Graph load error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load intelligence graph.";
      setError(msg);
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  }, [user]);

  // ── Rerun Intelligence (force regenerate) ──────────────────────
  const rerunGraph = useCallback(async () => {
    if (!user?._id) return;

    setRerunning(true);
    setError(null);

    try {
      const res = await api.post(`/graph/regenerate/${user._id}`);
      const generated = res.data?.data?.graph || res.data?.graph;

      if (generated?.nodes && generated.nodes.length > 0) {
        setGraphData(transformSkillsGraph(generated));
      } else {
        setError("Regeneration returned empty data. Please try again.");
      }
    } catch (err: any) {
      console.error("Graph rerun error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to regenerate graph.",
      );
    } finally {
      setRerunning(false);
    }
  }, [user]);

  useEffect(() => {
    if (!userLoading && user?._id) {
      loadGraph();
    }
  }, [userLoading, user?._id, loadGraph]);

  // ── Fullscreen overlay within dashboard ────────────────────────
  if (showGraph && graphData) {
    return (
      <div className="fixed inset-0 z-[60]">
        <SkillIntelligenceGraph graphData={graphData} />
        <button
          onClick={() => setShowGraph(false)}
          className="fixed top-6 right-6 z-[70] px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-medium backdrop-blur-xl hover:bg-white/10 transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const isReady = !userLoading && user?._id;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ── Header with action buttons (ALWAYS visible) ────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/20">
              <Brain className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Deep Project Analysis
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-[52px]">
            Your AI-generated skill intelligence graph
          </p>
        </div>

        {/* Action buttons — always visible when user is loaded */}
        {isReady && (
          <div className="flex items-center gap-2">
            <button
              onClick={rerunGraph}
              disabled={rerunning || loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs text-white font-medium transition-all"
            >
              {rerunning ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              Rerun Intelligence
            </button>
            <button
              onClick={() => window.open("/graph", "_blank")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Open Fullscreen
            </button>
          </div>
        )}
      </div>

      {/* ── Loading / Generating / Rerunning State ────────────── */}
      {(loading || userLoading || rerunning) && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-xl animate-pulse" />
            <div className="relative p-6 rounded-full bg-[#0d0b18] border border-violet-500/20">
              <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">
            {rerunning
              ? "Reconstructing Neural Intelligence..."
              : generating
                ? "Generating Neural Intelligence..."
                : "Loading Intelligence Graph..."}
          </h2>
          <p className="text-xs text-gray-500 max-w-sm">
            {rerunning || generating
              ? "Our AI is analyzing your GitHub repositories and building your skill DNA. This may take up to 30 seconds."
              : "Checking for existing graph data..."}
          </p>
        </div>
      )}

      {/* ── Error State ───────────────────────────────────────── */}
      {error && !loading && !rerunning && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Failed to load intelligence graph
          </h2>
          <p className="text-xs text-gray-500 max-w-sm mb-6">{error}</p>
          <button
            onClick={loadGraph}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      {/* ── Graph Loaded State ────────────────────────────────── */}
      {!loading && !rerunning && !error && graphData && (
        <div>
          <div
            onClick={() => setShowGraph(true)}
            className="relative group cursor-pointer rounded-2xl border border-white/[0.06] bg-[#0d0b18]/80 overflow-hidden transition-all hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-900/10"
          >
            <div className="h-[500px] relative">
              <SkillIntelligenceGraph graphData={graphData} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <div className="px-6 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-xl shadow-violet-900/40">
                  Click to Enter Full-Screen Graph
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500">Nodes</p>
                  <p className="text-lg font-bold text-white">
                    {graphData.nodes.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Connections</p>
                  <p className="text-lg font-bold text-white">
                    {graphData.links.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Skills</p>
                  <p className="text-lg font-bold text-white">
                    {graphData.nodes.filter((n) => n.type === "SKILL").length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="text-lg font-bold text-white">
                    {graphData.nodes.filter((n) => n.type === "PROJECT").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Empty State ───────────────────────────────────────── */}
      {!loading && !rerunning && !error && !graphData && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="p-6 rounded-full bg-violet-600/10 border border-violet-500/20 mb-6">
            <Brain className="w-10 h-10 text-violet-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">
            No Intelligence Graph Yet
          </h2>
          <p className="text-xs text-gray-500 max-w-sm mb-6">
            Connect your GitHub account and generate your first intelligence
            graph to see your skill DNA visualized.
          </p>
          <button
            onClick={loadGraph}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
          >
            <Brain className="w-4 h-4" />
            Generate Intelligence Graph
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page Wrapper ────────────────────────────────────────────────
export default function AnalysisPage() {
  return (
    <UserProvider>
      <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
        <Navbar />
        <Sidebar />
        <div className="flex-1 relative w-full">
          <div
            className="fixed top-0 left-0 md:left-[185px] right-0 h-[50vh] pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 px-4 md:px-8 md:ml-[210px] pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto pl-40">
            <AnalysisContent />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
