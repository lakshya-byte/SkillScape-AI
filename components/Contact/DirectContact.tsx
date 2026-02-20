"use client"

import { useEffect, useRef, useState } from "react";

const contacts = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "General Inquiries",
    desc: "Questions about our product or team? We'd love to hear from you.",
    email: "hello@Velion AI.ai",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Partnerships",
    desc: "Interested in co-launching the future of skills education.",
    email: "partner@Velion AI.ai",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 8l2 2 4-4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Technical Support",
    desc: "Encountering a bug or need help with a visualization?",
    email: "help@Velion AI.ai",
  },
];

export default function DirectContact() {
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
    <section className="relative bg-[#0a0a0f] px-6 py-16">
      <div
        ref={ref}
        className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        {contacts.map((c, i) => (
          <div
            key={i}
            className="group bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 transition-all duration-500 hover:border-[rgba(139,92,246,0.4)] hover:bg-[rgba(139,92,246,0.06)] hover:-translate-y-1 cursor-default"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
            }}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center mb-4 group-hover:bg-[rgba(139,92,246,0.2)] transition-colors duration-300">
              {c.icon}
            </div>

            <h3 className="text-white font-semibold text-sm mb-2 font-[Sora,sans-serif]">
              {c.title}
            </h3>
            <p className="text-[#6b7280] text-xs leading-relaxed mb-4">
              {c.desc}
            </p>

            {/* Email link */}
            <a
              href={`mailto:${c.email}`}
              className="inline-flex items-center gap-1.5 text-[#8b5cf6] text-xs font-medium hover:text-[#a78bfa] transition-colors duration-200"
            >
              {c.email}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}