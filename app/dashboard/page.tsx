"use client";

import GraphVisualization from "@/components/Dasboard/GraphVisualization";
import HeroStats from "@/components/Dasboard/HeroStats";
import IntelligencePanels from "@/components/Dasboard/IntelligencePanels";
import NetworkExpansion from "@/components/Dasboard/NetworkExpansion";
import Navbar from "@/components/landing/navbar/Navbar";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content — Sidebar handled by layout ─────────────────────── */}
      <div className="flex-1 relative w-full">
        {/* Ambient glow top-right of content area */}
        <div
          className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Scrollable content */}
        <div className="relative z-10 px-4 md:px-8 pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto ">
          {/* Section 1 — Header + Stats */}
          <HeroStats />

          {/* Section 2 — Graph Visualization */}
          <GraphVisualization />

          {/* Section 3 — Intelligence Panels */}
          <IntelligencePanels />

          {/* Section 4 — Network Expansion CTA */}
          <NetworkExpansion />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
