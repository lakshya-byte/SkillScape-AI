'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, Globe, LucideIcon } from 'lucide-react';

interface SocialLink {
  platform: string;
  icon: LucideIcon;
  url: string;
  username: string;
  color: string; // Tailwind color class for hover border/text
}

const SOCIALS: SocialLink[] = [
  { platform: "GitHub", icon: Github, url: "#", username: "@cipher-0x", color: "hover:border-white/40 hover:text-white" },
  { platform: "Twitter", icon: Twitter, url: "#", username: "@cipher_ai", color: "hover:border-sky-500/50 hover:text-sky-400" },
  { platform: "LinkedIn", icon: Linkedin, url: "#", username: "Alex Cipher", color: "hover:border-blue-600/50 hover:text-blue-500" },
  { platform: "Website", icon: Globe, url: "#", username: "cipher.ai", color: "hover:border-emerald-500/50 hover:text-emerald-400" }
];

export default function SocialLinksCard() {
  return (
    <motion.div 
      className="grid grid-cols-2 gap-4 h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {SOCIALS.map((social, i) => (
        <motion.a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex flex-col justify-between p-5 bg-[#0A0A0F]/60 backdrop-blur-md border border-white/5 rounded-[20px] transition-all duration-300 ${social.color} hover:bg-white/5`}
          whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Top Row: Icon & Arrow */}
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <social.icon size={20} />
            </div>
            <ArrowUpRight 
              size={16} 
              className="text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
            />
          </div>

          {/* Bottom Row: Text */}
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{social.platform}</div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">
              {social.username}
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}