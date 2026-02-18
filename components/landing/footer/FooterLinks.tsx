"use client";

import React from "react";

const exploreLinks = [
  { name: "Home", href: "#home" },
  { name: "3D Graph Viewer", href: "#viewer" },
  { name: "Features", href: "#features" },
  { name: "Documentation", href: "#docs" },
];

const connectLinks = [
  { name: "GitHub Repository", href: "https://github.com/yourusername/3d-graph" },
  { name: "Live Demo", href: "#" },
  { name: "Report Issues", href: "https://github.com/yourusername/3d-graph/issues" },
];

export default function FooterLinks() {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-12
        md:gap-16
        text-sm
      "
    >
      {/* Explore Column */}
      <div>
        <h4
          className="
            text-white/40
            uppercase
            tracking-[0.2em]
            text-xs
            mb-4
          "
        >
          Explore
        </h4>

        <ul className="space-y-3">
          {exploreLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="
                  text-white/60
                  hover:text-white
                  transition-colors
                  duration-300
                "
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect Column */}
      <div>
        <h4
          className="
            text-white/40
            uppercase
            tracking-[0.2em]
            text-xs
            mb-4
          "
        >
          Connect
        </h4>

        <ul className="space-y-3">
          {connectLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white/60
                  hover:text-white
                  transition-colors
                  duration-300
                "
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
