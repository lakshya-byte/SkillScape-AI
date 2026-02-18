'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  glowColor?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: 'monthly' | 'yearly';
  index: number;
}

export default function PricingCard({ tier, billingCycle, index }: PricingCardProps) {
  const isPopular = tier.popular;
  const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group flex flex-col h-full rounded-[32px] overflow-hidden transition-transform duration-500 ${
        isPopular 
          ? 'bg-[#0F0F16]/90 border border-purple-500/50 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)] scale-105 z-10' 
          : 'bg-[#0A0A0F]/80 border border-white/5 hover:border-white/10 hover:bg-[#0A0A0F]/90 z-0'
      }`}
    >
      {/* 1. "Most Popular" Badge (Conditional) */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/40 border border-white/20 z-20">
            Most Popular
          </span>
        </div>
      )}

      {/* 2. Top Lighting Effect (Ambient Glow) */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-${tier.glowColor || 'white'}/20 to-transparent opacity-50`} />

      <div className="p-8 flex flex-col h-full relative z-10">
        
        {/* Header */}
        <div className="mb-6">
          <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${isPopular ? 'text-white' : 'text-slate-200'}`}>
            {tier.name}
            {isPopular && <Sparkles size={16} className="text-purple-400 fill-purple-400/20 animate-pulse" />}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">
            {tier.description}
          </p>
        </div>

        {/* Price Display (Animated) */}
        <div className="mb-8 flex items-end gap-1">
          <div className="text-4xl font-bold text-white tracking-tight flex items-start">
            <span className="text-lg text-slate-500 mt-1 mr-1">$</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {price}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-sm text-slate-500 mb-1 font-medium">/mo</span>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-8 ${isPopular ? 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent' : 'bg-white/5'}`} />

        {/* Features List */}
        <ul className="space-y-4 mb-8 flex-grow">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-400 group/item">
              <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                isPopular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-slate-500'
              }`}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className="group-hover/item:text-slate-200 transition-colors">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
          isPopular 
            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]' 
            : 'bg-white/5 text-white hover:bg-white/10 border border-white/5 hover:border-white/10'
        }`}>
          {tier.cta}
          <ArrowRight size={16} className={`transition-transform duration-300 ${isPopular ? 'group-hover/btn:translate-x-1' : 'opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2'}`} />
        </button>

      </div>

      {/* Background Gradient (Subtle) */}
      {isPopular && (
         <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}