"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Lock,
  KeyRound,
  ArrowRight,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/authApi";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !otp || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Password reset failed",
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
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-900/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* HUD */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20 opacity-70">
        <div className="flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-widest text-white uppercase">
            VelionAI Reset
          </h1>
          <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider">
            Credential Renewal Protocol
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">
            MODE: OTP_VERIFY // SECURE_HASH
          </div>
        </div>
      </div>

      {/* Vertical Watermark */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 z-0 hidden lg:block select-none pointer-events-none">
        <motion.h1
          className="text-[12vh] leading-none font-black text-[#0A0A0F] tracking-tighter"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          RESET KEY
        </motion.h1>
      </div>

      {/* Center Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <motion.div
          className="w-full max-w-[440px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
          <div className="relative bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Top Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-60" />

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-14 h-14 mx-auto bg-[#13131A] rounded-2xl flex items-center justify-center mb-5 border border-white/5 shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(99,102,241,0.3)",
                }}
              >
                <KeyRound className="text-indigo-500 w-7 h-7 group-hover:rotate-12 transition-transform duration-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Reset Credentials
              </h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Enter the OTP sent to your email
              </p>
            </div>

            {/* Success State */}
            {success ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2
                    size={40}
                    className="text-emerald-400"
                    fill="rgba(16,185,129,0.15)"
                  />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Password Reset Complete
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Redirecting to login...
                </p>
                <Loader2
                  size={16}
                  className="animate-spin mx-auto text-indigo-400"
                />
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleReset} className="space-y-4">
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
                    placeholder="user@velion.ai"
                    required
                  />
                </div>

                {/* OTP Field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pl-1">
                    Verification OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      // Only allow digits, max 6
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setOtp(val);
                    }}
                    className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-bold placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner tracking-[0.5em] text-center font-mono"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pl-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner tracking-widest pr-12"
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pl-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-[#F0F0F3] text-slate-900 border-none rounded-full px-6 py-3.5 text-sm font-medium placeholder-slate-400 focus:ring-2 transition-all shadow-inner tracking-widest ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "focus:ring-red-500/50 ring-2 ring-red-500/30"
                        : "focus:ring-purple-500/50"
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-[10px] text-red-400 pl-4 font-medium">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 mt-6 group relative overflow-hidden disabled:opacity-60"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />

                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="animate-pulse">Resetting...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Reset Password</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}

            {/* Footer Links */}
            {!success && (
              <div className="text-center mt-8 space-y-3">
                <p className="text-xs text-slate-500">
                  Didn&apos;t receive OTP?{" "}
                  <Link
                    href="/forgot-password"
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                  >
                    Resend OTP
                  </Link>
                </p>
                <p className="text-xs text-slate-500">
                  Back to{" "}
                  <Link
                    href="/auth/login"
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050508] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
