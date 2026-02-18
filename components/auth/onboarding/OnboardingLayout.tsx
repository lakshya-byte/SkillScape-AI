'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Internal Asset: The "Secure Connection" Pulse
const StatusLight = () => (
  <div className="flex items-center gap-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-widest uppercase">
      Secure_Connection
    </span>
  </div>
);

// Internal Asset: Audio Wave (Footer)
const AudioWave = () => (
  <div className="flex gap-1 items-center h-4">
    {[1, 2, 3, 2, 1].map((h, i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        className="w-1 bg-purple-500/50 rounded-full"
      />
    ))}
  </div>
);

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}

export default function OnboardingLayout({ children, step, totalSteps }: OnboardingLayoutProps) {
  // Calculate progress for the top bar
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030014] text-white selection:bg-purple-500/30">
      
      {/* 1. ATMOSPHERE LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#030014_60%)] opacity-80" />
        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* 2. HEADS UP DISPLAY (HUD) - Fixed UI Elements */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 md:p-8">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          {/* Left: Boot Sequence ID */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400/80">
              <span className="w-3 h-3 border border-purple-500/30 flex items-center justify-center">
                <span className="w-1 h-1 bg-purple-500"></span>
              </span>
              <span>SYSTEM_BOOT_SEQ</span>
            </div>
            <div className="text-[10px] text-slate-600 font-mono pl-5">ID: 884-AX-92</div>
          </div>

          {/* Right: Connection Status */}
          <div className="text-right flex flex-col items-end gap-1">
            <StatusLight />
            <div className="text-[10px] text-slate-600 font-mono">LATENCY: 12MS</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end border-t border-white/5 pt-6">
          <div className="flex gap-6 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-purple-300">
              VELION_CORE v2.0.4
            </span>
            <span className="hidden md:inline-block pt-1">Memory: 64TB Allocated</span>
          </div>

          <div className="flex items-center gap-4">
             {/* Simple Step Indicator */}
             <div className="text-[10px] text-slate-600 font-mono">
                STEP {step + 1} / {totalSteps}
             </div>
             <AudioWave />
          </div>
        </div>
      </div>

      {/* 3. PROGRESS LINE (The "Laser") */}
      <div className="fixed top-0 left-0 h-[2px] bg-white/5 w-full z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>

      {/* 4. MAIN CONTENT STAGE */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        {children}
      </main>

    </div>
  );
}