'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProfileBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030014]">
      
      {/* 1. Cinematic Noise Texture (Prevents banding & adds realism) */}
      <div 
        className="absolute inset-0 z-[5] opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* 2. Technical Grid Overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />

      {/* 3. Ambient "Living" Light Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen z-[2]"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2], 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen z-[2]"
      />

      {/* 4. Secondary Accent Light (The "Keystroke" glow) */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full z-[2]" />
      
      {/* 5. Vignette (Focus attention to center) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#030014] z-[3]" />
      
    </div>
  );
}