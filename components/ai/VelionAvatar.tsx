"use client";

import React from "react";

export type AvatarState = "idle" | "listening" | "thinking" | "speaking";

interface VelionAvatarProps {
  state: AvatarState;
  size?: number;
}

const glowColors: Record<AvatarState, string> = {
  idle: "rgba(139, 92, 246, 0.4)",
  listening: "rgba(59, 130, 246, 0.5)",
  thinking: "rgba(245, 158, 11, 0.5)",
  speaking: "rgba(16, 185, 129, 0.5)",
};

const ringColors: Record<AvatarState, string> = {
  idle: "#8B5CF6",
  listening: "#3B82F6",
  thinking: "#F59E0B",
  speaking: "#10B981",
};

export default function VelionAvatar({ state, size = 48 }: VelionAvatarProps) {
  const glow = glowColors[state];
  const ring = ringColors[state];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer Glow */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          boxShadow: `0 0 ${state === "thinking" ? 20 : 12}px ${glow}`,
        }}
      />

      {/* Spinning Ring (thinking state) */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          animation:
            state === "thinking" ? "spin 1.5s linear infinite" : "none",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={ring}
          strokeWidth="2"
          strokeDasharray={state === "thinking" ? "60 220" : "290 0"}
          strokeLinecap="round"
          className="transition-all duration-500"
          opacity={0.6}
        />
      </svg>

      {/* Avatar Body */}
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 80 80"
        fill="none"
        className="relative z-10"
        style={{
          animation:
            state === "idle" ? "float 3s ease-in-out infinite" : "none",
          transform: state === "listening" ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Head */}
        <rect
          x="15"
          y="10"
          width="50"
          height="45"
          rx="14"
          fill="#1A1A2E"
          stroke={ring}
          strokeWidth="1.5"
          className="transition-all duration-500"
        />

        {/* Left Eye */}
        <ellipse
          cx="30"
          cy="30"
          rx="5"
          ry={state === "thinking" ? 1.5 : 5}
          fill={ring}
          className="transition-all duration-300"
        >
          {state === "thinking" && (
            <animate
              attributeName="ry"
              values="5;1.5;5"
              dur="1.2s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>

        {/* Right Eye */}
        <ellipse
          cx="50"
          cy="30"
          rx="5"
          ry={state === "thinking" ? 1.5 : 5}
          fill={ring}
          className="transition-all duration-300"
        >
          {state === "thinking" && (
            <animate
              attributeName="ry"
              values="5;1.5;5"
              dur="1.2s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>

        {/* Mouth */}
        {state === "speaking" ? (
          <ellipse cx="40" cy="44" rx="8" ry="4" fill={ring} opacity="0.8">
            <animate
              attributeName="ry"
              values="3;6;3"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </ellipse>
        ) : (
          <path
            d="M 30 44 Q 40 50 50 44"
            stroke={ring}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        )}

        {/* Antenna */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="2"
          stroke={ring}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="1" r="2.5" fill={ring} opacity="0.8">
          {state !== "idle" && (
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Body */}
        <rect
          x="22"
          y="57"
          width="36"
          height="16"
          rx="8"
          fill="#1A1A2E"
          stroke={ring}
          strokeWidth="1"
          className="transition-all duration-500"
        />

        {/* Body dot */}
        <circle cx="40" cy="65" r="3" fill={ring} opacity="0.6" />
      </svg>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
