"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  Database,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  Box,
} from "lucide-react";
import { useOnboarding } from "../OnboardingContext";
import { useRouter } from "next/navigation";

// Simulation Stages matching the visual reference
const STAGES = [
  { id: "identity", label: "IDENTITY", sub: "VERIFIED", icon: UserCheck },
  { id: "perms", label: "PERMISSIONS", sub: "GRANTED", icon: ShieldCheck },
  { id: "vector", label: "VECTOR DB", sub: "INDEXING...", icon: Database },
  { id: "dash", label: "DASHBOARD", sub: "PENDING", icon: LayoutDashboard },
];

export default function Step5_Loader() {
  const { userData } = useOnboarding();
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Total duration of the initialization sequence (in ms)
  const DURATION = 6000;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const registerAndAnimate = async () => {
      // ── 1. Call the register API ──────────────────────────
      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            institute: userData.institute,
            avatar: userData.avatarId
              ? `/avatars/${userData.avatarId}.png`
              : "",
            links: {
              github: userData.links.github,
              linkedin: userData.links.linkedin,
              leetcode: userData.links.leetcode,
              behance: userData.links.behance,
            },
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data?.message || "Registration failed. Please try again.");
          return;
        }
      } catch (err) {
        setError("Could not connect to server. Please check your connection.");
        return;
      }

      // ── 2. Start the progress animation (only on success) ─
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / DURATION) * 100, 100);

        setProgress(p);

        // Update stages based on progress milestones
        if (p > 15) setActiveStage(1); // Identity done
        if (p > 40) setActiveStage(2); // Permissions done
        if (p > 75) setActiveStage(3); // Vector DB done
        if (p >= 100) {
          clearInterval(interval);
          // Auto-navigate to completion screen
          setTimeout(() => {
            router.push("/onboarding/complete");
          }, 800);
        }
      }, 50);
    };

    registerAndAnimate();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* ERROR STATE OVERLAY */}
      {error && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-md text-center space-y-6 p-8">
            <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
              <span className="text-red-400 text-3xl">!</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Registration Failed
            </h3>
            <p className="text-sm text-slate-400">{error}</p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => router.push("/onboarding/identity")}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setError(null);
                  window.location.reload();
                }}
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 1. TOP RIGHT STATUS (Absolute) */}
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          INITIALIZATION_MODE
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      {/* 2. CENTRAL HUD RING */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex items-center justify-center mb-16">
        {/* Background Rings */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-8 border border-white/5 rounded-full" />

        {/* Animated Gradient Ring (The Progress Bar) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="#1A1A23"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="300% 300%"
            initial={{ strokeDashoffset: "300%" }}
            animate={{ strokeDashoffset: `${300 - progress * 3}%` }} // Simple approx for full circle
            transition={{ ease: "linear", duration: 0.1 }} // Immediate updates
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting Particles */}
        <motion.div
          className="absolute inset-0 w-full h-full animate-spin-slow"
          style={{ borderRadius: "50%" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </motion.div>

        {/* Tech Labels (Absolute Positioning to match design) */}
        {/* Left Label */}
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-60 hidden md:flex">
          <div className="text-right">
            <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider">
              Encryption
            </div>
            <div className="text-[9px] font-mono text-slate-500 uppercase">
              AES-256-GCM
            </div>
          </div>
          <div className="w-8 h-px bg-white/20" />
          <div className="w-1 h-1 bg-purple-500 rounded-full" />
        </div>

        {/* Right Label */}
        <div className="absolute right-[-40px] top-[30%] flex items-center gap-2 opacity-60 hidden md:flex">
          <div className="w-1 h-1 bg-cyan-500 rounded-full" />
          <div className="w-8 h-px bg-white/20" />
          <div className="text-left">
            <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
              MEM_ALLOC
            </div>
            <div className="text-[9px] font-mono text-slate-500 uppercase">
              4096 TB
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 mb-4 text-white animate-float">
            <Box
              strokeWidth={0.5}
              className="w-full h-full text-purple-200 opacity-80"
            />
            {/* Inner Cube Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse" />
            </div>
          </div>
          <div className="text-6xl font-bold text-white tracking-tighter tabular-nums">
            {Math.round(progress)}
            <span className="text-2xl text-purple-400">%</span>
          </div>
        </div>
      </div>

      {/* 3. TEXT HEADLINES */}
      <div className="text-center mb-12 max-w-2xl px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Constructing Your Intelligence Profile...
        </motion.h2>
        <motion.p
          className="text-slate-400 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Initializing neural pathways and calibrating data models. Please wait{" "}
          <br className="hidden md:block" />
          while we finalize your secure environment.
        </motion.p>
      </div>

      {/* 4. STATUS CHECKLIST GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-4 md:px-0">
        {STAGES.map((stage, i) => {
          // Determine State: 0 = Pending, 1 = Active, 2 = Done
          let state = "pending";
          if (i < activeStage) state = "done";
          else if (i === activeStage) state = "active";

          return (
            <div
              key={stage.id}
              className={`relative p-4 rounded-xl border transition-all duration-500 flex flex-col items-center text-center gap-2 overflow-hidden ${
                state === "active"
                  ? "bg-purple-900/20 border-purple-500/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                  : state === "done"
                    ? "bg-[#0E0E14] border-emerald-500/30"
                    : "bg-[#0A0A0F] border-white/5 opacity-50"
              }`}
            >
              {state === "active" && (
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent animate-pulse" />
              )}

              <div
                className={`p-2 rounded-full transition-colors duration-300 ${
                  state === "done"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : state === "active"
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-slate-600 bg-white/5"
                }`}
              >
                {state === "active" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : state === "done" ? (
                  <Check size={16} />
                ) : (
                  <stage.icon size={16} />
                )}
              </div>

              <div>
                <div
                  className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${
                    state === "active" ? "text-purple-300" : "text-slate-500"
                  }`}
                >
                  {stage.label}
                </div>
                <div
                  className={`text-[10px] font-mono uppercase ${
                    state === "done"
                      ? "text-emerald-400"
                      : state === "active"
                        ? "text-white"
                        : "text-slate-600"
                  }`}
                >
                  {state === "done"
                    ? "VERIFIED"
                    : state === "active"
                      ? stage.sub
                      : "WAITING"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
