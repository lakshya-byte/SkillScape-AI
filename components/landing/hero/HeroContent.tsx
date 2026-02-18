"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCTA from "./HeroCTA";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-animate",
        {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="
        relative z-10
        w-full h-full
        flex flex-col items-center justify-center
        px-6
        text-center
        pointer-events-none
      "
    >
      {/* BADGE */}
      <div
        className="
          hero-animate opacity-0
          pointer-events-auto
          mb-6 px-4 py-2
          rounded-full
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]
        "
      >
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/80">
          SkillScape AI
        </span>
      </div>

      {/* HEADING */}
      <h1
        className="
          hero-animate opacity-0
          max-w-4xl
          text-center
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold
          tracking-tight
          leading-[1.1]
        "
      >
        <span
          className="
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-white
            via-purple-300
            to-purple-500
          "
        >
          Your Technical Brain
        </span>

        <br />

        <span
          className="
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-purple-400
            via-purple-500
            to-purple-700
          "
        >
          Visualized in 3D Intelligence
        </span>
      </h1>

      {/* SUBHEADING */}
      <p
        className="
          hero-animate opacity-0
          mt-6 mb-10
          max-w-xl
          text-sm sm:text-base md:text-lg
          text-white/70
          font-light
          leading-relaxed
        "
      >
        SkillScape AI transforms your GitHub and projects into a living,
        interactive knowledge graph. Discover your strengths, identify skill
        gaps, and explore your technical intelligence in immersive 3D.
      </p>

      {/* CTA */}
      <div className="hero-animate opacity-0 pointer-events-auto">
        <HeroCTA />
      </div>
    </div>
  );
}
