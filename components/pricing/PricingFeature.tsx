'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PricingFeatureProps {
  text: string;
  isPopular?: boolean; // If true, we might use a special icon
}

export default function PricingFeature({ text, isPopular = false }: PricingFeatureProps) {
  return (
    <motion.li 
      className="flex items-start gap-3 group"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {/* 1. The "Neural Node" Bullet Point */}
      <div className={`
        mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
        ${isPopular 
          ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
          : 'bg-indigo-500/10 text-indigo-400'
        }
      `}>
        {isPopular ? (
          <Sparkles size={12} strokeWidth={3} />
        ) : (
          <div className="w-1.5 h-1.5 rounded-sm bg-current rotate-45" /> 
        )}
      </div>

      {/* 2. Feature Text */}
      <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-300 leading-tight">
        {text}
      </span>
    </motion.li>
  );
}