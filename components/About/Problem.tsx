"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Database, ZapOff, Eye, Sparkles, ShieldCheck, Map } from "lucide-react";

const problems = [
  {
    title: "Fragmented Data",
    desc: "Skills hidden in unstructured silos across incompatible platforms.",
    icon: Database,
  },
  {
    title: "Lost Opportunities",
    desc: "True potential goes unnoticed without a unified graph.",
    icon: ZapOff,
  },
];

const whyCards = [
  {
    title: "See the Unseen",
    desc: "Visualizing hidden connections between disparate technical skills to reveal latent potential.",
    icon: Eye,
  },
  {
    title: "AI-Driven Discovery",
    desc: "Finding talent based on actual capability graphs and project impact.",
    icon: Sparkles,
  },
  {
    title: "Trustless Verification",
    desc: "Validating skills through deep code analysis and graph theory.",
    icon: ShieldCheck,
  },
  {
    title: "Career Cartography",
    desc: "Mapping the clear path to your next level with personalized roadmaps.",
    icon: Map,
  },
];

export default function Problem() {
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
      className="relative pb-24 px-6 overflow-hidden "
    >
      {/* Glow background */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(139,92,246,0.09),transparent_65%)] pointer-events-none " />

      <div className="max-w-6xl mx-auto relative">

        {/* ───────── HERO SECTION ───────── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div
            className={`transition-all duration-700 ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-6"
              }`}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400 mb-6">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              The Challenge
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Your Potential,
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                Scattered.
              </span>
            </h2>

            <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
              Technical expertise is currently locked in silos — GitHub repos,
              LinkedIn endorsements, and scattered certifications.
            </p>

            <blockquote className="border-l-4 border-purple-500/50 pl-4 italic text-gray-300 text-sm mb-10">
              “We lack a unified map of human capability. Talent is invisible because data is disconnected.”
            </blockquote>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className={`bg-white/[0.03] border border-white/10 rounded-xl p-5 transition-all duration-500 hover:border-purple-500/40 hover:bg-purple-500/5 ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-purple-500/15 rounded-lg mb-4 flex items-center justify-center text-purple-400">
                    <p.icon size={20} />
                  </div>

                  <h4 className="text-white font-semibold text-sm mb-2">
                    {p.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Graph */}
          <div
            className={`transition-all duration-700 delay-200 ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-6"
              }`}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <Image
                src="/images/graphImg.svg"
                alt="Graph Preview"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>

        {/* ───────── WHY SKILLSCAPE ───────── */}
        <div className="text-center mb-16 pt-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why SkillScape Matters
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            We're moving beyond resume keywords. SkillScape builds a multidimensional understanding of technical talent.
          </p>
        </div>

        {/* Why Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyCards.map((card, i) => (
            <div
              key={i}
              className={`bg-white/[0.03] border border-white/10 rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-purple-500/5 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="w-10 h-10 bg-purple-500/15 rounded-lg mb-4 flex items-center justify-center text-purple-400">
                <card.icon size={20} />
              </div>

              <h4 className="text-white font-semibold text-sm mb-2">
                {card.title}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="uppercase text-xs tracking-widest text-gray-500 mb-6">
            Ready to Map Your Future?
          </p>

          <button className="bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)]">
            Explore the Graph →
          </button>
        </div>
      </div>
    </section>
  );
}
