"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Connect Your Sources",
    desc: "Link your GitHub, LinkedIn, certifications, and project repos. SkillScape pulls everything into one unified pipeline.",
    tag: "Ingestion",
  },
  {
    step: "02",
    title: "AI Builds Your Graph",
    desc: "Our models analyze code quality, contribution patterns, and skill co-occurrence to construct your capability graph.",
    tag: "Analysis",
  },
  {
    step: "03",
    title: "Verify & Validate",
    desc: "Deep code analysis and graph theory verify real-world skills — no self-reported bias.",
    tag: "Verification",
  },
  {
    step: "04",
    title: "Discover & Grow",
    desc: "Unlock your personalized career roadmap — see gaps, find opportunities, and connect with teams.",
    tag: "Growth",
  },
];

export default function Solution() {
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
      className="relative bg-[#0d0618] py-24 px-6 overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400 mb-6">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            The Solution
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How SkillScape Works
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Four steps to transform scattered data into a living, verified skill graph.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-purple-500/5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Step Number Badge */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-700/20 border border-purple-500/40 text-purple-300 font-bold text-sm mb-4">
                {s.step}
              </div>

              {/* Tag */}
              <span className="inline-block bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-1 text-xs text-purple-300 font-semibold mb-4">
                {s.tag}
              </span>

              {/* Title */}
              <h3 className="text-white font-semibold text-base mb-3">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
