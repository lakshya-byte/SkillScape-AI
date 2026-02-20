"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Dagre from "@dagrejs/dagre";

import RoadmapNode from "./RoadmapNode";
import RoadmapEdge, { EdgeGradientDefs } from "./RoadmapEdge";
import { ArrowLeft, Loader2, Sparkles, X } from "lucide-react";

// ─── Custom node/edge type maps ─────────────────────────────────
const nodeTypes = { roadmap: RoadmapNode };
const edgeTypes = { roadmap: RoadmapEdge };

// ─── Dagre auto-layout ──────────────────────────────────────────
function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB",
): { nodes: Node[]; edges: Edge[] } {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 240, height: 100 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  Dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: { x: pos.x - 120, y: pos.y - 50 },
    };
  });

  return { nodes: layoutedNodes, edges };
}

// ─── Props ──────────────────────────────────────────────────────
interface RoadmapCanvasProps {
  roadmapId: string;
  onClose: () => void;
}

export default function RoadmapCanvas({
  roadmapId,
  onClose,
}: RoadmapCanvasProps) {
  return (
    <ReactFlowProvider>
      <RoadmapCanvasInner roadmapId={roadmapId} onClose={onClose} />
    </ReactFlowProvider>
  );
}

function RoadmapCanvasInner({ roadmapId, onClose }: RoadmapCanvasProps) {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [status, setStatus] = useState<
    "connecting" | "generating" | "completed" | "error"
  >("connecting");
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // ── Connect to SSE stream ─────────────────────────────────────
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/roadmaps/stream/${roadmapId}`;

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.current = eventSource;

    const pendingNodes: Node[] = [];
    const pendingEdges: Edge[] = [];

    eventSource.onopen = () => {
      setStatus("generating");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "node") {
          const newNode: Node = {
            id: data.payload.id,
            type: "roadmap",
            position: data.payload.position || { x: 0, y: 0 },
            data: {
              title: data.payload.title,
              description: data.payload.description,
              level: data.payload.level,
            },
          };

          pendingNodes.push(newNode);

          // Re-layout every time a node is added
          const allNodes = [...pendingNodes];
          const allEdges = [...pendingEdges];
          const { nodes: laid } = applyDagreLayout(allNodes, allEdges);

          setNodes([...laid]);
        }

        if (data.type === "edge") {
          const newEdge: Edge = {
            id: data.payload.id,
            source: data.payload.source,
            target: data.payload.target,
            type: "roadmap",
            animated: true,
          };

          pendingEdges.push(newEdge);

          // Re-layout with updated edges
          const allNodes = [...pendingNodes];
          const allEdges = [...pendingEdges];
          const { nodes: laid, edges: laidEdges } = applyDagreLayout(
            allNodes,
            allEdges,
          );

          setNodes([...laid]);
          setEdges([...laidEdges]);
        }

        if (data.type === "done") {
          setStatus("completed");
          eventSource.close();
        }

        if (data.type === "error") {
          setError(data.message || "Generation failed");
          setStatus("error");
          eventSource.close();
        }
      } catch (e) {
        console.error("SSE parse error:", e);
      }
    };

    eventSource.onerror = () => {
      if (status !== "completed") {
        setError("Connection lost. Try reopening this roadmap.");
        setStatus("error");
      }
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [roadmapId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fit view on completion ────────────────────────────────────
  const onInit = useCallback((instance: any) => {
    setTimeout(() => instance.fitView({ padding: 0.2 }), 500);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#060610] flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a14]/80 backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          {status === "generating" && (
            <div className="flex items-center gap-2 text-xs text-violet-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="font-mono tracking-wide">
                Generating roadmap…
              </span>
            </div>
          )}
          {status === "completed" && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Roadmap complete
            </div>
          )}
          {status === "error" && (
            <div className="text-xs text-red-400 font-mono">{error}</div>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <EdgeGradientDefs />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={onInit}
          fitView
          minZoom={0.1}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          style={{ background: "#060610" }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="rgba(139, 92, 246, 0.08)"
          />
          <Controls
            showInteractive={false}
            className="!bg-[#0f0a1a] !border-white/10 !rounded-xl !shadow-lg [&>button]:!bg-[#0f0a1a] [&>button]:!border-white/10 [&>button]:!text-gray-400 [&>button:hover]:!bg-white/10 [&>button:hover]:!text-white"
          />
        </ReactFlow>

        {/* Loading overlay */}
        {status === "connecting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#060610]/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              <p className="text-sm text-gray-400 font-mono">
                Establishing connection…
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
