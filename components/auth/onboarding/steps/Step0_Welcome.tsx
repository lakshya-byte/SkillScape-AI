'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../OnboardingContext';
import { RadarIcon, FingerprintIcon } from '@/assets/Icons'; // Import from the file created in Step 1

export default function Step0_Welcome() {
  const { nextStep } = useOnboarding();
  const [isHovering, setIsHovering] = useState(false);

  // Keyboard shortcut for "Enter" to start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') nextStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      {/* 1. THE RADAR VISUAL */}
      <div className="relative mb-12 group cursor-pointer" onClick={nextStep}>
        {/* Glow Effect behind radar */}
        <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full animate-pulse-slow" />
        
        <RadarIcon className="relative z-10 w-32 h-32 md:w-40 md:h-40 text-purple-500 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
        
        {/* Central "Eye" Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] animate-ping-slow" />
      </div>

      {/* 2. THE HEADLINE */}
      <motion.h1 
        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Initialize Your <span className="text-slate-400">Intelligence</span>
      </motion.h1>

      <motion.p 
        className="text-sm md:text-base text-purple-300/70 font-mono tracking-[0.2em] uppercase mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        VELIONAI IDENTITY PROTOCOL
      </motion.p>

      {/* 3. THE TRIGGER BUTTON */}
      <motion.button
        onClick={nextStep}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative px-8 py-4 bg-[#0A0A0F] border border-purple-500/30 rounded-full flex items-center gap-4 transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Button Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Fingerprint Icon */}
        <div className={`p-2 rounded-full bg-purple-500/10 text-purple-400 transition-colors duration-300 ${isHovering ? 'bg-purple-500 text-white' : ''}`}>
          <FingerprintIcon className="w-5 h-5" />
        </div>

        <span className="relative z-10 text-sm font-bold tracking-widest text-white uppercase">
          Begin Sequence
        </span>
      </motion.button>

      {/* 4. FOOTER HINT */}
      <motion.div 
        className="mt-12 text-[10px] text-slate-600 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        PRESS <span className="text-purple-500">ENTER</span> TO INITIALIZE
      </motion.div>

    </motion.div>
  );
}