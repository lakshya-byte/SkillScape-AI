"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, Github, Linkedin, Globe } from "lucide-react";

// --- Internal Component Imports ---
import ProfileBackground from "@/components/profile/ProfileBackground";
import ProfileHero from "@/components/profile/profileHero";
import GamificationCard from "@/components/profile/GamificationCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ProjectsCard from "@/components/profile/ProjectsCard";
import SocialLinksCard from "@/components/profile/SocialLinksCard";
import AvatarDialog from "@/components/profile/AvatarDialog";
import Sidebar from "@/components/Dasboard/Sidebar";
import Navbar from "@/components/landing/navbar/Navbar";

// --- API ---
import { getMyself } from "@/lib/authApi";

// --- Types ---
import { UserProfile } from "@/components/profile/profileData";

// --- Context ---
import { UserProvider } from "@/contexts/UserContext";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  // Raw platform data from backend (for SocialLinksCard verify flow)
  const [rawPlatforms, setRawPlatforms] = useState<any>(null);

  // --- Fetch user data from backend ---
  const mapUserToProfile = (u: any): UserProfile => ({
    id: u._id,
    name: u.name || "Agent",
    handle: `@${(u.name || "agent").toLowerCase().replace(/\s+/g, "_")}`,
    role: u.role || "Member",
    bio: u.bio || "Neural intelligence operative.",
    location: u.institute || "Unknown",
    avatar: u.avatar || "/avatars/fallback.png",
    banner: "",
    level: u.stats?.level || 1,
    xp: u.stats?.xp || 0,
    nextLevelXp: u.stats?.nextLevelXp || 1000,
    stats: {
      commits: u.stats?.commits || 0,
      reputation: u.stats?.reputation || 0,
      streak: u.stats?.streak || 0,
    },
    skills: u.skills || [],
    projects: u.projects || [],
    badges: [],
    socials: [
      ...(u.platforms?.github?.url
        ? [
          {
            platform: "GitHub",
            icon: Github,
            url: u.platforms.github.url,
            username: u.platforms.github.url.split("/").pop() || "",
          },
        ]
        : []),
      ...(u.platforms?.linkedin
        ? [
          {
            platform: "LinkedIn",
            icon: Linkedin,
            url: u.platforms.linkedin,
            username: "LinkedIn",
          },
        ]
        : []),
      ...(u.platforms?.leetcode
        ? [
          {
            platform: "LeetCode",
            icon: Globe,
            url: u.platforms.leetcode,
            username: "LeetCode",
          },
        ]
        : []),
      ...(u.platforms?.behance
        ? [
          {
            platform: "Behance",
            icon: Globe,
            url: u.platforms.behance,
            username: "Behance",
          },
        ]
        : []),
    ],
  });

  const fetchUser = async () => {
    try {
      const res = await getMyself();
      const u = res.data;
      setUser(mapUserToProfile(u));
      setRawPlatforms(u.platforms || null);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Callback after GitHub verification — refetch user data from backend
  const handleGithubVerified = () => {
    console.log("GitHub verified — refetching user data...");
    fetchUser();
  };

  // --- GSAP Entrance Orchestration ---
  useLayoutEffect(() => {
    if (loading || !user) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. UI Shell Fade In
      tl.to(".ui-shell", { opacity: 1, duration: 0.5 });

      // 2. Hero Section Slide Up
      tl.fromTo(
        ".hero-section",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
      );

      // 3. Grid Items Stagger
      tl.fromTo(
        ".bento-item",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, user]);

  // Handle avatar update from dialog
  const handleAvatarUpdated = (newAvatar: string) => {
    if (user) {
      setUser({ ...user, avatar: newAvatar });
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <UserProvider>
        <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
          <Navbar />
          {/* <Sidebar /> */}
          <div className="flex-1 relative w-full">
            <div className="relative z-10 md:ml-[210px] pt-24 flex items-center justify-center min-h-screen">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                  Loading Neural Profile...
                </p>
              </div>
            </div>
          </div>
        </div>
      </UserProvider>
    );
  }

  // --- Error State ---
  if (error || !user) {
    return (
      <UserProvider>
        <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
          <Navbar />
          {/* <Sidebar /> */}
          <div className="flex-1 relative w-full">
            <div className="relative z-10 md:ml-[210px] pt-24 flex items-center justify-center min-h-screen">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-2">
                  {error || "User not found"}
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  PROFILE_FETCH_ERROR
                </p>
              </div>
            </div>
          </div>
        </div>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <Navbar />

        {/* ── Fixed Sidebar ─────────────────────────────────────────────── */}
        {/* <Sidebar /> */}

        {/* ── Main content — offset by sidebar width ─────────────────────── */}
        <div className="flex-1 relative w-full">
          <div
            className="fixed top-0 left-0 md:left-[185px] right-0 h-[50vh] pointer-events-none z-0"
            style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
          />
          <main
            ref={containerRef}
            className="relative z-10 md:ml-[210px] pt-24 md:pt-20 pb-7 text-slate-200 font-sans selection:bg-indigo-500/30"
          >
            {/* 1. Global Cinematic Background */}
            <ProfileBackground />

            {/* 2. Main Content Container */}
            <div className="relative z-10 px-4 md:px-8 max-w-[1600px] mx-auto">
              {/* Grid System */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* A. Hero Section (Spans Full Width) */}
                <div className="hero-section col-span-1 md:col-span-12 lg:col-span-8 h-full min-h-[400px]">
                  <ProfileHero
                    user={user}
                    isOwnProfile={true}
                    onAvatarChange={() => setAvatarDialogOpen(true)}
                  />
                </div>

                {/* B. Gamification Card */}
                <div className="hero-section col-span-1 md:col-span-12 lg:col-span-4 h-full">
                  <GamificationCard
                    level={user.level}
                    xp={user.xp}
                    nextLevelXp={user.nextLevelXp}
                    rank="Singularity Seeker"
                  />
                </div>

                {/* C. Skills Card */}
                <div className="bento-item col-span-1 md:col-span-6 lg:col-span-4 h-[350px]">
                  <SkillsCard />
                </div>

                {/* D. Projects Card */}
                <div className="bento-item col-span-1 md:col-span-6 lg:col-span-4 h-[350px]">
                  <ProjectsCard />
                </div>

                {/* E. Social Links Card */}
                <div className="bento-item col-span-1 md:col-span-12 lg:col-span-4 h-[350px]">
                  <SocialLinksCard
                    platforms={rawPlatforms}
                    onVerified={handleGithubVerified}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="ui-shell opacity-0 mt-20 text-center border-t border-white/5 pt-8">
                <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
                  SkillScape AI Intelligence Systems © 2024 • Neural Net v2.4.0
                </p>
              </div>
            </div>

            {/* Avatar Change Dialog */}
            <AvatarDialog
              isOpen={avatarDialogOpen}
              currentAvatar={user.avatar}
              onClose={() => setAvatarDialogOpen(false)}
              onAvatarUpdated={handleAvatarUpdated}
            />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
