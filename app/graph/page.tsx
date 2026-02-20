"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2, AlertTriangle } from "lucide-react";
import api from "@/lib/api";
import { transformSkillsGraph, type GraphData } from "@/lib/graphTransformer";

const SkillIntelligenceGraph = dynamic(
  () => import("@/components/graph/SkillIntelligenceGraph"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#020202]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-cyan-500" />
      </div>
    ),
  },
);

export default function GraphPage() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGraph() {
      try {
        // Get current user
        const userRes = await api.get("/user/me");
        const userData = userRes.data?.data || userRes.data;
        const skills = userData?.skills;

        if (skills?.nodes && skills.nodes.length > 0) {
          setGraphData(transformSkillsGraph(skills));
        } else {
          setError(
            "No intelligence graph found. Generate one from the Analysis dashboard first.",
          );
        }
      } catch (err: any) {
        console.error("Graph page error:", err);
        setError(
          err?.response?.status === 401
            ? "Please log in to view your intelligence graph."
            : err?.message || "Failed to load graph.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGraph();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020202]">
        <Loader2 className="w-10 h-10 text-violet-400 animate-spin mb-4" />
        <p className="text-sm text-gray-500">Loading Intelligence Graph...</p>
      </div>
    );
  }

  if (error || !graphData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020202]">
        <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
        <p className="text-sm text-gray-400 max-w-md text-center">{error}</p>
      </div>
    );
  }

  return <SkillIntelligenceGraph graphData={graphData} />;
}
