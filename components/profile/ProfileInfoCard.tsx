"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Mail,
  Share2,
  CheckCircle2,
  MoreHorizontal,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { UserProfile } from "./profileData";
import { logoutUser } from "@/lib/authApi";

interface ProfileInfoCardProps {
  user: UserProfile;
  isOwnProfile?: boolean;
}

export default function ProfileInfoCard({
  user,
  isOwnProfile = false,
}: ProfileInfoCardProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      router.replace("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  return (
    <motion.div
      className="h-full flex flex-col justify-end pb-2 md:pb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* 1. Identity Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {user.name}
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="text-emerald-400"
          >
            <CheckCircle2 size={28} fill="rgba(16, 185, 129, 0.2)" />
          </motion.div>
        </div>

        <div className="flex items-center gap-3 text-lg md:text-xl text-slate-400 font-medium">
          <span className="text-indigo-400">{user.handle}</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full" />
          <span>{user.role}</span>
        </div>
      </div>

      {/* 2. Bio Section */}
      <p className="text-slate-400 leading-relaxed max-w-2xl mb-6 text-sm md:text-base border-l-2 border-indigo-500/30 pl-4">
        {user.bio}
      </p>

      {/* 3. Metadata Grid (Location, Link, Joined) */}
      <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-medium text-slate-500 mb-8">
        <div className="flex items-center gap-2 hover:text-slate-300 transition-colors">
          <MapPin size={16} className="text-indigo-500" />
          {user.location}
        </div>
        <a
          href={user.socials.find((s) => s.platform === "Website")?.url}
          className="flex items-center gap-2 hover:text-indigo-400 transition-colors group"
        >
          <LinkIcon
            size={16}
            className="text-indigo-500 group-hover:rotate-45 transition-transform"
          />
          {user.socials.find((s) => s.platform === "Website")?.username ||
            "website.com"}
        </a>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-500" />
          Joined March 2021
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex items-center gap-3">
        {isOwnProfile ? (
          <>
            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
              Edit Profile
            </button>

            <motion.button
              onClick={handleLogout}
              disabled={loggingOut}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white/5 border border-red-500/20 text-red-400 hover:text-red-300 hover:border-red-500/40 hover:bg-red-500/5 font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              {loggingOut ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
              {loggingOut ? "Signing out..." : "Logout"}
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2"
            >
              <Mail size={18} />
              Connect
            </motion.button>

            <motion.button
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Share2 size={18} />
              Share
            </motion.button>
          </>
        )}

        <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </motion.div>
  );
}
