"use client";

import React from "react";
import RoadmapCard from "./RoadmapCard";
import { FolderOpen } from "lucide-react";

interface Roadmap {
  _id: string;
  title: string;
  status: "generating" | "completed";
  createdAt: string;
  nodeCount: number;
  edgeCount: number;
}

interface SavedRoadmapsGridProps {
  roadmaps: Roadmap[];
  loading: boolean;
  onOpen: (id: string) => void;
}

export default function SavedRoadmapsGrid({
  roadmaps,
  loading,
  onOpen,
}: SavedRoadmapsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse"
          >
            <div className="h-4 w-20 bg-white/[0.06] rounded mb-4" />
            <div className="h-5 w-3/4 bg-white/[0.06] rounded mb-3" />
            <div className="h-3 w-1/2 bg-white/[0.04] rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
          <FolderOpen className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-400 mb-1">
          No roadmaps yet
        </h3>
        <p className="text-xs text-gray-600 max-w-xs">
          Create your first AI-powered roadmap to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap._id} roadmap={roadmap} onOpen={onOpen} />
      ))}
    </div>
  );
}
