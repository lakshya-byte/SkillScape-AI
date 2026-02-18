"use client"

import { useEffect, useRef, useState } from "react";

const subjects = [
  "Technical Inquiry",
  "General Question",
  "Partnerships",
  "Technical Support",
  "Career Opportunities",
  "Other",
];

export default function NewForm() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "Technical Inquiry",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setFormData({ fullName: "", email: "", subject: "Technical Inquiry", message: "" });
  };

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#4b5563] outline-none transition-all duration-200 focus:border-[rgba(139,92,246,0.5)] focus:bg-[rgba(139,92,246,0.05)] focus:ring-0";

  return (
    <section className="relative bg-[#0a0a0f] px-6 pb-6">
      <div
        ref={ref}
        className="max-w-2xl mx-auto transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)" }}
      >
        <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row: Full Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#9ca3af] text-xs font-medium tracking-wide">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#9ca3af] text-xs font-medium tracking-wide">Email Address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#9ca3af] text-xs font-medium tracking-wide">Subject</label>
              <div className="relative">
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-[#1a0a2e] text-white">
                      {s}
                    </option>
                  ))}
                </select>
                {/* Chevron */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#9ca3af] text-xs font-medium tracking-wide">Message</label>
              <textarea
                placeholder="Tell us how we can help you..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending || sent}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide transition-all duration-300 relative overflow-hidden group"
              style={{
                background: sent
                  ? "linear-gradient(135deg, #059669, #10b981)"
                  : "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                boxShadow: "0 4px 24px rgba(139,92,246,0.25)",
              }}
              onMouseEnter={e => {
                if (!sending && !sent) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(139,92,246,0.45)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(139,92,246,0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Sending...
                </span>
              ) : sent ? (
                <span className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Message Sent!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}