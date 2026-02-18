'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PricingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  onChange: (cycle: 'monthly' | 'yearly') => void;
}

export default function PricingToggle({ billingCycle, onChange }: PricingToggleProps) {
  return (
    <div className="flex justify-center mb-12 relative z-10">
      <div className="relative p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center shadow-2xl shadow-black/50">
        
        {/* Monthly Button */}
        <button
          onClick={() => onChange('monthly')}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
            billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {billingCycle === 'monthly' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        {/* Yearly Button */}
        <button
          onClick={() => onChange('yearly')}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
            billingCycle === 'yearly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {billingCycle === 'yearly' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-indigo-600 rounded-full border border-indigo-400/50 shadow-[0_0_20px_rgba(79,70,229,0.5)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly
          </span>
        </button>

        {/* Floating Discount Badge */}
        <motion.div 
          className="absolute -top-3 -right-4 md:-right-8"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold text-white shadow-lg shadow-purple-500/30 flex items-center gap-1 border border-white/20">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            -20%
          </span>
        </motion.div>

      </div>
    </div>
  );
}