"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Zap } from "lucide-react";

const differentiators = [
  {
    left: "Traditional Hiring",
    right: "SkillScape",
    topic: "Skill Discovery",
    leftDesc: "Keyword matching on PDFs",
    rightDesc: "Graph-based capability analysis",
  },
  {
    left: "Self-Reported",
    right: "Verified",
    topic: "Skill Validation",
    leftDesc: "Unchecked LinkedIn endorsements",
    rightDesc: "Code analysis & contribution graphs",
  },
  {
    left: "Siloed",
    right: "Unified",
    topic: "Data Sources",
    leftDesc: "GitHub, LinkedIn, certs—disconnected",
    rightDesc: "One multidimensional skill graph",
  },
  {
    left: "Opaque",
    right: "Transparent",
    topic: "Career Path",
    leftDesc: "Unclear path to next role",
    rightDesc: "Personalized roadmap with gap analysis",
  },
];

export default function Unique() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0f] py-24 px-6 overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.09),transparent_65%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400 mb-6">
            <Sparkles size={14} className="text-purple-400" />
            What Makes Us Different
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The SkillScape Advantage
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We didn’t just build a better resume tool. We reimagined the entire model of how talent is understood.
          </p>
        </div>

        {/* Column Labels */}
        <div className="hidden md:grid grid-cols-[1fr_140px_1fr] gap-3 mb-3 px-1">
          <div className="text-gray-600 text-xs font-semibold tracking-wider uppercase">
            Old Way
          </div>
          <div />
          <div className="text-purple-400 text-xs font-semibold tracking-wider uppercase text-right">
            SkillScape
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-4">
          {differentiators.map((row, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-[1fr_140px_1fr] gap-4 items-center bg-white/[0.02] border border-white/10 rounded-xl p-6 transition-all duration-500 hover:border-purple-500/40 hover:bg-purple-500/5 ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Left */}
              <div>
                <div className="text-gray-500 font-semibold text-sm line-through mb-1">
                  {row.left}
                </div>
                <div className="text-gray-600 text-xs">
                  {row.leftDesc}
                </div>
              </div>

              {/* Center Topic */}
              <div className="text-center">
                <span className="inline-block bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-1 text-xs text-purple-300 font-semibold">
                  {row.topic}
                </span>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="font-bold text-sm mb-1 bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                  {row.right}
                </div>
                <div className="text-gray-400 text-xs">
                  {row.rightDesc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pill */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/25 rounded-xl px-8 py-4 text-gray-300 text-sm">
            <Zap size={16} className="text-purple-400 animate-pulse" />
            Built on graph theory, verified by AI, designed for humans.
            <Zap size={16} className="text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
