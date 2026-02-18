'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  BrainCircuit, 
  Layout, 
  Server, 
  PenTool, 
  Infinity as InfinityIcon, 
  Box, 
  Check, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { useOnboarding } from '../OnboardingContext';

// Skill Domains Configuration
const SKILLS = [
  { 
    id: 'ai-ml', 
    title: 'AI & Machine Learning', 
    desc: 'Neural networks, deep learning models, and predictive analytics.', 
    icon: BrainCircuit, 
    meta: 'TENSOR_FLOW_V4'
  },
  { 
    id: 'frontend', 
    title: 'Frontend', 
    desc: 'React, Vue, WebGL, Interface Engineering.', 
    icon: Layout, 
    meta: 'DOM_MATRIX'
  },
  { 
    id: 'backend', 
    title: 'Backend', 
    desc: 'Server architecture, APIs, & Databases.', 
    icon: Server, 
    meta: 'SYS_ADMIN'
  },
  { 
    id: 'design', 
    title: 'Design', 
    desc: 'UI/UX, System Architecture, visual design.', 
    icon: PenTool, 
    meta: 'PIXEL_PERFECT'
  },
  { 
    id: 'devops', 
    title: 'DevOps', 
    desc: 'CI/CD, Kubernetes, Cloud Infrastructure.', 
    icon: InfinityIcon, 
    meta: 'INFRA_V2.0' // Matches the reference image
  },
  { 
    id: 'blockchain', 
    title: 'Blockchain', 
    desc: 'Smart Contracts, Web3, DeFi protocols.', 
    icon: Box, 
    meta: 'HASH_256'
  },
];

export default function Step4_Skills() {
  const { nextStep, prevStep, userData, updateUserData } = useOnboarding();
  const containerRef = useRef(null);

  // Toggle selection logic
  const toggleSkill = (id: string) => {
    const currentSkills = userData.skills || [];
    const newSkills = currentSkills.includes(id)
      ? currentSkills.filter(s => s !== id) // Remove
      : [...currentSkills, id]; // Add
    
    updateUserData({ skills: newSkills });
  };

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Elements
      gsap.fromTo(".header-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Grid Cards Stagger
      gsap.fromTo(".skill-card",
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "back.out(1.0)" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const hasSelection = userData.skills.length > 0;

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col">
      
      {/* 1. SYSTEM HEADER (Top Bar) */}
      <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4 header-item">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-purple-400 font-bold tracking-widest uppercase mb-1">Phase 05</span>
          <span className="text-xs text-slate-500 font-medium">System Configuration</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-white">Step 5 of 6</span>
        </div>
      </div>

      {/* 2. MAIN TITLE SECTION */}
      <div className="mb-12 header-item">
         {/* Progress Line */}
         <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
            <motion.div 
               className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
               initial={{ width: "60%" }}
               animate={{ width: "80%" }}
               transition={{ duration: 1, ease: "circOut" }}
            />
         </div>

         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
           Map Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Cognitive Domains</span>
         </h2>
         <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
           Select the neural pathways relevant to your expertise to calibrate your workspace intelligence.
         </p>
      </div>

      {/* 3. SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {SKILLS.map((skill) => {
          const isSelected = userData.skills.includes(skill.id);
          
          return (
            <motion.div
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`skill-card relative p-6 rounded-2xl border cursor-pointer group transition-all duration-300 overflow-hidden min-h-[180px] flex flex-col justify-between ${
                isSelected 
                  ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                  : 'bg-[#0E0E14] border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active Background Gradient */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Header: Icon & Checkbox */}
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${isSelected ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                  <skill.icon size={24} />
                </div>
                
                {/* Custom Checkbox UI */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${isSelected ? 'bg-purple-500 border-purple-500' : 'bg-transparent border-white/20 group-hover:border-white/40'}`}>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {skill.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {skill.desc}
                </p>
              </div>

              {/* Meta Tag (Bottom Right) */}
              <div className="absolute bottom-4 right-4 opacity-30">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  {skill.meta}
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* 4. FOOTER ACTIONS */}
      <div className="flex items-center justify-between header-item">
         <button 
           onClick={prevStep}
           className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors group px-4 py-2"
         >
           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
           Back
         </button>

         <motion.button
            onClick={() => nextStep()}
            // The image shows "Continue" is active even if just one is selected, but usually better to wait for selection
            // We will allow continue but style it differently if empty? No, let's assume always active or validation
            className={`relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                hasSelection 
                ? 'text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105' 
                : 'bg-white/5 text-slate-500 cursor-not-allowed' // Optional: remove this check if you want it always active
            }`}
            whileTap={hasSelection ? { scale: 0.98 } : {}}
            disabled={!hasSelection}
         >
             {/* Gradient Background */}
             {hasSelection && (
                 <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]" />
             )}
             
             <span className="relative z-10">Continue</span>
             <ArrowRight size={16} className="relative z-10" />
         </motion.button>
      </div>

    </div>
  );
}