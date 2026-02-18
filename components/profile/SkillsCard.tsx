'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Layers, Globe, Code2 } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  color: string;
  meta: string;
}

const SKILLS: Skill[] = [
  { name: "TensorFlow", level: 98, icon: Cpu, color: "bg-orange-500", meta: "Mastery • 12k+ lines" },
  { name: "Rust / Systems", level: 92, icon: Terminal, color: "bg-white", meta: "Advanced • Core Arch" },
  { name: "React / Three.js", level: 88, icon: Layers, color: "bg-cyan-400", meta: "Expert • UI/UX" },
  { name: "Smart Contracts", level: 76, icon: Code2, color: "bg-indigo-500", meta: "Intermediate • Solidity" },
];

export default function SkillsCard() {
  return (
    <div className="relative h-full bg-[#0A0A0F]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-6 md:p-8 overflow-hidden group hover:border-white/10 transition-colors duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
          <Cpu size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Neural Mapping</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Core Competencies</p>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {SKILLS.map((skill, i) => (
          <motion.div 
            key={skill.name}
            className="group/skill relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Label Row */}
            <div className="flex justify-between items-end mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <skill.icon size={14} className="text-slate-500 group-hover/skill:text-white transition-colors" />
                <span className="text-sm font-semibold text-slate-300 group-hover/skill:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-500 group-hover/skill:text-white transition-colors">
                  {skill.level}%
                </span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
              {/* The Active Bar */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + (i * 0.1), ease: "circOut" }}
                className={`absolute h-full left-0 top-0 rounded-full ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
              >
                {/* Shimmer Effect */}
                <div className="absolute top-0 right-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shimmer" />
              </motion.div>
            </div>
            
            {/* Meta Detail (Shows on Hover) */}
            <div className="absolute top-0 right-0 -mt-6 text-[10px] text-slate-400 opacity-0 transform translate-y-2 group-hover/skill:opacity-100 group-hover/skill:translate-y-0 transition-all duration-300 pointer-events-none">
              {skill.meta}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
    </div>
  );
}