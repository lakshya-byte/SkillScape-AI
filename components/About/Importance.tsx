"use client"

import { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="5.5" stroke="#8b5cf6" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="5.5" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="5.5" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
    title: "Data Sources",
    desc: "Ingesting raw data from your digital footprint.",
    tags: ["GitHub", "LinkedIn", "Resume"],
    accent: false,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI Processing",
    desc: "Natural Language Understanding & Semantic Analysis.",
    tags: [],
    accent: false,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="1.5" fill="#8b5cf6"/>
        <circle cx="16" cy="8" r="1.5" fill="#8b5cf6"/>
        <circle cx="12" cy="16" r="1.5" fill="#8b5cf6"/>
        <line x1="8" y1="8" x2="16" y2="8" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="8" y1="8" x2="12" y2="16" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="16" y1="8" x2="12" y2="16" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
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
  { label: "Interactive 3D Universe", desc: "Rotate, zoom, and explore connections between technologies visually." },
  { label: "Code-Verified Skills", desc: "Evidence-based graphing derived directly from your commit history." },
  { label: "Exploratory Navigation", desc: "Discover hidden strengths and adjacent skills you didn't know you had." },
  { label: "Immersive Experience", desc: "Leave a lasting impression with a portfolio that feels alive." },
];

export default function Importance() {
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
    <div ref={ref}>
      {/* ─── SECTION 1: The Process ─── */}
      <section style={{
        background: "#0a0a0f",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "20px", padding: "5px 14px",
              color: "#a78bfa", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              The Process
            </span>
          </div>

          <h2 style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            fontFamily: "'Sora','Segoe UI',sans-serif",
            margin: "0 0 16px",
          }}>
            From Chaos to Constellation
          </h2>
          <p style={{
            textAlign: "center", color: "#9ca3af",
            fontSize: "1rem", maxWidth: "440px",
            margin: "0 auto 60px", lineHeight: 1.7,
          }}>
            We ingest your scattered digital footprint and synthesize it into an interactive, 3D universe of your technical capabilities.
          </p>

          {/* Process Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}>
            {processSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: step.accent
                    ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.08))"
                    : "rgba(255,255,255,0.025)",
                  border: step.accent
                    ? "1px solid rgba(139,92,246,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.6s ease ${i * 0.12}s`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  width: "50px", height: "50px", borderRadius: "12px",
                  background: step.accent ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  color: "#ffffff", fontSize: "1rem", fontWeight: 700,
                  fontFamily: "'Sora','Segoe UI',sans-serif",
                  margin: "0 0 10px",
                }}>
                  {step.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>

                {/* Tags */}
                {step.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                    {step.tags.map((tag, ti) => (
                      <span key={ti} style={{
                        background: "rgba(139,92,246,0.12)",
                        border: "1px solid rgba(139,92,246,0.2)",
                        borderRadius: "6px", padding: "4px 10px",
                        color: "#a78bfa", fontSize: "11px", fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 3D Graph mini preview */}
                {step.preview && (
                  <div style={{
                    marginTop: "20px",
                    background: "rgba(0,0,0,0.4)",
                    borderRadius: "10px",
                    border: "1px solid rgba(139,92,246,0.2)",
                    padding: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="80" height="60" viewBox="0 0 80 60">
                      {[
                        [20,30,60,15],[20,30,40,50],[60,15,60,45],[60,45,40,50]
                      ].map(([x1,y1,x2,y2], idx) => (
                        <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="rgba(139,92,246,0.5)" strokeWidth="1"/>
                      ))}
                      {[[20,30],[60,15],[60,45],[40,50]].map(([cx,cy], idx) => (
                        <circle key={idx} cx={cx} cy={cy} r="4" fill="#8b5cf6"/>
                      ))}
                    </svg>
                  </div>
                )}

                {/* Progress bar for AI Processing */}
                {i === 1 && (
                  <div style={{ marginTop: "20px" }}>
                    <div style={{
                      height: "3px", background: "rgba(255,255,255,0.08)",
                      borderRadius: "99px", overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", width: "60%",
                        background: "linear-gradient(90deg, #7c3aed, #8b5cf6)",
                        borderRadius: "99px",
                        transition: "width 1.5s ease 0.5s",
                      }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Beyond the PDF ─── */}
      <section style={{
        background: "#0d0618",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          {/* Badge */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "20px", padding: "5px 14px",
              color: "#a78bfa", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Why It Matters
            </span>
          </div>

          <h2 style={{
            textAlign: "center", color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
            fontFamily: "'Sora','Segoe UI',sans-serif",
            margin: "0 0 56px",
          }}>
            Beyond the PDF
          </h2>

          {/* Comparison */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
          className="beyond-grid"
          >
            {/* Left: Traditional */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#6b7280" strokeWidth="1.5"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Traditional Portfolios
                </span>
              </div>
              {traditionalCons.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "18px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: "1.5px solid #4b5563",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>
                    <div style={{ width: "6px", height: "1px", background: "#4b5563" }} />
                  </div>
                  <div>
                    <div style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</div>
                    <div style={{ color: "#4b5563", fontSize: "0.8rem", lineHeight: 1.5, marginTop: "2px" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: SkillScape */}
            <div style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(109,40,217,0.06))",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "16px", padding: "28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease 0.3s",
              position: "relative",
            }}>
              {/* THE FUTURE tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <span style={{
                  background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)",
                  borderRadius: "20px", padding: "3px 10px",
                  color: "#a78bfa", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  The Future
                </span>
                <span style={{ color: "#a78bfa", fontSize: "0.875rem", fontWeight: 700 }}>SkillScape AI</span>
              </div>

              {skillscapePros.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "18px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "50%",
                    border: "1.5px solid #8b5cf6",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                    background: "rgba(139,92,246,0.15)",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</div>
                    <div style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.5, marginTop: "2px" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .beyond-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </div>
  );
}