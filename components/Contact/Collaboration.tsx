"use client"

import { useEffect, useRef, useState } from "react";

export default function Collaboration() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#0d0618] px-6 py-20 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.4)] to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.1)_0%,transparent_65%)] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-2xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        <h2
          className="text-white font-bold leading-tight mb-8 font-[Sora,sans-serif]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Let's Build the Future of{" "}
          <span className="bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] bg-clip-text text-transparent">
            Technical Intelligence
          </span>{" "}
          Together
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* Primary CTA */}
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(139,92,246,0.45)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(139,92,246,0.3)";
            }}
          >
            Schedule Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Secondary CTA */}
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold bg-transparent border border-[rgba(255,255,255,0.12)] transition-all duration-300 hover:border-[rgba(139,92,246,0.5)] hover:bg-[rgba(139,92,246,0.08)] hover:-translate-y-0.5"
          >
            Join Beta
          </button>
        </div>
      </div>
    </section>
  );
}