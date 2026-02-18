'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Command, 
  Search, 
  Bell, 
  Menu, 
  Hexagon 
} from 'lucide-react';

// --- Internal Component Imports ---
import ProfileBackground from '@/components/profile/ProfileBackground';
import ProfileHero from '@/components/profile/profileHero';
import GamificationCard from '@/components/profile/GamificationCard';
import SkillsCard from '@/components/profile/SkillsCard';
import ProjectsCard from '@/components/profile/ProjectsCard';
import SocialLinksCard from '@/components/profile/SocialLinksCard';

// --- Data Source ---
import { PROFILE_DATA } from '@/components/profile/profileData';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- GSAP Entrance Orchestration ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. UI Shell Fade In
      tl.to(".ui-shell", { opacity: 1, duration: 0.5 });

      // 2. Hero Section Slide Up
      tl.fromTo(".hero-section",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }
      );

      // 3. Grid Items Stagger (The "Waterfall" Effect)
      tl.fromTo(".bento-item",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#030014] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* 1. Global Cinematic Background */}
      <ProfileBackground />

      {/* 2. Top Navigation (Glassmorphic) */}
      <nav className="ui-shell opacity-0 fixed top-0 inset-x-0 z-50 h-16 border-b border-white/5 bg-[#030014]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Hexagon size={18} className="text-white fill-white/20" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white hidden md:block">
            SkillScape <span className="text-indigo-400">AI</span>
          </span>
        </div>

        {/* Command Bar (Decorative) */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium hover:border-white/20 transition-colors cursor-pointer group">
          <Search size={14} className="group-hover:text-white transition-colors" />
          <span>Search neural database...</span>
          <span className="ml-4 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-500 font-mono">⌘K</span>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
             <span className="text-[10px] font-bold text-emerald-500 tracking-wider uppercase">System Online</span>
           </div>
           <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
             <Bell size={20} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-[#030014]" />
           </button>
           <button className="md:hidden p-2 text-slate-400">
             <Menu size={20} />
           </button>
        </div>
      </nav>

      {/* 3. Main Content Container */}
      <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        
        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* A. Hero Section (Spans Full Width) */}
          <div className="hero-section col-span-1 md:col-span-12 lg:col-span-8 h-full min-h-[400px]">
            <ProfileHero user={PROFILE_DATA} />
          </div>

          {/* B. Gamification Card (Right Sidebar on Desktop) */}
          <div className="hero-section col-span-1 md:col-span-12 lg:col-span-4 h-full">
            <GamificationCard 
              level={PROFILE_DATA.level} 
              xp={PROFILE_DATA.xp} 
              nextLevelXp={PROFILE_DATA.nextLevelXp} 
              rank="Singularity Seeker"
            />
          </div>

          {/* C. Skills Card */}
          <div className="bento-item col-span-1 md:col-span-6 lg:col-span-4 h-[350px]">
            <SkillsCard />
          </div>

          {/* D. Projects Card */}
          <div className="bento-item col-span-1 md:col-span-6 lg:col-span-4 h-[350px]">
            <ProjectsCard />
          </div>

          {/* E. Social Links Card */}
          <div className="bento-item col-span-1 md:col-span-12 lg:col-span-4 h-[350px]">
            <SocialLinksCard />
          </div>

        </div>

        {/* 4. Footer (Copyright) */}
        <div className="ui-shell opacity-0 mt-20 text-center border-t border-white/5 pt-8">
           <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
             SkillScape AI Intelligence Systems © 2024 • Neural Net v2.4.0
           </p>
        </div>

      </div>
    </main>
  );
}