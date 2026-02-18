"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const problems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="5" stroke="#8b5cf6" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="5" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="5" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(120 12 12)" />
      </svg>
    ),
    title: "Fragmented Data",
    desc: "Skills hidden in unstructured silos across incompatible platforms.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="2" x2="22" y2="22" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Lost Opportunities",
    desc: "True potential goes unnoticed without a unified graph.",
  },
];

const whyCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#8b5cf6" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M12 6v2M12 16v2M6 12H4M20 12h-2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "See the Unseen",
    desc: "Visualizing hidden connections between disparate technical skills to reveal latent potential in your workforce.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="3" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#8b5cf6" strokeWidth="1.5" />
      </svg>
    ),
    title: "AI-Driven Discovery",
    desc: "Finding talent based on actual capability graphs and project impact, not just matching keywords on a CV.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Trustless Verification",
    desc: "Validating skills through deep code analysis and graph theory, removing bias from the hiring equation.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 8h4M7 11h2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="14" y="7" width="4" height="4" rx="1" stroke="#8b5cf6" strokeWidth="1.2" />
      </svg>
    ),
    title: "Career Cartography",
    desc: "Mapping the clear path to the next level of seniority with personalized learning roadmaps based on gaps.",
  },
];

export default function Problem() {
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
        padding: "90px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top-right */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>

        {/* ── TOP: 2-col hero ── */}
        <div
          className="problem-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s ease",
            }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "20px", padding: "5px 14px",
              color: "#a78bfa", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              marginBottom: "24px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6" }} />
              The Challenge
            </span>

            <h2 style={{
              color: "#ffffff",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              fontFamily: "'Sora','Segoe UI',sans-serif",
              lineHeight: 1.1,
              margin: "0 0 20px",
            }}>
              Your Potential,
              <br />
              <span style={{
                background: "linear-gradient(135deg, #8b5cf6, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Scattered.
              </span>
            </h2>

            <p style={{
              color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 24px",
            }}>
              Technical expertise is currently locked in silos—GitHub repos, LinkedIn endorsements, and scattered certifications.
            </p>

            <blockquote style={{
              borderLeft: "3px solid rgba(139,92,246,0.5)",
              paddingLeft: "16px",
              margin: "0 0 36px",
              color: "#d1d5db",
              fontStyle: "italic",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}>
              "We lack a unified map of human capability. Talent is invisible because data is disconnected."
            </blockquote>

            {/* Problem mini-cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px",
            }}>
              {problems.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px", padding: "16px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: "rgba(139,92,246,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "10px",
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "0.875rem", marginBottom: "4px" }}>
                    {p.title}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.78rem", lineHeight: 1.5 }}>
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Graph window */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <div style={{
              overflow: "hidden",
              aspectRatio: "4/3",
              position: "relative",
            }}>
              
              {/* SVG Graph */}
              <div style={{ padding: "20px", height: "calc(100% - 44px)", position: "relative" }}>
                <Image src="/images/graphImg.svg" alt="graph" fill></Image>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Why SkillScape Matters ── */}
        <div>
          <h2 style={{
            textAlign: "center", color: "#ffffff",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
            fontFamily: "'Sora','Segoe UI',sans-serif",
            margin: "0 0 12px",
          }}>
            Why SkillScape Matters
          </h2>
          <p style={{
            textAlign: "center", color: "#9ca3af",
            fontSize: "1rem", maxWidth: "480px",
            margin: "0 auto 48px", lineHeight: 1.65,
          }}>
            We're moving beyond resume keywords. SkillScape builds a multidimensional understanding of technical talent.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "56px",
          }}>
            {whyCards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px", padding: "24px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease ${0.5 + i * 0.1}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(139,92,246,0.4)";
                  el.style.background = "rgba(139,92,246,0.06)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(255,255,255,0.07)";
                  el.style.background = "rgba(255,255,255,0.025)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "42px", height: "42px", borderRadius: "10px",
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px",
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  color: "#ffffff", fontSize: "0.95rem", fontWeight: 700,
                  fontFamily: "'Sora','Segoe UI',sans-serif", margin: "0 0 8px",
                }}>
                  {card.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.82rem", lineHeight: 1.65, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              color: "#6b7280", fontSize: "11px", letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "16px",
            }}>
              Ready to Map Your Future?
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                color: "#ffffff", border: "none", borderRadius: "10px",
                padding: "13px 30px", fontSize: "0.95rem", fontWeight: 600,
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "'Sora', sans-serif",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 28px rgba(139,92,246,0.35)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Explore the Graph →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}