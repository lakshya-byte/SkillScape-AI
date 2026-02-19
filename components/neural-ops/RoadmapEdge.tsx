"use client";

import React from "react";
import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";

export default function RoadmapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      {/* Glow layer */}
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          stroke: "rgba(139, 92, 246, 0.15)",
          strokeWidth: 6,
          filter: "blur(4px)",
          ...style,
        }}
      />
      {/* Main edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "url(#roadmap-edge-gradient)",
          strokeWidth: 2,
          ...style,
        }}
      />
    </>
  );
}

/** SVG gradient definition — render once inside the React Flow wrapper */
export function EdgeGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="roadmap-edge-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} />
        </linearGradient>
      </defs>
    </svg>
  );
}
