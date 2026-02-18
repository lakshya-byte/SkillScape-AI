'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, Layers } from 'lucide-react';

// You can also import these from PricingData.ts if preferred
const BRANDS = [
  { name: "ACME Corp", icon: Shield },
  { name: "Orbit.ai", icon: Globe },
  { name: "Nexus", icon: Cpu },
  { name: "FluxStream", icon: Zap },
  { name: "Loop", icon: Layers },
];

export default function TrustedBy() {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Gradient Blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] to-[#050507] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mb-10"
        >
          Trusted by Neural Architects at
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              whileHover={{ scale: 1.1, opacity: 1, color: '#fff' }}
              className="flex items-center gap-2 group cursor-default transition-all duration-300"
            >
              {/* Logo Icon */}
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                <brand.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              
              {/* Logo Text (Simulated Logotype) */}
              <span className="text-xl font-bold text-slate-500 group-hover:text-white tracking-tight transition-colors">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}