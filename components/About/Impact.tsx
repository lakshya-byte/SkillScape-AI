"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, Search } from "lucide-react";

const stats = [
  { value: "50k+", label: "Active Nodes" },
  { value: "12k", label: "Skills Mapped" },
  { value: "850k", label: "Daily Queries" },
  { value: "99%", label: "Accuracy" },
];

const cards = [
  {
    title: "For Students",
    desc: "Visualize your learning path. Discover how skills connect and build a personalized roadmap from novice to expert using our interactive 3D graph.",
    link: "Start Learning →",
    icon: GraduationCap,
  },
  {
    title: "For Professionals",
    desc: "Map your career trajectory. Identify skill gaps, find adjacent technologies, and validate your expertise against industry standards in real-time.",
    link: "Analyze Career →",
    icon: Briefcase,
  },
  {
    title: "For Recruiters",
    desc: "Discover verified talent. Move beyond keyword matching with semantic understanding of candidate capabilities and technical depth.",
    link: "Find Talent →",
    icon: Search,
  },
];

export default function Impact() {
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
      className="relative bg-[#0a0a0f] pt-20 px-6 min-h-screen overflow-hidden"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08),transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <span className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-purple-400">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
            The Impact
          </span>
        </div>

        {/* Heading */}
        <div
          className={`text-center mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Redefining <br />
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Technical Intelligence
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p
          className={`text-center text-gray-400 max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          Connecting the dots between potential and mastery through our immersive 3D knowledge graph technology. We don’t just map skills — we reveal the future of work.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-purple-500/5 ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 font-bold">
                <card.icon size={24} />
              </div>

              <h3 className="text-lg font-semibold mb-3 text-white">
                {card.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {card.desc}
              </p>

              <a
                href="#"
                className="text-purple-400 text-sm font-semibold hover:text-purple-300 transition"
              >
                {card.link}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-white/10 py-10 bg-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
                }`}
              style={{ transitionDelay: `${0.6 + i * 0.08}s` }}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
