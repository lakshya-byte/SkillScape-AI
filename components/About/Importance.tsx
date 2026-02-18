"use client";

import { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    title: "Data Sources",
    desc: "Ingesting raw data from your digital footprint.",
    tags: ["GitHub", "LinkedIn", "Resume"],
    accent: false,
  },
  {
    title: "AI Processing",
    desc: "Natural Language Understanding & Semantic Analysis.",
    tags: [],
    accent: false,
  },
  {
    title: "3D Skill Graph",
    desc: "An interactive knowledge network of your expertise.",
    tags: [],
    accent: true,
    preview: true,
  },
];

const traditionalCons = [
  { label: "Static & Flat", desc: "Resumes are stuck in 2D, failing to capture complexity." },
  { label: "Hard to Verify", desc: "Recruiters must trust self-reported skill levels blindly." },
  { label: "Linear Reading", desc: "Forces a sequential narrative that hides cross-domain connections." },
  { label: "Keyword Stuffing", desc: "Optimized for ATS bots, not for human understanding." },
];

const skillscapePros = [
  { label: "Interactive 3D Universe", desc: "Rotate, zoom, and explore connections visually." },
  { label: "Code-Verified Skills", desc: "Evidence-based graphing from commit history." },
  { label: "Exploratory Navigation", desc: "Discover hidden strengths and adjacent skills." },
  { label: "Immersive Experience", desc: "A portfolio that feels alive and unforgettable." },
];

export default function Importance() {
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
    <div ref={ref}>

      {/* ─── SECTION 1: PROCESS ─── */}
      <section className="relative bg-[#0a0a0f] py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400 mb-6">
            The Process
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From Chaos to{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Constellation
            </span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
            We ingest your scattered digital footprint and synthesize it into an interactive, 3D universe of your technical capabilities.
          </p>

          {/* Process Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 transition-all duration-700 ${
                  step.accent
                    ? "bg-gradient-to-br from-purple-500/15 to-purple-800/10 border border-purple-500/40"
                    : "bg-white/[0.03] border border-white/10"
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 font-bold">
                  ★
                </div>

                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {step.desc}
                </p>

                {/* Tags */}
                {step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {step.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="bg-purple-500/15 border border-purple-500/30 rounded-md px-3 py-1 text-xs text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 3D Graph Preview */}
                {step.preview && (
                  <div className="mt-6 bg-black/40 border border-purple-500/20 rounded-lg p-4 flex justify-center">
                    <div className="w-20 h-14 bg-purple-500/20 rounded-md animate-pulse" />
                  </div>
                )}

                {/* Progress Bar */}
                {i === 1 && (
                  <div className="mt-6">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: BEYOND THE PDF ─── */}
      <section className="relative bg-[#0d0618] py-24 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.08),transparent_65%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">

          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400">
              Why It Matters
            </span>
          </div>

          <h2 className="text-center text-3xl md:text-5xl font-bold mb-16">
            Beyond the PDF
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Traditional */}
            <div
              className={`bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6"
              }`}
            >
              <span className="uppercase text-xs tracking-widest text-gray-500 font-semibold">
                Traditional Portfolios
              </span>

              <div className="mt-6 space-y-6">
                {traditionalCons.map((item, i) => (
                  <div key={i}>
                    <h4 className="text-gray-400 font-semibold text-sm">
                      {item.label}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SkillScape */}
            <div
              className={`bg-gradient-to-br from-purple-500/15 to-purple-800/10 border border-purple-500/40 rounded-2xl p-8 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6"
              }`}
            >
              <span className="uppercase text-xs tracking-widest text-purple-400 font-semibold">
                The Future · SkillScape AI
              </span>

              <div className="mt-6 space-y-6">
                {skillscapePros.map((item, i) => (
                  <div key={i}>
                    <h4 className="text-white font-semibold text-sm">
                      {item.label}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
