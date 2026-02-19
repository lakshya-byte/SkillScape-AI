"use client";

import React from 'react';
import TechnicalIntelligence from '@/components/Sidebar/TechnicalIntelligence';
import Sidebar from "@/components/Dasboard/Sidebar";
import Navbar from "@/components/landing/navbar/Navbar";
import { UserProvider } from "@/contexts/UserContext";

const TechnicalIntelligencePage: React.FC = () => {
    return (
        <UserProvider>
            <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
                {/* ── Navbar ─────────────────────────────────────────────────────── */}
                <Navbar />
                
                {/* ── Fixed Sidebar ─────────────────────────────────────────────── */}
                <Sidebar />

                {/* ── Main content — offset by sidebar width ─────────────────────── */}
                <div className="flex-1 relative w-full">
                    {/* Ambient glow top-right of content area */}
                    <div
                        className="fixed top-0 left-0 md:left-[185px] right-0 h-[50vh] pointer-events-none z-0"
                        style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
                    />
                    {/* Scrollable content */}
                    <div className="relative z-10 px-4 md:px-8 md:ml-[210px] pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto">
                        <TechnicalIntelligence />
                    </div>
                </div>
            </div>
        </UserProvider>
    );
};

export default TechnicalIntelligencePage;
