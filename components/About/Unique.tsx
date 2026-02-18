"use client"

import { useEffect, useRef, useState } from "react";

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
        background: "#0a0a0f",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
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
            What Makes Us Different
          </span>
          <h2 style={{
            color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, fontFamily: "'Sora','Segoe UI',sans-serif",
            margin: "0 0 16px",
          }}>
            The SkillScape Advantage
          </h2>
          <p style={{
            color: "#9ca3af", fontSize: "1rem", maxWidth: "480px",
            margin: "0 auto", lineHeight: 1.65,
          }}>
            We didn't just build a better resume tool. We reimagined the entire model of how talent is understood.
          </p>
        </div>

        {/* Column Labels */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 140px 1fr",
          gap: "12px", marginBottom: "10px", padding: "0 4px",
        }}>
          <div style={{ color: "#4b5563", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Old Way
          </div>
          <div />
          <div style={{ color: "#8b5cf6", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "right" }}>
            SkillScape
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {differentiators.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 1fr",
                gap: "12px",
                alignItems: "center",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "18px 20px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(139,92,246,0.35)";
                el.style.background = "rgba(139,92,246,0.05)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {/* Left */}
              <div>
                <div style={{
                  color: "#4b5563", fontWeight: 600, fontSize: "0.9rem",
                  textDecoration: "line-through", marginBottom: "3px",
                }}>
                  {row.left}
                </div>
                <div style={{ color: "#374151", fontSize: "0.78rem" }}>{row.leftDesc}</div>
              </div>

              {/* Center */}
              <div style={{ textAlign: "center" }}>
                <span style={{
                  display: "inline-block",
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.22)",
                  borderRadius: "20px", padding: "5px 10px",
                  color: "#a78bfa", fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.04em",
                }}>
                  {row.topic}
                </span>
              </div>

              {/* Right */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontWeight: 700, fontSize: "0.9rem", marginBottom: "3px",
                  background: "linear-gradient(135deg, #8b5cf6, #c084fc)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {row.right}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.78rem" }}>{row.rightDesc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom pill */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: "12px", padding: "12px 24px",
            color: "#d1d5db", fontSize: "0.875rem",
          }}>
            <span style={{ color: "#8b5cf6" }}>✦</span>
            Built on graph theory, verified by AI, designed for humans.
            <span style={{ color: "#8b5cf6" }}>✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}