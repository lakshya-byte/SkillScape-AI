"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Globe,
  Code2,
  Palette,
  ShieldCheck,
  Loader2,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { useGithubVerify } from "@/hooks/useGithubVerify";

// ─── Types ───
interface PlatformData {
  github?: { url?: string; oauthConnected?: boolean };
  linkedin?: string;
  leetcode?: string;
  behance?: string;
}

interface SocialLinksCardProps {
  platforms?: PlatformData;
  onVerified?: () => void; // Called after GitHub verify completes
}

// ─── Platform config ───
interface SocialConfig {
  platform: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
}

const PLATFORM_CONFIG: Record<string, SocialConfig> = {
  github: {
    platform: "GitHub",
    icon: Github,
    color: "text-white",
    hoverColor: "hover:border-white/40 hover:text-white",
  },
  linkedin: {
    platform: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-400",
    hoverColor: "hover:border-blue-600/50 hover:text-blue-500",
  },
  leetcode: {
    platform: "LeetCode",
    icon: Code2,
    color: "text-amber-400",
    hoverColor: "hover:border-amber-500/50 hover:text-amber-400",
  },
  behance: {
    platform: "Behance",
    icon: Palette,
    color: "text-pink-400",
    hoverColor: "hover:border-pink-500/50 hover:text-pink-400",
  },
};

export default function SocialLinksCard({
  platforms,
  onVerified,
}: SocialLinksCardProps) {
  const githubOauthConnected = platforms?.github?.oauthConnected ?? false;

  const { isVerified, isVerifying, error, openVerifyPopup } = useGithubVerify(
    githubOauthConnected,
    onVerified,
  );

  // Build social items from real platform data
  const socialItems = [
    ...(platforms?.github?.url
      ? [
          {
            key: "github",
            ...PLATFORM_CONFIG.github,
            url: platforms.github.url,
            username: platforms.github.url.split("/").pop() || "GitHub",
            verifiable: true,
            verified: isVerified,
          },
        ]
      : []),
    ...(platforms?.linkedin
      ? [
          {
            key: "linkedin",
            ...PLATFORM_CONFIG.linkedin,
            url: platforms.linkedin,
            username: platforms.linkedin.split("/").pop() || "LinkedIn",
            verifiable: false,
            verified: false,
          },
        ]
      : []),
    ...(platforms?.leetcode
      ? [
          {
            key: "leetcode",
            ...PLATFORM_CONFIG.leetcode,
            url: platforms.leetcode,
            username: platforms.leetcode.split("/").pop() || "LeetCode",
            verifiable: false,
            verified: false,
          },
        ]
      : []),
    ...(platforms?.behance
      ? [
          {
            key: "behance",
            ...PLATFORM_CONFIG.behance,
            url: platforms.behance,
            username: platforms.behance.split("/").pop() || "Behance",
            verifiable: false,
            verified: false,
          },
        ]
      : []),
  ];

  // Empty state
  if (socialItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-slate-600 text-sm font-mono">
        No platforms connected
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {socialItems.map((social, i) => (
        <motion.div
          key={social.key}
          className={`group relative flex flex-col justify-between p-5 bg-[#0A0A0F]/60 backdrop-blur-md border border-white/5 rounded-[20px] transition-all duration-300 ${social.hoverColor} hover:bg-white/5`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Top Row: Icon & Arrow / Verified Badge */}
          <div className="flex justify-between items-start mb-4">
            <div
              className={`p-2.5 rounded-xl bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors`}
            >
              <social.icon size={20} />
            </div>

            {social.verifiable && social.verified ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Verified
                </span>
              </div>
            ) : (
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight
                  size={16}
                  className="text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </a>
            )}
          </div>

          {/* Bottom Row: Text + Verify Button */}
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
              {social.platform}
            </div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate mb-2">
              {social.username}
            </div>

            {/* GitHub Verify Button */}
            {social.verifiable && !social.verified && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  openVerifyPopup();
                }}
                disabled={isVerifying}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-1 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ExternalLink size={12} />
                    Verify
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Error tooltip */}
          {social.verifiable && error && (
            <div className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-red-400 font-mono">
              {error}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
