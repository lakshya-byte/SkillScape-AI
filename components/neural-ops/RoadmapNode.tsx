"use client";

import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Check } from "lucide-react";

export interface RoadmapNodeData {
  title: string;
  description: string;
  level: number;
  completed?: boolean;
  onToggleComplete?: (nodeId: string) => void;
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

function RoadmapNode({ data, id }: NodeProps) {
  const nodeData = data as unknown as RoadmapNodeData;
  const level = nodeData.level ?? 0;
  const style = LEVEL_COLORS[level] || LEVEL_COLORS[3];
  const isCompleted = nodeData.completed ?? false;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    nodeData.onToggleComplete?.(id);
  };

  return (
    <div
      className={`
        group relative min-w-[200px] max-w-[260px] rounded-xl border
        ${isCompleted ? "border-emerald-400/60" : style.border}
        bg-[#0f0a1a]/90 backdrop-blur-md
        shadow-lg ${isCompleted ? "shadow-emerald-500/20" : style.glow}
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl
        cursor-pointer
      `}
    >
      {/* Completed overlay shimmer */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-xl bg-emerald-500/[0.04] pointer-events-none" />
      )}

      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-white/30 !border-0 !-top-1"
      />

      {/* Content */}
      <div className="px-4 py-3">
        {/* Level badge + Complete button */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${
              isCompleted ? "bg-emerald-500/20 text-emerald-300" : style.badge
            }`}
          >
            {isCompleted ? "Completed" : LEVEL_LABELS[level] || `L${level}`}
          </span>

          {/* Tick / Complete button */}
          <button
            onClick={handleToggle}
            className={`
              flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-200
              ${
                isCompleted
                  ? "bg-emerald-500 border-emerald-400 text-white shadow-sm shadow-emerald-500/30"
                  : "border-white/15 text-white/20 hover:border-white/40 hover:text-white/60 hover:bg-white/5"
              }
            `}
            title={isCompleted ? "Mark incomplete" : "Mark complete"}
          >
            <Check className="w-3 h-3" strokeWidth={3} />
          </button>
        </div>

        {/* Title */}
        <h3
          className={`text-sm font-semibold leading-tight mb-1.5 tracking-tight ${
            isCompleted
              ? "text-emerald-200 line-through decoration-emerald-500/40"
              : "text-white"
          }`}
        >
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
