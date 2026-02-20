"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { logoutUser } from "@/lib/authApi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

/* ─── Constants ───────────────────────────────────────────────── */
const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

/* ─── Nav item types ───────────────────────────────────────────── */
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  section?: string;
}

/* ─── Icons ─────────────────────────────────────────────────────── */
const IconDeepProject = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const IconAIInsight = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const IconNeuralOps = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const IconFriends = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconLeaderboard = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M8 21V10M12 21V3M16 21v-7" />
  </svg>
);

const IconMission = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M12 12v10" />
  </svg>
);

/* ─── Collapse/Expand toggle icon ───────────────────────────────── */
const CollapseIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {collapsed ? (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ) : (
      <>
        <polyline points="11 17 6 12 11 7" />
        <line x1="6" y1="12" x2="20" y2="12" />
      </>
    )}
  </svg>
);

/* ─── Navigation Items ─────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  {
    id: "analysis",
    label: "Deep Project Analysis",
    icon: <IconDeepProject />,
    href: "/dashboard/analysis",
  },
  {
    id: "ai-insight",
    label: "AI Insight",
    icon: <IconAIInsight />,
    href: "/dashboard/ai-insight",
  },
  {
    id: "neural-ops",
    label: "Neural Ops",
    icon: <IconNeuralOps />,
    href: "/dashboard/neural-ops",
  },
  {
    id: "friends",
    label: "Friends",
    icon: <IconFriends />,
    href: "/dashboard/friends",
  },
  {
    id: "technical-intelligence",
    label: "Technical Intelligence",
    icon: <IconDeepProject />,
    href: "/dashboard/technical-intelligence",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: <IconLeaderboard />,
    href: "/dashboard/leaderboard",
  },
  {
    id: "mission",
    label: "Mission Section",
    icon: <IconMission />,
    href: "/dashboard/mission",
    section: "MISSIONS",
  },
];

/* ─── Sidebar Component ─────────────────────────────────────────── */
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggleSidebar } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropupOpen, setDropupOpen] = useState(false);
  const dropupRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLElement>(null);
  const { user, loading } = useUser();

  // ── GSAP: Animate sidebar width on collapse toggle ────────────
  useEffect(() => {
    if (!sidebarRef.current) return;

    const targetWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

    gsap.to(sidebarRef.current, {
      width: targetWidth,
      duration: 0.4,
      ease: "power3.inOut",
    });

    // Staggered label fade
    if (navItemsRef.current) {
      const labels = navItemsRef.current.querySelectorAll(".nav-label");
      const sections = navItemsRef.current.querySelectorAll(".section-label");

      if (collapsed) {
        gsap.to(labels, {
          opacity: 0,
          x: -8,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        });
        gsap.to(sections, {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      } else {
        gsap.to(labels, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.03,
          delay: 0.15,
          ease: "power2.out",
        });
        gsap.to(sections, {
          opacity: 1,
          height: "auto",
          paddingTop: 16,
          paddingBottom: 4,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    }
  }, [collapsed]);

  // Close dropup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropupRef.current && !dropupRef.current.contains(e.target as Node)) {
        setDropupOpen(false);
      }
    };
    if (dropupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropupOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (href: string) => pathname === href;

  const getUserInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getAvatarStyle = (name: string) => {
    const colors = [
      "linear-gradient(135deg, #f59e0b, #d97706)",
      "linear-gradient(135deg, #7c3aed, #6d28d9)",
      "linear-gradient(135deg, #06b6d4, #0891b2)",
      "linear-gradient(135deg, #10b981, #059669)",
      "linear-gradient(135deg, #f43f5e, #e11d48)",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-[100] p-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
      >
        ☰
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 pt-20 left-0 h-full bg-[#0d0d14] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 overflow-hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      >
        {/* ── Collapse Toggle Button ───────────────────────────── */}
        <div className="px-2 pt-2 pb-1 flex justify-end">
          <motion.button
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CollapseIcon collapsed={collapsed} />
            </motion.div>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav
          ref={navItemsRef}
          className="flex-1 px-2 pt-2 pb-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden"
        >
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.id}>
              {item.section && (
                <p className="section-label text-[9px] font-mono text-gray-600 uppercase tracking-[0.15em] px-3 pt-4 pb-1 whitespace-nowrap overflow-hidden">
                  {item.section}
                </p>
              )}

              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group/item whitespace-nowrap ${
                  isActive(item.href)
                    ? "bg-violet-600/20 border border-violet-500/30 text-white"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                {isActive(item.href) && (
                  <span className="absolute left-0 w-[3px] h-8 bg-violet-500 rounded-r-full shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                )}

                <span
                  className={`shrink-0 ${isActive(item.href) ? "text-violet-400" : ""}`}
                >
                  {item.icon}
                </span>

                <span className="nav-label text-[12px] font-mono overflow-hidden">
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a2e] border border-white/10 rounded-md text-xs text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100 transition-opacity duration-200 z-[100] shadow-lg">
                    {item.label}
                  </div>
                )}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* User Section with Dropup */}
        <div
          className="relative px-2 py-3 border-t border-white/10"
          ref={dropupRef}
        >
          {/* Dropup Menu */}
          <AnimatePresence>
            {dropupOpen && user && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-full left-2 right-2 mb-2 bg-[#16161f] border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-[100]"
              >
                <Link
                  href={`/profile/${user._id}`}
                  onClick={() => {
                    setDropupOpen(false);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {!collapsed && <span className="font-medium">Profile</span>}
                </Link>
                <div className="h-px bg-white/5" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  {!collapsed && <span className="font-medium">Logout</span>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded" />
          ) : user ? (
            <button
              onClick={() => setDropupOpen((prev) => !prev)}
              className="w-full flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-white/5 transition-colors cursor-pointer overflow-hidden"
              title={collapsed ? user.name : undefined}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  alt={user.name}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ background: getAvatarStyle(user.name) }}
                >
                  {getUserInitials(user.name)}
                </div>
              )}
              {!collapsed && (
                <>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs text-white font-bold truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-violet-400 truncate">
                      {user.role}
                    </p>
                  </div>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 shrink-0 ${
                      dropupOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <p className="text-xs text-gray-500">User not found</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
