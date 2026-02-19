"use client"

import React, { useState } from "react";

const TABS = ["Global Graph", "Cluster View", "Dependency Map"] as const;

const nodes = [
  { id: 1, cx: 200, cy: 180, r: 30, glow: true },
  { id: 2, cx: 320, cy: 115, r: 10, glow: false },
  { id: 3, cx: 378, cy: 202, r: 7, glow: false },
  { id: 4, cx: 292, cy: 262, r: 13, glow: false },
  { id: 5, cx: 138, cy: 96, r: 8, glow: false },
  { id: 6, cx: 95, cy: 198, r: 9, glow: false },
  { id: 7, cx: 158, cy: 282, r: 6, glow: false },
  { id: 8, cx: 428, cy: 138, r: 5, glow: false },
  { id: 9, cx: 445, cy: 248, r: 4, glow: false },
  { id: 10, cx: 60, cy: 140, r: 5, glow: false },
];

const edges = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [2, 3], [2, 8], [3, 4], [4, 9], [5, 10]];

const GraphVisualization: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const getNode = (id: number) => nodes.find(n => n.id === id)!;

  return (
    <section className="bg-white/[0.02] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Tab Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === i
                  ? "bg-violet-600/25 border border-violet-500/50 text-violet-300"
                  : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          placeholder="Locate node…"
          className="bg-white/[0.05] border border-white/10 rounded-md px-3 py-1.5 text-[11px] font-mono text-gray-400 placeholder-gray-600 outline-none focus:border-violet-500/40 w-44"
        />
      </div>

      {/* Graph + Node Panel */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_220px]">
        {/* SVG Canvas */}
        <div
          className="relative h-[310px]"
          style={{ background: "radial-gradient(ellipse at 42% 52%, rgba(124,58,237,0.07) 0%, transparent 60%)" }}
        >
          <svg viewBox="0 0 500 310" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="dotgrid" x="0" y="0" width="28" height="26" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.7" fill="#1f2937" />
              </pattern>
            </defs>
            <rect width="500" height="310" fill="url(#dotgrid)" opacity="0.6" />

            {edges.map(([a, b], i) => {
              const na = getNode(a); const nb = getNode(b);
              return <line key={i} x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy} stroke="rgba(124,58,237,0.22)" strokeWidth={1} />;
            })}

            {/* Pulse ring */}
            <circle cx={200} cy={180} r={44} fill="rgba(124,58,237,0.08)">
              <animate attributeName="r" values="42;56;42" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.04;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={200} cy={180} r={40} fill="rgba(124,58,237,0.07)" />

            {nodes.filter(n => !n.glow).map(node => (
              <circle key={node.id} cx={node.cx} cy={node.cy} r={node.r} fill="#374151" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            ))}

            <circle cx={200} cy={180} r={30} fill="#7c3aed" stroke="#a78bfa" strokeWidth={1.5}
              style={{ filter: "drop-shadow(0 0 12px rgba(124,58,237,0.9))" }} />
          </svg>

          {/* Zoom Controls */}
          <div className="absolute right-3 bottom-3 flex flex-col gap-1">
            {["+", "−", "⛶", "⊡"].map((s, i) => (
              <button key={i} className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded-md text-gray-500 text-sm flex items-center justify-center hover:bg-white/10 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Node Detail */}
        <div className="border-l border-white/[0.06] p-4 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" style={{ boxShadow: "0 0 8px rgba(124,58,237,1)" }} />
            <span className="text-[9px] font-mono text-violet-400 uppercase tracking-[0.12em]">Intelligence Node Selected</span>
          </div>
          <h3 className="font-display text-[15px] font-bold text-white mb-2">Distributed Systems</h3>
          <p className="text-[11px] font-mono text-gray-500 leading-relaxed mb-4">
            Less AI proficiency, high correlation with Kubernetes. Docker and 3x projects found in Repository #26.
          </p>
          <div className="flex gap-2">
            <button className="border border-white/15 text-gray-400 rounded-md px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider hover:bg-white/5 transition-colors">
              Details
            </button>
            <button className="bg-violet-600/20 border border-violet-500/40 text-violet-300 rounded-md px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider hover:bg-violet-600/30 transition-colors">
              Expand
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GraphVisualization;