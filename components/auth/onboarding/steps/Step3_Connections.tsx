"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Github,
  Linkedin,
  Code2,
  Palette,
  Link as LinkIcon,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
  X,
  Globe,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { useOnboarding } from "../OnboardingContext";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Platform Configuration
const PLATFORMS = [
  {
    id: "github",
    name: "GitHub",
    desc: "Connect Repository",
    placeholder: "https://github.com/username",
    icon: Github,
    color: "text-white",
    bg: "bg-slate-800",
    verifiable: true, // Has OAuth verification
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    desc: "Connect Profile",
    placeholder: "https://linkedin.com/in/username",
    icon: Linkedin,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    verifiable: false,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    desc: "Connect Stats",
    placeholder: "https://leetcode.com/username",
    icon: Code2,
    color: "text-amber-400",
    bg: "bg-amber-900/20",
    verifiable: false,
  },
  {
    id: "behance",
    name: "Behance",
    desc: "Connect Portfolio",
    placeholder: "https://behance.net/username",
    icon: Palette,
    color: "text-pink-400",
    bg: "bg-pink-900/20",
    verifiable: false,
  },
];

export default function Step3_Connections() {
  const { nextStep, prevStep, updateUserData } = useOnboarding();
  const containerRef = useRef(null);

  // State for Connections
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [urls, setUrls] = useState<Record<string, string>>({});

  // State for Modal
  const [selectedPlatform, setSelectedPlatform] = useState<
    (typeof PLATFORMS)[0] | null
  >(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  // ─── GitHub popup postMessage listener ───
  const handleGithubMessage = useCallback((event: MessageEvent) => {
    // Debug: log every message received
    console.log(
      "postMessage received:",
      event.data,
      "from origin:",
      event.origin,
    );

    // Accept messages from backend or same origin
    const allowedOrigins = [
      BACKEND_URL,
      window.location.origin,
      "http://localhost:8000",
      "http://localhost:3000",
    ];

    if (!allowedOrigins.includes(event.origin)) {
      console.log("Ignored message from unknown origin:", event.origin);
      return;
    }

    if (event.data?.type === "GITHUB_VERIFIED") {
      console.log("✅ GitHub verification successful — updating UI state");
      setVerified((prev) => ({ ...prev, github: true }));
      setConnected((prev) => ({ ...prev, github: true }));
    }

    if (event.data?.type === "GITHUB_VERIFICATION_FAILED") {
      console.error("❌ GitHub verification failed:", event.data.error);
      setVerified((prev) => ({ ...prev, github: false }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleGithubMessage);
    return () => window.removeEventListener("message", handleGithubMessage);
  }, [handleGithubMessage]);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-el",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      );
      gsap.fromTo(
        ".platform-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "back.out(1.2)",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle Opening Modal
  const openConnectModal = (platform: (typeof PLATFORMS)[0]) => {
    if (connected[platform.id]) return;
    setSelectedPlatform(platform);
    setTempUrl(urls[platform.id] || "");
  };

  // Handle Closing Modal
  const closeModal = () => {
    setSelectedPlatform(null);
    setTempUrl("");
    setIsVerifying(false);
  };

  // ─── Open GitHub OAuth popup ───
  const openGithubVerifyPopup = () => {
    window.open(
      `${BACKEND_URL}/github/oauth`,
      "githubVerify",
      "width=600,height=700,scrollbars=yes",
    );
  };

  // Handle "Connect" Action inside Modal
  const handleConnect = () => {
    if (!tempUrl) return;

    setIsVerifying(true);

    if (selectedPlatform?.id === "github") {
      // Save the URL first, then open OAuth popup for verification
      setUrls((prev) => ({ ...prev, github: tempUrl }));
      setConnected((prev) => ({ ...prev, github: false })); // Not verified yet
      openGithubVerifyPopup();
      setIsVerifying(false);
      closeModal();
    } else {
      // Other platforms: simulate verification (no OAuth)
      setTimeout(() => {
        setUrls((prev) => ({ ...prev, [selectedPlatform!.id]: tempUrl }));
        setConnected((prev) => ({ ...prev, [selectedPlatform!.id]: true }));
        setIsVerifying(false);
        closeModal();
      }, 1500);
    }
  };

  // Save links to context and navigate
  const handleContinue = () => {
    updateUserData({
      links: {
        github: urls["github"] || "",
        linkedin: urls["linkedin"] || "",
        leetcode: urls["leetcode"] || "",
        behance: urls["behance"] || "",
      },
    });
    nextStep();
  };

  const isAnyConnected = Object.values(connected).some(Boolean);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10"
    >
      {/* 1. HEADER SECTION */}
      <div className="w-full max-w-4xl mb-12">
        <div className="flex justify-between items-end mb-4 header-el">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <LinkIcon size={20} />
            </div>
            <span className="text-lg font-bold text-white">VelionAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
              Step 4 of 6
            </span>
            <span className="text-sm font-bold text-purple-400">60%</span>
          </div>
        </div>

        <h2 className="header-el text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Connect Your Ecosystem
        </h2>
        <p className="header-el text-slate-400 max-w-xl text-sm md:text-base mb-8 leading-relaxed">
          VelionAI requires access to your technical footprint to generate
          intelligence. Plug in your modules below to synchronize your data
          streams.
        </p>

        <div className="header-el h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 background-animate"
            initial={{ width: "40%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.2, ease: "circOut" }}
          />
        </div>
      </div>

      {/* 2. PLATFORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-16 px-4 md:px-0">
        {PLATFORMS.map((platform) => {
          const isConnected = connected[platform.id];
          const isVerifiedPlatform = verified[platform.id];

          return (
            <motion.div
              key={platform.id}
              onClick={() => openConnectModal(platform)}
              className={`platform-card relative p-1 rounded-[24px] bg-gradient-to-b from-white/10 to-white/0 group transition-all duration-500 cursor-pointer ${isConnected ? "shadow-[0_0_30px_rgba(16,185,129,0.15)]" : "hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]"}`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-full bg-[#0E0E14] rounded-[22px] p-6 flex flex-col items-center justify-between min-h-[280px] overflow-hidden">
                <div
                  className={`absolute inset-0 border-2 rounded-[22px] transition-colors duration-500 pointer-events-none ${isConnected ? "border-emerald-500/50" : "border-transparent group-hover:border-white/10"}`}
                />

                {/* Status Dot */}
                <div className="w-full flex justify-end">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${isConnected ? "bg-emerald-500 shadow-[0_0_8px_#10B981]" : "bg-slate-800"}`}
                  />
                </div>

                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 transition-colors duration-300 ${isConnected ? "bg-emerald-500/10 border-emerald-500/20" : ""}`}
                  >
                    <platform.icon
                      size={32}
                      className={`transition-colors duration-300 ${isConnected ? "text-emerald-400" : platform.color}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                      {platform.desc}
                    </p>
                  </div>
                </div>

                {/* Connect Button Indicator */}
                <div
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border ${
                    isConnected
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-white/5 text-slate-400 border-white/5 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  {isConnected ? (
                    <>
                      {platform.verifiable && isVerifiedPlatform ? (
                        <>
                          <ShieldCheck size={14} />
                          <span>Verified</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          <span>Linked</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <LinkIcon size={14} />
                      <span>Connect</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. FOOTER ACTIONS */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 md:px-0">
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
          onClick={() => handleContinue()}
          disabled={!isAnyConnected}
          className={`relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden ${
            isAnyConnected
              ? "text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
          whileTap={isAnyConnected ? { scale: 0.98 } : {}}
        >
          {isAnyConnected && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]" />
          )}
          <span className="relative z-10">Continue</span>
          <ArrowRight size={16} className="relative z-10" />
        </motion.button>
      </div>

      {/* --- 4. THE CONNECTION DIALOG (MODAL) --- */}
      <AnimatePresence>
        {selectedPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-md bg-[#0E0E14] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              {/* Gradient Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${selectedPlatform.bg} ${selectedPlatform.color} border border-white/5`}
                >
                  <selectedPlatform.icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Connect {selectedPlatform.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {selectedPlatform.verifiable
                    ? "Enter your profile URL, then verify ownership via OAuth."
                    : "Enter your public profile URL to sync your data."}
                </p>
              </div>

              {/* Input Field */}
              <div className="mb-6">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 block text-left">
                  {selectedPlatform.name} URL
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
                    <Globe size={16} />
                  </div>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder={selectedPlatform.placeholder}
                    autoFocus
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all shadow-inner"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              </div>

              {/* GitHub verification info */}
              {selectedPlatform.verifiable && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3">
                  <ShieldCheck
                    size={16}
                    className="text-purple-400 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    After entering your URL, a popup will open to verify your
                    GitHub ownership via OAuth. Your access token will be
                    securely saved.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  disabled={!tempUrl || isVerifying}
                  className="flex-1 py-3 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Verifying...
                    </>
                  ) : selectedPlatform.verifiable ? (
                    <>
                      Verify with {selectedPlatform.name}
                      <ExternalLink size={14} />
                    </>
                  ) : (
                    <>
                      Initialize Link
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
