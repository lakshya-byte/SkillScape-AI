"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/landing/providers/PreloaderProvider";

const TECH_TERMS = [
  "INITIALIZING SYSTEM...",
  "LOADING ASSETS...",
  "ESTABLISHING HANDSHAKE...",
  "MOUNTING DOM...",
  "CONFIGURING VIEWPORT...",
  "NCS CORE READY.",
];

export default function Preloader() {
  const { isLoading } = usePreloader();

  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [termIndex, setTermIndex] = useState(0);

  // --- 1. SCRAMBLE TEXT LOGIC ---
  useEffect(() => {
    if (!isLoading) return;

    // Cycle through tech terms rapidly
    const interval = setInterval(() => {
      setTermIndex((prev) => (prev + 1) % TECH_TERMS.length);
    }, 250);

    return () => clearInterval(interval);
  }, [isLoading]);

  // --- 2. ANIMATION SEQUENCE ---
  useEffect(() => {
    const tl = gsap.timeline();

    // A. The Loading Sequence (0% -> 100%)
    const counterObj = { value: 0 };

    tl.to(counterObj, {
      value: 100,
      duration: 1.8, // Slightly longer for dramatic effect
      ease: "power2.inOut",
      onUpdate: () => {
        // Update Number
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(
            counterObj.value,
          ).toString();
        }
        // Update Progress Bar Width
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${counterObj.value}%`;
        }
      },
    });

    // B. The Exit Sequence (Triggered when loading finishes)
    // We wait for the loading state to be explicitly false from your provider
    // OR we wait for the timeline to finish if data loads faster than animation.

    return () => {
      tl.kill();
    };
  }, []);

  // --- 3. EXIT ANIMATION TRIGGER ---
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const tl = gsap.timeline();

      // Step 1: Fade out details
      tl.to([counterRef.current, textRef.current, progressBarRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      });

      // Step 2: THE CURTAIN REVEAL (God Level)
      // The screen slides UP heavily, revealing the site underneath
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut", // The "Apple" ease
        delay: 0.1,
      });

      // Step 3: Cleanup (Optional: set display none after animation)
      tl.set(containerRef.current, { display: "none" });
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-black
        text-white
        overflow-hidden
      "
    >
      {/* BACKGROUND: Subtle Texture/Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* CENTER: Massive Typographic Counter */}
      <div className="relative z-10 flex items-baseline gap-2 overflow-hidden">
        <span
          ref={counterRef}
          className="
            text-[12rem] md:text-[16rem] 
            font-bold 
            leading-none 
            tracking-tighter
            text-white
          "
        >
          0
        </span>
        <span className="text-2xl md:text-4xl font-light text-zinc-500 mb-8 md:mb-12">
          %
        </span>
      </div>

      {/* FOOTER: Tech Scramble Text */}
      <div
        ref={textRef}
        className="
          absolute bottom-12 left-6 md:left-12
          flex flex-col gap-1
        "
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-white/70 uppercase w-[240px]">
            {TECH_TERMS[termIndex]}
          </span>
        </div>
      </div>

      {/* FOOTER: Copyright / Brand */}
      <div className="absolute bottom-12 right-6 md:right-12 hidden md:block">
        <span className="text-xs font-mono text-zinc-600 tracking-widest">
          NIBBLE COMPUTER SOCIETY © 2026
        </span>
      </div>

      {/* PROGRESS BAR (Thin Line at Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900">
        <div
          ref={progressBarRef}
          className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-75 ease-linear"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
