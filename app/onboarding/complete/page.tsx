"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { CheckCircle2, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useOnboarding } from "@/components/auth/onboarding/OnboardingContext";
import { useRouter } from "next/navigation";

export default function CompletePage() {
  const { userData } = useOnboarding();
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col items-center text-center relative z-10 px-4"
    >
      {/* Success Icon */}
      <div className="reveal-el relative mb-8">
        <motion.div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
        >
          <CheckCircle2 size={48} className="text-emerald-400" />
        </motion.div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
      </div>

      {/* Headline */}
      <h1 className="reveal-el text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Profile{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Constructed
        </span>
      </h1>

      <p className="reveal-el text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-10">
        Welcome aboard{userData.name ? `, ${userData.name}` : ""}. Your neural
        workspace has been initialized and all systems are online.
      </p>

      {/* Stats Row */}
      <div className="reveal-el grid grid-cols-3 gap-4 w-full max-w-sm mb-12">
        {[
          {
            label: "Avatar",
            value: userData.avatarId ? "✓" : "—",
            icon: Sparkles,
          },
          { label: "Skills", value: `${userData.skills.length}`, icon: Zap },
          { label: "Status", value: "READY", icon: CheckCircle2 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-2"
          >
            <stat.icon size={16} className="text-emerald-400" />
            <span className="text-lg font-bold text-white">{stat.value}</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => router.push("/dashboard")}
        className="reveal-el relative px-10 py-4 rounded-full text-sm font-bold tracking-wide text-white overflow-hidden flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 transition-all duration-300"
        whileTap={{ scale: 0.97 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500" />
        <span className="relative z-10">Launch Dashboard</span>
        <ArrowRight size={18} className="relative z-10" />
      </motion.button>

      {/* Bottom Tag */}
      <div className="reveal-el mt-8">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          VELION_AI — INITIALIZATION_COMPLETE
        </span>
      </div>
    </div>
  );
}
