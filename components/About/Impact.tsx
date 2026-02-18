"use client"

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "50k+", label: "Active Nodes" },
  { value: "12k", label: "Skills Mapped" },
  { value: "850k", label: "Daily Queries" },
  { value: "99%", label: "Accuracy" },
];

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "For Students",
    desc: "Visualize your learning path. Discover how skills connect and build a personalized roadmap from novice to expert using our interactive 3D graph.",
    link: "Start Learning →",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 8h10M7 11h6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "For Professionals",
    desc: "Map your career trajectory. Identify skill gaps, find adjacent technologies, and validate your expertise against industry standards in real-time.",
    link: "Analyze Career →",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "For Recruiters",
    desc: "Discover verified talent. Move beyond keyword matching with semantic understanding of candidate capabilities and technical depth.",
    link: "Find Talent →",
  },
];

export default function Impact() {
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
        padding: "80px 24px 0",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top purple border line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg, transparent 0%, #8b5cf6 50%, transparent 100%)",
      }} />

      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", flex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: "28px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)",
            borderRadius: "20px", padding: "6px 16px",
            color: "#a78bfa", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6" }} />
            The Impact
          </span>
        </div>

        {/* Headline */}
        <div style={{
          textAlign: "center", marginBottom: "20px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          <h1 style={{
            color: "#ffffff",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            fontFamily: "'Sora', 'Segoe UI', sans-serif",
            lineHeight: 1.1,
            margin: 0,
          }}>
            Redefining
            <br />
            <span style={{
              background: "linear-gradient(135deg, #8b5cf6 30%, #c084fc 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Technical Intelligence
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p style={{
          textAlign: "center", color: "#9ca3af",
          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
          maxWidth: "460px", margin: "0 auto 56px",
          lineHeight: 1.7,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.2s",
        }}>
          Connecting the dots between potential and mastery through our immersive 3D knowledge graph technology. We don't just map skills; we reveal the future of work.
        </p>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "80px",
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "32px 28px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(139,92,246,0.4)";
                el.style.background = "rgba(139,92,246,0.06)";
                el.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.025)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon box */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}>
                {card.icon}
              </div>

              <h3 style={{
                color: "#ffffff", fontSize: "1.1rem", fontWeight: 700,
                fontFamily: "'Sora', 'Segoe UI', sans-serif",
                margin: "0 0 12px",
              }}>
                {card.title}
              </h3>
              <p style={{
                color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.7,
                margin: "0 0 20px",
              }}>
                {card.desc}
              </p>
              <a href="#" style={{
                color: "#8b5cf6", fontSize: "0.875rem", fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "4px",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8b5cf6")}
              >
                {card.link}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 24px",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${0.6 + i * 0.08}s`,
              }}
            >
              <div style={{
                color: "#ffffff", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800, fontFamily: "'Sora', sans-serif",
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                color: "#6b7280", fontSize: "0.7rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                marginTop: "6px", fontWeight: 500,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}