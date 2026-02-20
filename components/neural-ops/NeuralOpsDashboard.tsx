"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Plus, BrainCircuit, RefreshCw } from "lucide-react";
import api from "@/lib/api";

import SavedRoadmapsGrid from "./SavedRoadmapsGrid";
import CreateRoadmapDialog from "./CreateRoadmapDialog";
import RoadmapCanvas from "./RoadmapCanvas";

interface RoadmapSummary {
  _id: string;
  title: string;
  status: "generating" | "completed";
  createdAt: string;
  nodeCount: number;
  edgeCount: number;
}

export default function NeuralOpsDashboard() {
  const [roadmaps, setRoadmaps] = useState<RoadmapSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeRoadmapId, setActiveRoadmapId] = useState<string | null>(null);

  // ── Fetch saved roadmaps ──────────────────────────────────────
  const fetchRoadmaps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/roadmaps");
      setRoadmaps(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch roadmaps:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmaps();
  }, [fetchRoadmaps]);

  // ── When a roadmap is created → open canvas immediately ───────
  const handleCreated = (roadmapId: string) => {
    setDialogOpen(false);
    setActiveRoadmapId(roadmapId);
  };

  // ── When canvas is closed → refresh the grid ──────────────────
  const handleCanvasClose = () => {
    setActiveRoadmapId(null);
    fetchRoadmaps();
  };

  // ── Open existing roadmap ─────────────────────────────────────
  const handleOpenRoadmap = (id: string) => {
    setActiveRoadmapId(id);
  };

  // ── If a canvas is active, render it fullscreen ────────────────
  if (activeRoadmapId) {
    return (
      <RoadmapCanvas roadmapId={activeRoadmapId} onClose={handleCanvasClose} />
    );
  }

  return (
    <div className="flex flex-col gap-8 mx-auto">
      {/* Header */}
      <header className="flex flex-col w-5xl sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI Roadmap Engine
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Neural Ops
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-md">
            Generate intelligent roadmaps with AI. Visualize learning paths as
            connected graphs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchRoadmaps}
            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/30"
          >
            <Plus className="w-4 h-4" />
            Create Roadmap
          </button>
        </div>
      </header>

      {/* Roadmaps Grid */}
      <SavedRoadmapsGrid
        roadmaps={roadmaps}
        loading={loading}
        onOpen={handleOpenRoadmap}
      />

      {/* Create Dialog */}
      <CreateRoadmapDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}
