"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/utils/LazyMount";

/*
========================================
Dynamic imports (Bundle-level optimization)
========================================
*/

// Hero loads immediately (LCP element)
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black" />,
});

// All other heavy sections load only when needed
const IdentitySection = dynamic(
  () => import("@/components/sections/IdentitySection"),
  {
    ssr: false,
  },
);

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  {
    ssr: false,
  },
);

const PillarsSection = dynamic(
  () => import("@/components/sections/PillarsSection"),
  {
    ssr: false,
  },
);

const RecruitmentTimelineSection = dynamic(
  () => import("@/components/sections/RecruitmentTimelineSection"),
  {
    ssr: false,
  },
);

const WhyJoinNibble = dynamic(
  () => import("@/components/sections/WhyJoinNibble"),
  {
    ssr: false,
  },
);

const JoinCTA = dynamic(() => import("@/components/sections/JoinCTA"), {
  ssr: false,
});

/*
========================================
Final Page Component
========================================
*/

export default function Page() {
  return (
    <main className="relative w-full bg-black">
      {/* HERO loads immediately (important for LCP) */}
      <HeroSection />

      {/* Below sections mount ONLY when near viewport */}

      <LazyMount>
        <section className="lazy-section">
          <IdentitySection />
        </section>
      </LazyMount>

      <LazyMount>
        <section className="lazy-section">
          <AboutSection />
        </section>
      </LazyMount>

      <LazyMount>
        <section className="lazy-section">
          <PillarsSection />
        </section>
      </LazyMount>

      <LazyMount>
        <section className="lazy-section">
          <RecruitmentTimelineSection />
        </section>
      </LazyMount>

      <LazyMount>
        <section className="lazy-section">
          <WhyJoinNibble />
        </section>
      </LazyMount>

      <LazyMount>
        <section className="lazy-section">
          <JoinCTA />
        </section>
      </LazyMount>
    </main>
  );
}
