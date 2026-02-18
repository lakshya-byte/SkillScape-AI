'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw } from 'lucide-react';

interface AvatarSelectorProps {
  src: string;
  alt: string;
  isEditable?: boolean;
}

export default function AvatarSelector({ src, alt, isEditable = false }: AvatarSelectorProps) {
  return (
    <motion.div 
      className="relative group cursor-pointer z-20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* 1. Holographic Rotating Ring (The "AI Processing" look) */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-transparent opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
      
      {/* 2. Static Glow Layer */}
      <div className="absolute -inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50" />

      {/* 3. The Avatar Image */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-[4px] bg-[#0A0A0F] overflow-hidden shadow-2xl">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full rounded-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Optional: Edit Overlay (if editable) */}
        {isEditable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <Camera className="text-white w-8 h-8 drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* 4. Status Indicator (The "Live" dot) */}
      <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-30">
        <span className="relative flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-[#0A0A0F]"></span>
        </span>
      </div>

      {/* 5. Rank Badge (Floating element) */}
      <motion.div 
        className="absolute -bottom-2 -left-2 bg-[#0A0A0F] border border-white/10 px-3 py-1 rounded-full shadow-xl flex items-center gap-2"
        whileHover={{ y: -2 }}
      >
        <RefreshCw size={12} className="text-indigo-400 animate-spin-reverse-slow" />
        <span className="text-[10px] font-bold tracking-wider text-indigo-300 uppercase">Syncing</span>
      </motion.div>

    </motion.div>
  );
}