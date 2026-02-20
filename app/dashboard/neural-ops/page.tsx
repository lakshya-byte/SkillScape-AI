"use client";

import React from "react";
import Navbar from "@/components/landing/navbar/Navbar";
import NeuralOpsDashboard from "@/components/neural-ops/NeuralOpsDashboard";

const NeuralOpsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-1 relative w-full">
        {/* Ambient glow */}
        <div
          className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Scrollable content */}
        <div className="relative z-10 px-4 md:px-8 pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto">
          <NeuralOpsDashboard />
        </div>
      </div>
    </div>
  );
};

export default NeuralOpsPage;
