"use client"

import React from "react";

const NetworkExpansion: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white/[0.02] border border-white/[0.07] rounded-xl px-6 py-9 text-center">
      {/* Subtle radial glow behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(124,58,237,0.10) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        <h3 className="font-display text-[18px] font-bold text-white mb-2">
          Expand Your Intelligence Network
        </h3>
        <p className="text-[12px] font-mono text-gray-500 leading-relaxed mb-6">
          Invite collaborators to map out organizational knowledge silos and optimize team
          <br />
          distribution with Velion AI Enterprise.
        </p>

        <div className="flex gap-3 justify-center">
          <button className="bg-white text-[#0a0a0f] rounded-lg px-6 py-2.5 text-[12px] font-mono font-bold hover:bg-gray-100 transition-colors shadow-md">
            Upgrade to Enterprise
          </button>
          <button className="bg-transparent border border-white/20 text-gray-200 rounded-lg px-6 py-2.5 text-[12px] font-mono hover:bg-white/5 transition-colors">
            Refer a Teammate
          </button>
        </div>
      </div>
    </section>
  );
};

export default NetworkExpansion;