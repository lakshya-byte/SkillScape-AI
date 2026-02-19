"use client";

import React from "react";
import { Clock, GitBranch, ExternalLink, Loader2 } from "lucide-react";

interface RoadmapCardProps {
  roadmap: {
    _id: string;
    title: string;
    status: "generating" | "completed";
    createdAt: string;
    nodeCount: number;
    edgeCount: number;
  };
  onOpen: (id: string) => void;
}

export default function RoadmapCard({ roadmap, onOpen }: RoadmapCardProps) {
  const date = new Date(roadmap.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isGenerating = roadmap.status === "generating";

  return (
    <div
      className="group relative rounded-xl border border-white/[0.08] bg-[#0f0a1a]/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer"
      onClick={() => onOpen(roadmap._id)}
    >
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
            isGenerating
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
          {isGenerating ? "Generating" : "Completed"}
        </span>

        <button className="p-1.5 rounded-lg text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/10 transition-all">
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-2 tracking-tight">
        {roadmap.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-4 text-[11px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {date}
        </span>
        <span className="flex items-center gap-1.5">
          <GitBranch className="w-3 h-3" />
          {roadmap.nodeCount} nodes
        </span>
      </div>

      {/* Hover gradient line */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
