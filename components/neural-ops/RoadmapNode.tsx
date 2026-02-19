"use client";

import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface RoadmapNodeData {
  title: string;
  description: string;
  level: number;
  [key: string]: unknown;
}

const LEVEL_COLORS: Record<
  number,
  { border: string; glow: string; badge: string }
> = {
  0: {
    border: "border-violet-500/60",
    glow: "shadow-violet-500/20",
    badge: "bg-violet-500/20 text-violet-300",
  },
  1: {
    border: "border-cyan-500/50",
    glow: "shadow-cyan-500/15",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  2: {
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/10",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  3: {
    border: "border-amber-500/40",
    glow: "shadow-amber-500/10",
    badge: "bg-amber-500/20 text-amber-300",
  },
};

const LEVEL_LABELS = ["Root", "Core", "Module", "Topic"];

function RoadmapNode({ data }: NodeProps) {
  const nodeData = data as unknown as RoadmapNodeData;
  const level = nodeData.level ?? 0;
  const style = LEVEL_COLORS[level] || LEVEL_COLORS[3];

  return (
    <div
      className={`
        group relative min-w-[200px] max-w-[260px] rounded-xl border
        ${style.border}
        bg-[#0f0a1a]/90 backdrop-blur-md
        shadow-lg ${style.glow}
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl
        cursor-pointer
      `}
    >
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-white/30 !border-0 !-top-1"
      />

      {/* Content */}
      <div className="px-4 py-3">
        {/* Level badge */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${style.badge}`}
          >
            {LEVEL_LABELS[level] || `L${level}`}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse opacity-60" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-tight mb-1.5 tracking-tight">
          {nodeData.title}
        </h3>

        {/* Description */}
        {nodeData.description && (
          <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
            {nodeData.description}
          </p>
        )}
      </div>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-white/30 !border-0 !-bottom-1"
      />
    </div>
  );
}

export default memo(RoadmapNode);
