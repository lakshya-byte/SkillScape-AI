"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function JoinCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // --- MAGNETIC BUTTON LOGIC ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonWrapperRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonWrapperRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.35; // Strength of pull
    const y = (clientY - (top + height / 2)) * 0.35;

    gsap.to(buttonWrapperRef.current, {
      x: x,
      y: y,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonWrapperRef.current) return;
    gsap.to(buttonWrapperRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  // --- SCROLL ANIMATIONS ---
  useGSAP(() => {
    const ctx = gsap.context(() => {
      
      // 1. Background Atmosphere Pulse
      gsap.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom center",
            scrub: 1.5,
          },
        }
      );

      // 2. Headline: Split Reveal (Simulated) + Slide Up
      gsap.fromTo(headlineRef.current,
        { y: 80, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      // 3. Subtext: Lagged Reveal
      gsap.fromTo(subRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );

      // 4. Button: Scale & Elastic Entrance
      gsap.fromTo(buttonWrapperRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          delay: 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-32"
    >
      {/* --- ATMOSPHERE --- */}
      
      {/* 1. The Deep Void Glow */}
      <div
        ref={glowRef}
        className="absolute w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />
      
      {/* 2. Starfield / Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />


      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">

        {/* HEADLINE */}
        <h2
          ref={headlineRef}
          className="
            text-5xl md:text-7xl lg:text-8xl 
            font-bold tracking-tighter leading-[1.1]
            text-transparent bg-clip-text 
            bg-gradient-to-b from-white via-white to-white/40
            drop-shadow-2xl
          "
        >
Visualize Your Skills <br />
<span className="text-white">Like Never Before</span>
        </h2>

        {/* SUBTEXT */}
        <p
          ref={subRef}
          className="mt-8 text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
        >
Transform your GitHub and projects into a living intelligence graph. <br className="hidden md:block"/>
Explore your technical brain and unlock your future with AI.
        </p>

        {/* --- GOD-TIER BUTTON --- */}
        {/* Wrapper handles the Magnetic Movement */}
        <div 
          ref={buttonWrapperRef}
          className="mt-12 relative group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* A. The Glow Reflection (Underneath) */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

          {/* B. The Button Container */}
          <button className="relative block">
            
            {/* 1. Orbiting Border Container (1px Padding) */}
            <div className="relative rounded-full p-[1px] overflow-hidden bg-zinc-800 transition-transform duration-300 active:scale-95">
              
              {/* The Spinner (Conic Gradient) */}
              <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#3b82f6_100%)] opacity-100" />
              
              {/* 2. The Button Surface (The Mask) */}
              <div className="
                relative 
                px-10 py-5 
                bg-black/90 backdrop-blur-xl 
                rounded-full 
                flex items-center gap-3
                transition-all duration-300
                group-hover:bg-black/80
              ">
                
                {/* Text */}
                <span className="text-lg font-medium text-white tracking-wide">
Connect GitHub
                </span>

                {/* Arrow Icon with Slide Animation */}
                <svg 
                  className="w-5 h-5 text-blue-400 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

                {/* Inner Shine (Sheen effect) */}
                <div className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all" />
                
                {/* Top Reflection */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
              </div>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}