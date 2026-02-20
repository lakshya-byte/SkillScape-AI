"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Fingerprint,
  Github,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authApi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });
      // Redirect to the user's profile
      router.push(`/profile/${data.data?.user?._id || data.user?._id}`);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050508] text-white overflow-hidden selection:bg-purple-500/30 font-sans">
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-900/05 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* 2. HUD ELEMENTS (The "System" UI) */}

      {/* Top Left: System ID */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20 opacity-70">
        <div className="flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-widest text-white uppercase">
            VelionAI System Access
          </h1>
          <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider">
            Secure Authentication Portal
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">
            ID: X-9920 X // NODE: ALPHA
          </div>
        </div>
      </div>

      {/* Bottom Right: Status */}
      <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-20 text-right opacity-70 hidden md:block">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold tracking-widest text-emerald-500 uppercase">
              Auth Node Active
            </span>
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">
            Encryption: AES-256-GCM
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">
            Latency: 12ms
          </div>
        </div>
        {/* Decorative bracket line */}
        <div className="absolute right-[-10px] top-1 bottom-1 w-[1px] bg-slate-800" />
      </div>

      {/* Vertical Watermark Text */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-0 hidden lg:block select-none pointer-events-none">
        <motion.h1
          className="text-[12vh] leading-none font-black text-[#0A0A0F] tracking-tighter"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          NEURAL LINK
        </motion.h1>
      </div>

      {/* 3. CENTER STAGE: LOGIN CARD */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
          {/* Card Container */}
          <div className="relative bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Top Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-60" />

            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                className="w-14 h-14 mx-auto bg-[#13131A] rounded-2xl flex items-center justify-center mb-5 border border-white/5 shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(147,51,234,0.3)",
                }}
              >
                <Layers className="text-purple-500 w-7 h-7 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Access Your Intelligence
              </h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Authenticate to access your neural profile
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Message */}
              {error && (
                <motion.div
                  className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
                    placeholder="user@velion.ai"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1 pr-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot key?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner tracking-widest"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 mt-4 group relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />

                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="animate-pulse">Handshaking...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint size={18} />
                    <span>Authenticate</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
                <span className="bg-[#0D0D12] px-3 text-slate-600 font-mono">
                  System Link
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://skillscape-ai.onrender.com"}/github/oauth`,
                    "githubVerify",
                    "width=600,height=700,scrollbars=yes",
                  )
                }
                className="flex-1 py-2.5 rounded-full bg-[#1A1A23] border border-white/5 hover:bg-[#20202A] hover:border-white/10 transition-all flex items-center justify-center gap-2 text-slate-300 hover:text-white text-xs font-bold"
              >
                <Github size={16} />
                <span>Continue with GitHub</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://skillscape-ai.onrender.com"}/notion/oauth`,
                    "notionVerify",
                    "width=600,height=700,scrollbars=yes",
                  )
                }
                className="flex-1 py-2.5 rounded-full bg-[#1A1A23] border border-white/5 hover:bg-[#20202A] hover:border-white/10 transition-all flex items-center justify-center gap-2 text-slate-300 hover:text-white text-xs font-bold"
              >
                <Layers size={16} />
                <span>Continue with Notion</span>
              </button>
            </div>

            {/* Footer Link */}
            <div className="text-center">
              <p className="text-xs text-slate-500">
                New to VelionAI?{" "}
                <Link
                  href="/onboarding"
                  className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                >
                  Initialize Profile
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
