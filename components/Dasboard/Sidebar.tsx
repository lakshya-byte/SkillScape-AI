"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

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
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUser();

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
        className={`fixed top-0 pt-20 left-0 h-full w-[220px] bg-[#0d0d14] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(item.href)
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

        {/* User Section */}
        <div className="px-3 py-4 border-t border-white/10">
          {loading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full object-cover"
                  alt={user.name}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: getAvatarStyle(user.name) }}
                >
                  {getUserInitials(user.name)}
                </div>
              )}
              <div>
                <p className="text-xs text-white font-bold truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-violet-400 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500">User not found</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
