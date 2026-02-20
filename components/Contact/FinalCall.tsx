"use client"

import { useEffect, useRef, useState } from "react";

export default function FinalCall() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Final CTA Banner ── */}
      <section className="relative bg-[#0a0a0f] px-6 py-20 overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.3)] to-transparent" />

        {/* Deep glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.08)_0%,transparent_65%)] pointer-events-none" />

        <div
          ref={ref}
          className="relative max-w-2xl mx-auto text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Decorative top element */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
                  style={{ opacity: 0.3 + i * 0.35 }}
                />
              ))}
            </div>
          </div>

          <h2
            className="text-white font-extrabold leading-tight mb-3 font-[Sora,sans-serif]"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}
          >
            Ready to Visualize Your Knowledge?
          </h2>

          <p className="text-[#6b7280] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Join 10,000+ engineers mapping their career growth with Velion AI.
          </p>

          <button
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              boxShadow: "0 4px 24px rgba(139,92,246,0.3)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(139,92,246,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(139,92,246,0.3)";
            }}
          >
            Create Your Map
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0a0a0f] border-t border-[rgba(255,255,255,0.05)] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Top footer row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-bold text-sm font-[Sora,sans-serif]">Velion AI</span>
            </div>

            {/* Footer nav */}
            <nav className="flex flex-wrap gap-6 justify-center">
              {["Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#6b7280] text-xs hover:text-[#9ca3af] transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* Globe */}
              <a href="#" className="text-[#4b5563] hover:text-[#8b5cf6] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-[#4b5563] hover:text-[#8b5cf6] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              {/* Share/X */}
              <a href="#" className="text-[#4b5563] hover:text-[#8b5cf6] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="border-t border-[rgba(255,255,255,0.05)] pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[#374151] text-xs">© 2024 Velion AI. All rights reserved.</p>
            <p className="text-[#374151] text-xs">Built with intelligence, designed for humans.</p>
          </div>
        </div>
      </footer>
    </>
  );
}