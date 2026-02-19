"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendResetOTP } from "@/lib/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      await sendResetOTP(email);
      setSuccess(true);
      // Navigate to reset page after brief success animation
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to send OTP",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050508] text-white overflow-hidden selection:bg-purple-500/30 font-sans">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-900/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* HUD Elements */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20 opacity-70">
        <div className="flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-widest text-white uppercase">
            VelionAI Recovery
          </h1>
          <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider">
            Identity Recovery Protocol
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">
            MODE: PASSWORD_RESET // SECURE
          </div>
        </div>
      </div>

      {/* Vertical Watermark */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-0 hidden lg:block select-none pointer-events-none">
        <motion.h1
          className="text-[12vh] leading-none font-black text-[#0A0A0F] tracking-tighter"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          RECOVERY
        </motion.h1>
      </div>

      {/* Center Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
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
                <ShieldCheck className="text-purple-500 w-7 h-7 group-hover:scale-110 transition-transform duration-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Recover Access
              </h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Enter your email to receive a verification OTP
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendOTP} className="space-y-5">
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

              {/* Success Message */}
              {success && (
                <motion.div
                  className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  OTP sent! Redirecting to verification...
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
                    className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
                    placeholder="user@velion.ai"
                    required
                    disabled={success}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || success}
                className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 mt-4 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />

                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="animate-pulse">Transmitting OTP...</span>
                  </>
                ) : success ? (
                  <>
                    <ShieldCheck size={18} />
                    <span>OTP Sent</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>Send Reset OTP</span>
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
                  Or
                </span>
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-3">
              <p className="text-xs text-slate-500">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                >
                  Sign In
                </Link>
              </p>
              <p className="text-xs text-slate-500">
                Already have an OTP?{" "}
                <Link
                  href="/reset-password"
                  className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                >
                  Reset Password
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
