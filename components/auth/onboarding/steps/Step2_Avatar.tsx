"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { useOnboarding } from "../OnboardingContext";

// Mock Data based on the visual reference
// NOTE: Ensure these images exist in your public/avatars/ folder
const AVATARS = [
  {
    id: "glass-orb",
    name: "Glass Orb",
    src: "/avatars/glass-orb.png",
    color: "text-cyan-400",
    border: "border-cyan-500",
  },
  {
    id: "golden-spiral",
    name: "Golden Spiral",
    src: "/avatars/golden-spiral.png",
    color: "text-amber-400",
    border: "border-amber-500",
  },
  {
    id: "cyber-bust",
    name: "Cyber Bust",
    src: "/avatars/cyber-bust.png",
    color: "text-blue-400",
    border: "border-blue-500",
  },
  {
    id: "crystal-cluster",
    name: "Crystal Cluster",
    src: "/avatars/crystal-cluster.png",
    color: "text-slate-200",
    border: "border-slate-400",
  },
  {
    id: "flux-matrix",
    name: "Flux Matrix",
    src: "/avatars/flux-matrix.png",
    color: "text-purple-400",
    border: "border-purple-500",
  }, // The one selected in the image
  {
    id: "neon-cube",
    name: "Neon Cube",
    src: "/avatars/neon-cube.png",
    color: "text-teal-400",
    border: "border-teal-500",
  },
  {
    id: "obsidian-poly",
    name: "Obsidian Poly",
    src: "/avatars/obsidian-poly.png",
    color: "text-zinc-500",
    border: "border-zinc-500",
  },
  {
    id: "liquid-metal",
    name: "Liquid Metal",
    src: "/avatars/liquid-metal.png",
    color: "text-sky-400",
    border: "border-sky-500",
  },
  {
    id: "torus-ring",
    name: "Torus Ring",
    src: "/avatars/torus-ring.png",
    color: "text-orange-400",
    border: "border-orange-500",
  },
];

export default function Step2_Avatar() {
  const { nextStep, prevStep, userData, updateUserData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string | null>(
    userData.avatarId || null,
  );
  const containerRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Slide In
      gsap.fromTo(
        ".header-element",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );

      // 2. Grid Items Pop In
      gsap.fromTo(
        ".avatar-card",
        { scale: 0.8, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.05,
          delay: 0.3,
          ease: "back.out(1.5)",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    updateUserData({ avatarId: id });
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto flex flex-col items-center"
    >
      {/* 1. HEADER SECTION */}
      <div className="text-center mb-12">
        {/* Progress Bar (Step 3 of 6) */}
        <div className="header-element w-full max-w-2xl mx-auto mb-8 flex items-center gap-4">
          <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              initial={{ width: "20%" }}
              animate={{ width: "40%" }} // Step 3 approx 40-50%
              transition={{ duration: 1, ease: "circOut" }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Step 3 of 6
          </span>
        </div>

        <h2 className="header-element text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Select Your Identity Core
        </h2>
        <p className="header-element text-slate-400 max-w-lg mx-auto text-sm md:text-base">
          This representation will act as your visual signature within the
          Velion network.
        </p>
      </div>

      {/* 2. THE AVATAR GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 w-full px-4 md:px-0">
        {AVATARS.map((avatar) => {
          const isSelected = selectedId === avatar.id;

          return (
            <motion.div
              key={avatar.id}
              onClick={() => handleSelect(avatar.id)}
              className={`avatar-card relative aspect-square rounded-[24px] cursor-pointer group overflow-hidden transition-all duration-300 ${
                isSelected
                  ? "bg-[#1A1A23]"
                  : "bg-[#0A0A0F]/60 hover:bg-[#15151A]"
              }`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* --- IMAGE CONTAINER --- */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden bg-black/20">
                {/* Fallback gradient (visible while image loads) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-md ${isSelected ? "animate-pulse-slow" : ""}`}
                  />
                </div>
                {/* Actual Avatar Image */}
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className={`relative z-10 w-full h-full object-cover ${isSelected ? "scale-110" : "group-hover:scale-105"} transition-transform duration-700`}
                />
              </div>

              {/* --- SELECTION OVERLAY (God Mode) --- */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    layoutId="selection-ring"
                    className={`absolute inset-0 rounded-[24px] border-2 ${avatar.border} shadow-[0_0_30px_rgba(168,85,247,0.3)] z-20 pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Checkmark Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-3 right-3 w-6 h-6 rounded-full ${avatar.border.replace("border-", "bg-")} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Check size={14} strokeWidth={4} />
                    </motion.div>

                    {/* Label at Bottom */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute bottom-6 inset-x-0 text-center"
                    >
                      <span
                        className={`text-xs font-bold font-mono uppercase tracking-[0.2em] ${avatar.color}`}
                      >
                        {avatar.name}
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Border (Subtle) */}
              {!isSelected && (
                <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 3. FOOTER ACTIONS */}
      <div className="w-full max-w-2xl flex items-center justify-between px-4 md:px-0">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors group px-4 py-2"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        <motion.button
          onClick={() => selectedId && nextStep()}
          disabled={!selectedId}
          className={`relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden ${
            selectedId
              ? "text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
          whileTap={selectedId ? { scale: 0.98 } : {}}
        >
          {/* Gradient Background */}
          {selectedId && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]" />
          )}

          <span className="relative z-10">Confirm Selection</span>
          <ArrowRight size={16} className="relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}
