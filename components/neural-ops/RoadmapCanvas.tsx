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
import { AnimatePresence, motion } from "framer-motion";
import api from "@/lib/api";

import RoadmapNode from "./RoadmapNode";
import RoadmapEdge, { EdgeGradientDefs } from "./RoadmapEdge";
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  X,
  BookOpen,
  Target,
  Layers,
  CheckCircle2,
} from "lucide-react";

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

// ─── Level labels for dialog ────────────────────────────────────
const LEVEL_LABELS = ["Root", "Core", "Module", "Topic"];
const LEVEL_BADGE_STYLES: Record<number, string> = {
  0: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  1: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  2: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  3: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

// ─── Detail dialog data type ────────────────────────────────────
interface NodeDetail {
  id: string;
  title: string;
  description: string;
  level: number;
  completed: boolean;
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

  // ── Completion tracking (persisted via API) ───────────────────
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());

  // ── Detail dialog state ───────────────────────────────────────
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);

  // ── Load saved completions from backend ───────────────────────
  useEffect(() => {
    async function loadCompletions() {
      try {
        const res = await api.get(`/roadmaps/${roadmapId}`);
        const data = res.data?.data || res.data;
        const savedIds: string[] = data?.completedNodeIds || [];
        if (savedIds.length > 0) {
          setCompletedNodes(new Set(savedIds));
        }
      } catch (err) {
        // Non-critical — completion state just won't be preloaded
        console.warn("Could not load saved completions:", err);
      }
    }
    loadCompletions();
  }, [roadmapId]);

  // ── Toggle completion for a node (persists to backend) ────────
  const handleToggleComplete = useCallback(
    async (nodeId: string) => {
      // Optimistic UI update
      setCompletedNodes((prev) => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        return next;
      });

      // Persist to backend
      try {
        await api.patch(`/roadmaps/${roadmapId}/nodes/${nodeId}/toggle`);
      } catch (err) {
        console.error("Failed to persist completion:", err);
        // Revert on error
        setCompletedNodes((prev) => {
          const reverted = new Set(prev);
          if (reverted.has(nodeId)) {
            reverted.delete(nodeId);
          } else {
            reverted.add(nodeId);
          }
          return reverted;
        });
      }
    },
    [roadmapId],
  );

  // ── Inject completion state + callback into nodes ─────────────
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          completed: completedNodes.has(node.id),
          onToggleComplete: handleToggleComplete,
        },
      })),
    );
  }, [completedNodes, handleToggleComplete, setNodes]);

  // ── Handle node click → open detail dialog ────────────────────
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode({
        id: node.id,
        title: (node.data as any).title || "",
        description: (node.data as any).description || "",
        level: (node.data as any).level ?? 0,
        completed: completedNodes.has(node.id),
      });
    },
    [completedNodes],
  );

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
              completed: false,
              onToggleComplete: handleToggleComplete,
            },
          };

          pendingNodes.push(newNode);

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

  // ── Completion stats ──────────────────────────────────────────
  const totalNodes = nodes.length;
  const completedCount = completedNodes.size;
  const progressPercent =
    totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;

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

        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          {totalNodes > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                <span className="text-white font-medium">{completedCount}</span>
                /{totalNodes} completed
              </span>
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

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
          onNodeClick={handleNodeClick}
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

      {/* ── Node Detail Dialog ──────────────────────────────── */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/10 bg-[#0d0a18] shadow-2xl shadow-violet-900/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
                        LEVEL_BADGE_STYLES[selectedNode.level] ||
                        LEVEL_BADGE_STYLES[3]
                      }`}
                    >
                      {LEVEL_LABELS[selectedNode.level] ||
                        `L${selectedNode.level}`}
                    </span>
                    {selectedNode.completed && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                    {selectedNode.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all ml-4 mt-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Description */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                      Description
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedNode.description ||
                      "No description available for this node."}
                  </p>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Layers className="w-3 h-3 text-gray-500" />
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Depth Level
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Level {selectedNode.level} —{" "}
                      {LEVEL_LABELS[selectedNode.level] || "Deep"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Target className="w-3 h-3 text-gray-500" />
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </span>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        selectedNode.completed
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {selectedNode.completed ? "Completed" : "In Progress"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    handleToggleComplete(selectedNode.id);
                    setSelectedNode({
                      ...selectedNode,
                      completed: !selectedNode.completed,
                    });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedNode.completed
                      ? "border border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedNode.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
