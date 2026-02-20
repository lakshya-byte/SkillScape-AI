"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { logoutUser } from "@/lib/authApi";

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
    className="w-4 h-4"
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
    className="w-4 h-4"
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
    className="w-4 h-4"
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
    className="w-4 h-4"
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
    className="w-4 h-4"
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
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M12 12v10" />
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
  const [isOpen, setIsOpen] = useState(false);
  const [dropupOpen, setDropupOpen] = useState(false);
  const dropupRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useUser();

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
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 pt-20 left-0 h-full w-[220px] bg-[#0d0d14] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Navigation */}
        <nav className="flex-1 px-2 pt-6 pb-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.id}>
              {item.section && (
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.15em] px-3 pt-4 pb-1">
                  {item.section}
                </p>
              )}

              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.href)
                    ? "bg-violet-600/20 border border-violet-500/30 text-white"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                  }`}
              >
                {isActive(item.href) && (
                  <span className="absolute left-0 w-[3px] h-8 bg-violet-500 rounded-r-full shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                )}

                <span className={isActive(item.href) ? "text-violet-400" : ""}>
                  {item.icon}
                </span>

                <span className="text-[12px] font-mono">{item.label}</span>
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* User Section with Dropup */}
        <div className="relative px-3 py-4 border-t border-white/10" ref={dropupRef}>
          {/* Dropup Menu */}
          {dropupOpen && user && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#16161f] border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50">
              <Link
                href={`/profile/${user._id}`}
                onClick={() => { setDropupOpen(false); setIsOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-medium">Profile</span>
              </Link>
              <div className="h-px bg-white/5" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}

          {loading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded" />
          ) : user ? (
            <button
              onClick={() => setDropupOpen(prev => !prev)}
              className="w-full flex items-center gap-3 rounded-lg px-1 py-1 -mx-1 hover:bg-white/5 transition-colors cursor-pointer"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  alt={user.name}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: getAvatarStyle(user.name) }}
                >
                  {getUserInitials(user.name)}
                </div>
              )}
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs text-white font-bold truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-violet-400 truncate">
                  {user.role}
                </p>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${dropupOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
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
