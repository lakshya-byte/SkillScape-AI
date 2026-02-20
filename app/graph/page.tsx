"use client";

import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  GitCommit,
  Clock,
  Target,
  ExternalLink,
} from "lucide-react";

// Dynamically import ForceGraph3D to bypass Next.js SSR restrictions
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#050505]">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-cyan-500" />
    </div>
  ),
});

// --- Types & Interfaces ---
type NodeType = "USER" | "SKILL" | "DOMAIN" | "PLATFORM" | "PROJECT";

interface IntelligenceNode {
  id: string;
  name: string;
  type: NodeType;
  description: string;
  level: number; // 1-100
  commits: number;
  experience: number; // Years
  confidence: number; // 0-1
  route: string;
  color: string;
  val: number; // Visual size mapping
  x?: number;
  y?: number;
  z?: number;
}

interface IntelligenceLink {
  source: string | IntelligenceNode;
  target: string | IntelligenceNode;
  value: number; // Strength of relationship
}

interface GraphData {
  nodes: IntelligenceNode[];
  links: IntelligenceLink[];
}

const graphData: GraphData = {
  nodes: [
    {
      id: "user_lakshya",
      name: "Lakshya",
      type: "USER",
      description: "System Architect & Primary Entity",
      level: 100,
      commits: 3420,
      experience: 5,
      confidence: 0.98,
      route: "/profile/lakshya",
      color: "#00F0FF",
      val: 30,
    },
    {
      id: "skill_react",
      name: "React",
      type: "SKILL",
      description: "Frontend Component Architecture",
      level: 95,
      commits: 1205,
      experience: 4,
      confidence: 0.95,
      route: "/skills/react",
      color: "#61DAFB",
      val: 20,
    },
    {
      id: "skill_nextjs",
      name: "Next.js",
      type: "SKILL",
      description: "React Framework & SSR",
      level: 92,
      commits: 840,
      experience: 3,
      confidence: 0.92,
      route: "/skills/nextjs",
      color: "#FFFFFF",
      val: 18,
    },
    {
      id: "skill_nodejs",
      name: "Node.js",
      type: "SKILL",
      description: "Backend Runtime",
      level: 85,
      commits: 650,
      experience: 4,
      confidence: 0.88,
      route: "/skills/nodejs",
      color: "#339933",
      val: 15,
    },
    {
      id: "skill_mongodb",
      name: "MongoDB",
      type: "SKILL",
      description: "NoSQL Database Systems",
      level: 80,
      commits: 320,
      experience: 3,
      confidence: 0.85,
      route: "/skills/mongodb",
      color: "#47A248",
      val: 12,
    },
    {
      id: "skill_ai",
      name: "AI Engineering",
      type: "SKILL",
      description: "LLM Integration & Prompting",
      level: 88,
      commits: 410,
      experience: 2,
      confidence: 0.9,
      route: "/skills/ai",
      color: "#FF0055",
      val: 16,
    },
    {
      id: "plat_github",
      name: "GitHub",
      type: "PLATFORM",
      description: "Version Control & CI/CD",
      level: 90,
      commits: 3420,
      experience: 5,
      confidence: 0.96,
      route: "/platforms/github",
      color: "#F0F6FC",
      val: 14,
    },
    {
      id: "plat_leetcode",
      name: "LeetCode",
      type: "PLATFORM",
      description: "Algorithmic Problem Solving",
      level: 82,
      commits: 0,
      experience: 3,
      confidence: 0.85,
      route: "/platforms/leetcode",
      color: "#FFA116",
      val: 10,
    },
    {
      id: "proj_velionai",
      name: "VelionAI",
      type: "PROJECT",
      description: "SaaS Intelligence Platform",
      level: 98,
      commits: 540,
      experience: 1,
      confidence: 0.99,
      route: "/projects/velionai",
      color: "#A020F0",
      val: 25,
    },
  ],
  links: [
    { source: 'user_lakshya', target: 'skill_react' },
    { source: 'user_lakshya', target: 'skill_nextjs' },
    { source: 'user_lakshya', target: 'skill_nodejs' },
    { source: 'user_lakshya', target: 'skill_mongodb' },
    { source: 'user_lakshya', target: 'skill_ai' },
    { source: 'user_lakshya', target: 'plat_github' },
    { source: 'user_lakshya', target: 'plat_leetcode' },
    { source: 'skill_react', target: 'proj_velionai' },
    { source: 'skill_nextjs', target: 'proj_velionai' },
    { source: 'skill_nodejs', target: 'proj_velionai' },
    { source: 'skill_mongodb', target: 'proj_velionai' },
    { source: 'skill_ai', target: 'proj_velionai' },
  ] as IntelligenceLink[]
};

// --- Shared 3D Resources (GPU Optimization) ---
// We instantiate geometries once to avoid memory leaks during dynamic rendering
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const statusColors = {
  ACTIVE: '#10B981',    // Emerald Green
  COMPLETED: '#3B82F6', // Blue
  ARCHIVED: '#6B7280'   // Gray
};

export default function ProjectDataIntelligenceGraph() {
  const router = useRouter();
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // State: Interaction & Highlighting
  const [hoverNode, setHoverNode] = useState<IntelligenceNode | null>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>());
  const [highlightLinks, setHighlightLinks] = useState(new Set<string>());

  // Responsive canvas sizing
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pre-compute relationship mappings for O(1) hover lookups
  const { nodeNeighbors, linkMap } = useMemo(() => {
    const neighbors = new Map<string, Set<string>>();
    const links = new Map<string, string>();

    graphData.links.forEach((link) => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source;
      const targetId =
        typeof link.target === "object" ? link.target.id : link.target;

      if (!neighbors.has(sourceId)) neighbors.set(sourceId, new Set());
      if (!neighbors.has(targetId)) neighbors.set(targetId, new Set());

      neighbors.get(sourceId)?.add(targetId);
      neighbors.get(targetId)?.add(sourceId);

      links.set(`${sourceId}-${targetId}`, `${sourceId}-${targetId}`);
      links.set(`${targetId}-${sourceId}`, `${sourceId}-${targetId}`);
    });

    return { nodeNeighbors: neighbors, linkMap: links };
  }, []);

  // --- Interaction Handlers ---
  const handleNodeHover = useCallback(
    (node: IntelligenceNode | null) => {
      setHoverNode(node || null);

      const newHighlightNodes = new Set<string>();
      const newHighlightLinks = new Set<string>();

      if (node) {
        newHighlightNodes.add(node.id);
        const neighbors = nodeNeighbors.get(node.id);
        if (neighbors) {
          neighbors.forEach((neighborId) => {
            newHighlightNodes.add(neighborId);
            newHighlightLinks.add(
              linkMap.get(`${node.id}-${neighborId}`) as string,
            );
          });
        }
      }

      setHighlightNodes(newHighlightNodes);
      setHighlightLinks(newHighlightLinks);
    },
    [nodeNeighbors, linkMap],
  );

  const handleNodeClick = useCallback(
    (node: IntelligenceNode) => {
      // 1. Cinematic Camera Focus
      const distance = 100;
      const distRatio =
        1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

      fgRef.current?.cameraPosition(
        {
          x: (node.x || 0) * distRatio,
          y: (node.y || 0) * distRatio,
          z: (node.z || 0) * distRatio,
        },
        { x: node.x, y: node.y, z: node.z },
        2000, // 2 second transition
      );

      // 2. Next.js Routing
      // setTimeout to allow the user to see the camera pan before hard redirecting,
      // or route immediately and rely on Next.js transitions.
      setTimeout(() => {
        router.push(node.route);
      }, 800);
    },
    [router],
  );

  // --- Custom Three.js Rendering ---
  const nodeThreeObject = useCallback(
    (node: IntelligenceNode) => {
      const group = new THREE.Group();

      // Core Mesh
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: node.type === "USER" ? 2.5 : 1.2,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity:
          highlightNodes.size === 0
            ? 0.9
            : highlightNodes.has(node.id)
              ? 1
              : 0.2,
      });

      const sphere = new THREE.Mesh(sphereGeometry, material);
      const size = Math.cbrt(node.val) * 2.5;
      sphere.scale.set(size, size, size);
      group.add(sphere);

      // Floating Label
      if (highlightNodes.size === 0 || highlightNodes.has(node.id)) {
        const sprite = new SpriteText(node.name);
        sprite.color = "#ffffff";
        sprite.textHeight = size * 0.8;
        sprite.position.set(0, size + 4, 0);
        sprite.material.depthWrite = false; // Prevent clipping
        sprite.material.transparent = true;
        group.add(sprite);
      }

      return group;
    },
    [highlightNodes],
  );

  return (
    <div className="relative w-full h-screen bg-[#020202] overflow-hidden">
      {/* 3D Canvas Architecture */}
      <div className="absolute inset-0 z-0">
        {dimensions.width > 0 && (
          <ForceGraph3D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            backgroundColor="#020202"
            // Interaction configuration
            onNodeHover={handleNodeHover as any}
            onNodeClick={handleNodeClick as any}
            // Custom Node Rendering
            nodeThreeObject={nodeThreeObject as any}
            // Link Configuration & Relationships
            linkColor={(link: any) =>
              highlightLinks.has(`${link.source.id}-${link.target.id}`) ||
              highlightLinks.has(`${link.target.id}-${link.source.id}`)
                ? "#ffffff"
                : "rgba(255,255,255,0.1)"
            }
            linkWidth={(link: any) =>
              highlightLinks.has(`${link.source.id}-${link.target.id}`) ||
              highlightLinks.has(`${link.target.id}-${link.source.id}`)
                ? 1.5
                : 0.5
            }
            // Directional Particles (Intelligence Flow)
            linkDirectionalParticles={(link: any) =>
              highlightLinks.has(`${link.source.id}-${link.target.id}`) ||
              highlightLinks.has(`${link.target.id}-${link.source.id}`)
                ? 4
                : 0
            }
            linkDirectionalParticleWidth={1.5}
            linkDirectionalParticleSpeed={(link: any) => link.value * 0.001}
            linkDirectionalParticleColor={() => "#00F0FF"}
            // Physics & Performance Optimization
            cooldownTicks={100}
            warmupTicks={50}
            enableNodeDrag={false}
          />
        )}
      </div>

      {/* Cinematic Lighting Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020202]/40 to-[#020202] opacity-80" />

      {/* Framer Motion Hover Intelligence Panel */}
      <AnimatePresence>
        {hoverNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-10 left-10 z-50 w-80 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {hoverNode.name}
              </h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: `${hoverNode.color}20`,
                  color: hoverNode.color,
                  border: `1px solid ${hoverNode.color}40`,
                }}
              >
                {hoverNode.type}
              </span>
            </div>

            <p className="mb-6 text-sm text-gray-400">
              {hoverNode.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="flex items-center text-xs text-gray-500">
                  <BrainCircuit className="mr-1.5 h-3 w-3" /> Skill Level
                </span>
                <span className="text-lg font-medium text-white">
                  {hoverNode.level}/100
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="flex items-center text-xs text-gray-500">
                  <GitCommit className="mr-1.5 h-3 w-3" /> Activity
                </span>
                <span className="text-lg font-medium text-white">
                  {hoverNode.commits.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1.5 h-3 w-3" /> Experience
                </span>
                <span className="text-lg font-medium text-white">
                  {hoverNode.experience} Yrs
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="flex items-center text-xs text-gray-500">
                  <Target className="mr-1.5 h-3 w-3" /> Confidence
                </span>
                <span className="text-lg font-medium text-white">
                  {(hoverNode.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center rounded-lg border border-white/5 bg-white/5 py-2 text-xs text-gray-400 transition-colors hover:bg-white/10">
              <ExternalLink className="mr-2 h-3 w-3" /> Click node to explore
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
