"use client"

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#0a0a0f] pt-28 pb-16 px-6 overflow-hidden text-center">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.15)_0%,transparent_65%)] pointer-events-none" />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.3)] rounded-full px-4 py-1.5 mb-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
        <span className="text-[#a78bfa] text-[11px] font-semibold tracking-widest uppercase">
          Contact Velion AI
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-white font-extrabold leading-tight font-[Sora,sans-serif] transition-all duration-700 delay-100"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        Connect With the{" "}
        <span className="bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] bg-clip-text text-transparent">
          Intelligence
        </span>{" "}
        Behind Velion AI
      </h1>

      {/* Subtext */}
      <p
        className="mt-5 text-[#9ca3af] text-base max-w-md mx-auto leading-relaxed transition-all duration-700 delay-200"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
      >
        Have questions about our 3D visualization engine? Our team is here to help you map your technical future and scale your intelligence.
      </p>
    </section>
  );
}