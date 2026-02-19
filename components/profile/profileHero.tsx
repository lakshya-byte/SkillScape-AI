"use client";

import React from "react";
import { motion } from "framer-motion";
import AvatarSelector from "./AvatarSelector";
import ProfileInfoCard from "./ProfileInfoCard";
import { UserProfile } from "./profileData";

interface ProfileHeroProps {
  user: UserProfile;
  isOwnProfile?: boolean;
  onAvatarChange?: () => void;
}

export default function ProfileHero({
  user,
  isOwnProfile = false,
  onAvatarChange,
}: ProfileHeroProps) {
  return (
    <motion.div
      className="relative w-full bg-[#0A0A0F]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 md:p-10 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 1. Cinematic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* 2. Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
        {/* Left: Interactive Avatar */}
        <div className="flex-shrink-0">
          <AvatarSelector
            src={user.avatar}
            alt={user.name}
            isEditable={isOwnProfile}
            onEditClick={onAvatarChange}
          />
        </div>

        {/* Right: Identity Information */}
        <div className="flex-grow w-full">
          <ProfileInfoCard user={user} isOwnProfile={isOwnProfile} />
        </div>
      </div>

      {/* 3. Decorative "Tech" Lines */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-10 right-10 flex gap-2 opacity-20">
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </motion.div>
  );
}
