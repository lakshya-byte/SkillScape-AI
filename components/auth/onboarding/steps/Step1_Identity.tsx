"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { User, Mail, Building2, ArrowRight, IdCard, Lock } from "lucide-react";
import { useOnboarding } from "../OnboardingContext";

export default function Step1_Identity() {
  const { nextStep, prevStep, userData, updateUserData } = useOnboarding();
  const [activeField, setActiveField] = useState<string | null>(null);
  const containerRef = useRef(null);

  // Validation Logic (Neural Network Check)
  // Name > 2 chars, Email must be valid regex
  const isNameValid = userData.name.length > 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
  const isPasswordValid = userData.password.length >= 6;
  const isValid = isNameValid && isEmailValid && isPasswordValid;

  // GSAP Staggered Entrance (The "Construction" Effect)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade in container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );

      // 2. Stagger internal elements
      gsap.fromTo(
        ".form-element",
        { y: 20, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          stagger: 0.08,
          delay: 0.2,
          ease: "back.out(1.2)",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle "Enter" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isValid) nextStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isValid, nextStep]);

  return (
    <div ref={containerRef} className="w-full max-w-[480px] mx-auto opacity-0">
      {/* --- THE GLASS CARD --- */}
      <div className="relative bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl overflow-hidden group">
        {/* Cinematic Ambient Glow (Top Left) */}
        <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
        {/* Cinematic Ambient Glow (Bottom Right) */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[200px] h-[200px] bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none" />

        {/* 1. PROGRESS INDICATOR */}
        <div className="form-element flex justify-between items-center mb-3">
          <span className="text-[10px] font-mono font-bold text-slate-500 tracking-widest uppercase">
            Step 2 of 6
          </span>
          <span className="text-[10px] font-mono font-bold text-purple-400">
            20%
          </span>
        </div>
        <div className="form-element w-full h-[3px] bg-white/5 rounded-full mb-10 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: "20%" }}
            transition={{ duration: 1.2, ease: "circOut" }}
          />
        </div>

        {/* 2. HEADER SECTION */}
        <div className="form-element flex flex-col items-center text-center mb-10">
          <motion.div
            className="w-16 h-16 rounded-full bg-[#1A1A23] border border-white/5 flex items-center justify-center mb-5 shadow-lg shadow-black/50"
            whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.3)" }}
          >
            <IdCard className="text-purple-500 w-7 h-7" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Basic Identity
          </h2>
          <p className="text-sm text-slate-400 max-w-[260px] mx-auto leading-relaxed">
            To begin utilizing VelionAI technical intelligence, please verify
            your credentials.
          </p>
        </div>

        {/* 3. INPUT FIELDS */}
        <div className="space-y-6">
          {/* Field: Full Name */}
          <div className="form-element space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-2">
              Full Name
              {isNameValid && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-500 text-[10px]"
                >
                  ✓
                </motion.span>
              )}
            </label>
            <div className="relative group">
              <User
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${activeField === "name" ? "text-purple-400" : "text-slate-600"}`}
              />
              <input
                type="text"
                value={userData.name}
                onChange={(e) => updateUserData({ name: e.target.value })}
                onFocus={() => setActiveField("name")}
                onBlur={() => setActiveField(null)}
                placeholder="e.g. Alex Chen"
                className="w-full bg-[#050508]/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:bg-[#050508]/80 transition-all duration-300"
              />
              {/* The "Plasma" Border Animation */}
              <div
                className={`absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300 ${activeField === "name" ? "border-purple-500/50" : "border-transparent"}`}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 h-[1px] bg-purple-500 shadow-[0_0_8px_#A855F7]"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: activeField === "name" ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Field: Email */}
          <div className="form-element space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-2">
              Primary Email
              {isEmailValid && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-500 text-[10px]"
                >
                  ✓
                </motion.span>
              )}
            </label>
            <div className="relative group">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${activeField === "email" ? "text-purple-400" : "text-slate-600"}`}
              />
              <input
                type="email"
                value={userData.email}
                onChange={(e) => updateUserData({ email: e.target.value })}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                placeholder="name@company.com"
                className="w-full bg-[#050508]/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:bg-[#050508]/80 transition-all duration-300"
              />
              <div
                className={`absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300 ${activeField === "email" ? "border-purple-500/50" : "border-transparent"}`}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 h-[1px] bg-purple-500 shadow-[0_0_8px_#A855F7]"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: activeField === "email" ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Field: Institution */}
          <div className="form-element space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
              Institution
            </label>
            <div className="relative group">
              <Building2
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${activeField === "institute" ? "text-purple-400" : "text-slate-600"}`}
              />
              <input
                type="text"
                value={userData.institute}
                onChange={(e) => updateUserData({ institute: e.target.value })}
                onFocus={() => setActiveField("institute")}
                onBlur={() => setActiveField(null)}
                placeholder="Organization or University"
                className="w-full bg-[#050508]/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:bg-[#050508]/80 transition-all duration-300"
              />
              <div
                className={`absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300 ${activeField === "institute" ? "border-purple-500/50" : "border-transparent"}`}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 h-[1px] bg-purple-500 shadow-[0_0_8px_#A855F7]"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: activeField === "institute" ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Field: Password */}
          <div className="form-element space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-2">
              Password
              {isPasswordValid && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-500 text-[10px]"
                >
                  ✓
                </motion.span>
              )}
            </label>
            <div className="relative group">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${activeField === "password" ? "text-purple-400" : "text-slate-600"}`}
              />
              <input
                type="password"
                value={userData.password}
                onChange={(e) => updateUserData({ password: e.target.value })}
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField(null)}
                placeholder="Min. 6 characters"
                className="w-full bg-[#050508]/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:bg-[#050508]/80 transition-all duration-300 tracking-widest"
              />
              <div
                className={`absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300 ${activeField === "password" ? "border-purple-500/50" : "border-transparent"}`}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 h-[1px] bg-purple-500 shadow-[0_0_8px_#A855F7]"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: activeField === "password" ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* 4. ACTIONS */}
        <div className="form-element mt-10 space-y-5">
          <motion.button
            onClick={() => isValid && nextStep()}
            disabled={!isValid}
            className={`relative w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 overflow-hidden group ${
              isValid
                ? "text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
            }`}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            {/* Active Gradient Background */}
            {isValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] group-hover:scale-105 transition-transform duration-500" />
            )}

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
              <span>Continue</span>
              <ArrowRight
                className={`w-4 h-4 transition-all duration-300 ${isValid ? "group-hover:translate-x-1" : ""}`}
              />
            </div>
          </motion.button>

          <button
            onClick={prevStep}
            className="w-full text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider"
          >
            Go back to previous step
          </button>
        </div>
      </div>

      {/* FOOTER BADGE */}
      <div className="form-element mt-8 flex justify-center items-center gap-3 text-[10px] text-slate-600 font-mono opacity-60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse"></span>
          Secured by VelionAI Sentinel Protocol
        </span>
        <span className="w-px h-3 bg-slate-700"></span>
        <span>Privacy</span>
      </div>
    </div>
  );
}
