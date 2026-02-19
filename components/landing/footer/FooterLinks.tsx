"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

const exploreLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const connectLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername/3d-graph",
    icon: <Github size={20} />
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    icon: <Twitter size={20} />
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: <Linkedin size={20} />
  },
];

export default function FooterLinks() {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-10
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
            mb-6
          "
        >
          Explore
        </h4>

        <ul className="space-y-4">
          {exploreLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="
                  text-white/60
                  hover:text-white
                  transition-colors
                  duration-300
                  flex
                  items-center
                  gap-1
                "
              >
                {link.name}
              </Link>
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
            mb-6
          "
        >
          Connect
        </h4>

        <div className="flex gap-5">
          {connectLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white/60
                hover:text-white
                transition-all
                duration-300
                hover:scale-110
              "
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
