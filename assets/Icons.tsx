'use client';

import React from 'react';

// 1. The Radar Icon - 120x120 (Matches the Welcome Screen)
// Usage: className="animate-spin-slow" for the rotation effect
export const RadarIcon = ({ className = "" }: { className?: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Concentric Rings */}
    <circle cx="60" cy="60" r="59.5" stroke="#7C3AED" strokeOpacity="0.2" />
    <circle cx="60" cy="60" r="45.5" stroke="#7C3AED" strokeOpacity="0.4" />
    <circle cx="60" cy="60" r="30.5" stroke="#7C3AED" strokeOpacity="0.6" />
    
    {/* Center Core */}
    <circle cx="60" cy="60" r="15" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" />
    <circle cx="60" cy="60" r="4" fill="white" />
    
    {/* The Scanning Line Gradient */}
    <rect x="59" y="0" width="2" height="60" fill="url(#scan-gradient)" />
    
    <defs>
      <linearGradient id="scan-gradient" x1="60" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED" stopOpacity="0" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. The Fingerprint Icon - 24x24 (Matches the Button)
export const FingerprintIcon = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6" />
    <path d="M5 15.1A2 2 0 0 1 5 11a7 7 0 0 1 14 0 2 2 0 0 1-.5 2.5" />
    <path d="M8 17.6a9 9 0 0 1 0-7.1 5 5 0 0 1 8 0" />
    <path d="M12 19a2 2 0 0 0 1.5-3.5 1 1 0 0 0-3 0" />
    <path d="M12 12v.01" />
  </svg>
);

// 3. The Terminal/System Icon - 24x24 (Matches the Status Bar)
export const TerminalIcon = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

// 4. The Check Icon - (Used for validation steps)
export const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);