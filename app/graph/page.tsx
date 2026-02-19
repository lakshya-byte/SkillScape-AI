'use client';

import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Star, Activity, Clock, Server, ExternalLink } from 'lucide-react';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#050505]">
      <div className="flex items-center space-x-3 text-sm text-gray-500">
        <Server className="h-4 w-4 animate-pulse" />
        <span>Loading Graph Engine...</span>
      </div>
    </div>
  )
});

type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

interface ProjectNode {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  stars: number;
  commitCount: number;
  lastUpdated: string;
  status: ProjectStatus;
  complexityScore: number;
  category: string;
  x?: number; y?: number; z?: number;
}

const graphData = {
  nodes: [
    { id: 'prj_velionai', name: 'VelionAI', description: 'Enterprise SaaS Intelligence Platform.', githubUrl: 'https://github.com/lakshya/velionai', stars: 45, commitCount: 1250, lastUpdated: '2026-02-18', status: 'ACTIVE', complexityScore: 95, category: 'AI/SaaS' },
    { id: 'prj_krishinetra', name: 'KrishiNetra', description: 'Android mobile application utilizing MVVM.', githubUrl: 'https://github.com/lakshya/krishinetra', stars: 82, commitCount: 840, lastUpdated: '2025-12-05', status: 'COMPLETED', complexityScore: 88, category: 'Mobile App' },
    { id: 'prj_ncs', name: 'NCS Website', description: 'Official web platform for the Nibble Computer Society.', githubUrl: 'https://github.com/lakshya/ncs-website', stars: 120, commitCount: 620, lastUpdated: '2026-02-14', status: 'ACTIVE', complexityScore: 75, category: 'Web Platform' },
    { id: 'prj_formify', name: 'Formify', description: 'Dynamic form generation engine.', githubUrl: 'https://github.com/lakshya/formify', stars: 34, commitCount: 410, lastUpdated: '2026-01-10', status: 'ACTIVE', complexityScore: 82, category: 'Tooling' },
    { id: 'prj_summarease', name: 'SummarEase', description: 'Automated NLP-based text summarization.', githubUrl: 'https://github.com/lakshya/summarease', stars: 15, commitCount: 180, lastUpdated: '2025-11-30', status: 'ARCHIVED', complexityScore: 65, category: 'Data Science' }
  ] as ProjectNode[],
  links: [
    { source: 'prj_velionai', target: 'prj_formify' },
    { source: 'prj_velionai', target: 'prj_ncs' },
    { source: 'prj_krishinetra', target: 'prj_summarease' },
    { source: 'prj_formify', target: 'prj_ncs' }
  ]
};

// Clean Geometry & Semantic Materials
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const statusColors = {
  ACTIVE: '#10B981',    // Emerald Green
  COMPLETED: '#3B82F6', // Blue
  ARCHIVED: '#6B7280'   // Gray
};

export default function ProjectDataIntelligenceGraph() {
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverNode, setHoverNode] = useState<ProjectNode | null>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>());

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nodeNeighbors } = useMemo(() => {
    const neighbors = new Map<string, Set<string>>();
    graphData.links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      if (!neighbors.has(sourceId)) neighbors.set(sourceId, new Set());
      if (!neighbors.has(targetId)) neighbors.set(targetId, new Set());
      neighbors.get(sourceId)?.add(targetId);
      neighbors.get(targetId)?.add(sourceId);
    });
    return { nodeNeighbors: neighbors };
  }, []);

  const handleNodeHover = useCallback((node: ProjectNode | null) => {
    setHoverNode(node || null);
    const newHighlightNodes = new Set<string>();
    if (node) {
      newHighlightNodes.add(node.id);
      nodeNeighbors.get(node.id)?.forEach(neighborId => newHighlightNodes.add(neighborId));
    }
    setHighlightNodes(newHighlightNodes);
  }, [nodeNeighbors]);

  // Engineered Camera Zoom Math
  const handleNodeClick = useCallback((node: ProjectNode) => {
    if (!fgRef.current || node.x === undefined || node.y === undefined || node.z === undefined) return;

    // Define resting distance from the node (adjust to zoom closer/further)
    const distance = 80; 
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    const newPos = { 
      x: node.x * distRatio, 
      y: node.y * distRatio, 
      z: node.z * distRatio 
    };

    // cameraPosition(position, lookAt, transitionDurationMs)
    fgRef.current.cameraPosition(newPos, node, 1500);
  }, []);

  const customNodeRenderer = useCallback((node: ProjectNode) => {
    const group = new THREE.Group();
    const isHighlighted = highlightNodes.size === 0 || highlightNodes.has(node.id);
    const color = statusColors[node.status];

    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: isHighlighted ? 1 : 0.2
    });

    const mesh = new THREE.Mesh(sphereGeometry, material);
    
    // Scale logically based on complexity
    const visualSize = Math.max(4, (node.complexityScore / 100) * 15); 
    mesh.scale.set(visualSize, visualSize, visualSize);
    group.add(mesh);

    if (isHighlighted) {
      const sprite = new SpriteText(node.name);
      sprite.color = '#FFFFFF';
      sprite.textHeight = visualSize * 0.4;
      sprite.position.set(0, visualSize + 6, 0);
      sprite.material.depthWrite = false;
      group.add(sprite);
    }

    return group;
  }, [highlightNodes]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505] font-sans">
      <div className="absolute inset-0 z-0">
        {dimensions.width > 0 && (
          <ForceGraph3D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            backgroundColor="#050505"
            onNodeHover={handleNodeHover as any}
            onNodeClick={handleNodeClick as any}
            nodeThreeObject={customNodeRenderer as any}
            linkColor={() => '#333333'}
            linkWidth={0.5}
            cooldownTicks={100}
            enableNodeDrag={false}
          />
        )}
      </div>

      <AnimatePresence>
        {hoverNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-8 left-8 z-50 w-80 rounded-xl border border-white/10 bg-[#111111] p-5 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{hoverNode.name}</h2>
              <span className="rounded px-2 py-1 text-[10px] font-bold tracking-wider" style={{ backgroundColor: `${statusColors[hoverNode.status]}20`, color: statusColors[hoverNode.status] }}>
                {hoverNode.status}
              </span>
            </div>
            
            <p className="mb-5 text-sm text-gray-400">{hoverNode.description}</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 flex items-center"><GitCommit className="w-3 h-3 mr-1"/> Commits</span>
                <span className="text-sm font-medium text-gray-200">{hoverNode.commitCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 flex items-center"><Activity className="w-3 h-3 mr-1"/> Complexity</span>
                <span className="text-sm font-medium text-gray-200">{hoverNode.complexityScore}/100</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 flex items-center"><Star className="w-3 h-3 mr-1"/> Stars</span>
                <span className="text-sm font-medium text-gray-200">{hoverNode.stars}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1"/> Updated</span>
                <span className="text-sm font-medium text-gray-200">{hoverNode.lastUpdated}</span>
              </div>
            </div>

            <div className="mt-5 text-center text-xs text-gray-500 flex justify-center items-center">
               <ExternalLink className="w-3 h-3 mr-1"/> Double-click node for GitHub
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
