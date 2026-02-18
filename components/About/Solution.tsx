"use client"

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Connect Your Sources",
    desc: "Link your GitHub, LinkedIn, certifications, and project repos. SkillScape pulls everything into one unified pipeline.",
    tag: "Ingestion",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" fill="#8b5cf6"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI Builds Your Graph",
    desc: "Our models analyze code quality, contribution patterns, and skill co-occurrence to construct your capability graph.",
    tag: "Analysis",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Verify & Validate",
    desc: "Deep code analysis and graph theory verify real-world skills—no self-reported bias, just provable expertise.",
    tag: "Verification",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "Discover & Grow",
    desc: "Unlock your personalized career roadmap—see gaps, find opportunities, and connect with teams that need your skills.",
    tag: "Growth",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 7 22 7 22 13" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Solution() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#0d0618",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
      }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "20px", padding: "5px 14px",
            color: "#a78bfa", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "20px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6" }} />
            The Solution
          </span>
          <h2 style={{
            color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, fontFamily: "'Sora','Segoe UI',sans-serif",
            margin: "0 0 16px",
          }}>
            How SkillScape Works
          </h2>
          <p style={{
            color: "#9ca3af", fontSize: "1rem", maxWidth: "480px",
            margin: "0 auto", lineHeight: 1.65,
          }}>
            Four steps to transform scattered data into a living, verified skill graph.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
        }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px", padding: "28px 24px",
                position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(139,92,246,0.4)";
                el.style.background = "rgba(139,92,246,0.07)";
                el.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.025)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Step badge */}
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15))",
                border: "1px solid rgba(139,92,246,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#a78bfa", fontWeight: 800, fontSize: "0.8rem",
                fontFamily: "'Sora', sans-serif",
                marginBottom: "16px",
              }}>
                {s.step}
              </div>

              {/* Tag */}
              <span style={{
                display: "inline-block",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: "20px", padding: "3px 10px",
                color: "#a78bfa", fontSize: "10px", fontWeight: 600,
                marginBottom: "12px",
              }}>
                {s.tag}
              </span>

              {/* Icon */}
              <div style={{ marginBottom: "10px" }}>{s.icon}</div>

              <h3 style={{
                color: "#ffffff", fontSize: "1rem", fontWeight: 700,
                fontFamily: "'Sora','Segoe UI',sans-serif", margin: "0 0 10px",
              }}>
                {s.title}
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}