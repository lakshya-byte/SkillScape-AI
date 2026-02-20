"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import Navbar from "@/components/landing/navbar/Navbar";
import { UserProvider } from "@/contexts/UserContext";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
}

export default function DashboardClientLayout({
  children,
}: DashboardClientLayoutProps) {
  return (
    <UserProvider>
      <SidebarProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </SidebarProvider>
    </UserProvider>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const sidebarWidth = collapsed ? "64px" : "220px";

  return (
    <div
      className="min-h-screen bg-[#0a0a10] flex flex-col"
      style={
        {
          // @ts-ignore
          "--sidebar-width": sidebarWidth,
        } as React.CSSProperties
      }
    >
      {/* Navbar is typically fixed or at top. 
          If Navbar is inside dashboard page, we might duplicate it if we put it here.
          The previous dashboard/page.tsx had Navbar.
          We should probably move Navbar here if it's common.
          For now, I'll NOT include Navbar here to avoid duplication if it's already in pages.
          Wait, if I remove imports from pages, I should move Navbar here.
          Let's assume Navbar is global for dashboard.
      */}

      <Sidebar />

      {/* Main Content Wrapper */}
      {/* 
          Mobile: ml-0
          Desktop: ml-[var(--sidebar-width)]
      */}
      <div className="flex-1 w-full transition-[margin-left] duration-300 ease-in-out md:ml-[var(--sidebar-width)]">
        {children}
      </div>
    </div>
  );
}
