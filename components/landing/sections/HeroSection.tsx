"use client";

import HeroBackground from "@/components/landing/hero/HeroBackground";
import HeroContent from "@/components/landing/hero/HeroContent";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        w-screen
        h-screen

        flex
        items-center
        justify-center

        overflow-hidden

        bg-black
      "
    >
      {/* Background Layer */}
      <HeroBackground />

      {/* Content Layer */}
      <HeroContent />
    </section>
  );
}
