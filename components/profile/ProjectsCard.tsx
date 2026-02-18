'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  desc: string;
  tags: string[];
  status: 'live' | 'building' | 'archived';
  link: string;
}

const PROJECTS: Project[] = [
  { 
    name: "Project Chimera", 
    desc: "Autonomous AI Agent Swarm for distributed compute.", 
    tags: ["Python", "PyTorch", "gRPC"], 
    status: "live", 
    link: "#" 
  },
  { 
    name: "DeepSynth V4", 
    desc: "Real-time generative voice model with <10ms latency.", 
    tags: ["Rust", "WASM", "WebAudio"], 
    status: "building", 
    link: "#" 
  },
];

export default function ProjectsCard() {
  return (
    <div className="h-full bg-[#0A0A0F]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <FolderGit2 size={20} />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Active Protocols</h3>
        </div>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider flex items-center gap-1 transition-colors">
          View All <ArrowUpRight size={12} />
        </button>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        {PROJECTS.map((project, i) => (
          <motion.a 
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {/* Status Dot */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${project.status === 'live' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {project.status}
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {project.name}
              <ExternalLink size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400" />
            </h4>
            
            <p className="text-xs text-slate-400 mb-4 leading-relaxed max-w-[85%]">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-slate-300 group-hover:border-blue-500/30 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
    </div>
  );
}