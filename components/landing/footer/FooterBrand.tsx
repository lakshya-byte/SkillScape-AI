"use client";

import React from "react";

export default function FooterBrand() {
  return (
    <div
      className="
        flex
        flex-col
        items-start
        max-w-sm
      "
    >
      {/* Brand Name */}
      <h3
        className="
          text-white
          text-lg
          md:text-xl
          font-semibold
          tracking-tight
        "
      >
        ValionAI
      </h3>

      {/* Identity Line */}
      <p
        className="
          mt-3
          text-sm
          md:text-base
          text-white/50
          leading-relaxed
        "
      >
        An interactive 3D graph visualization platform designed to
        transform mathematical functions and datasets into immersive,
        real-time visual experiences.
      </p>

      {/* Authority Tag */}
      <span
        className="
          mt-4
          text-xs
          uppercase
          tracking-[0.25em]
          text-white/30
        "
      >
        Real-Time 3D Visualization Engine
      </span>
    </div>
  );
}
