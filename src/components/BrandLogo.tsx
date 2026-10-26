"use client";

import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark" | "vector";
  size?: "sm" | "md" | "lg";
}

/**
 * BrandLogo renders the official Lane & Edwards Violins identity.
 * Built to remain razor-sharp and scalable across all screens and retina displays,
 * adhering to the brand colors #003152 (Blue) and #c2a15a (Gold).
 */
export function BrandLogo({ className = "", variant = "vector", size = "md" }: BrandLogoProps) {
  // Height sizing
  const heightClasses = {
    sm: "h-9 sm:h-11",
    md: "h-11 sm:h-14 md:h-16",
    lg: "h-14 sm:h-18 md:h-20",
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* High-fidelity scalable vector logo that never loses resolution */}
      <svg
        viewBox="0 0 680 140"
        className={`${heightClasses} w-auto max-w-full drop-shadow-xs transition-transform duration-300`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lane & Edwards Violins - Since 2016"
      >
        <defs>
          <linearGradient id="leGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfc88a" />
            <stop offset="50%" stopColor="#c2a15a" />
            <stop offset="100%" stopColor="#9e7f3b" />
          </linearGradient>
          <linearGradient id="leBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003152" />
            <stop offset="100%" stopColor="#001f35" />
          </linearGradient>
        </defs>

        {/* Decorative Framing Filigree */}
        <path
          d="M 28 70 Q 28 20 70 20 L 610 20 Q 652 20 652 70 Q 652 120 610 120 L 70 120 Q 28 120 28 70 Z"
          fill="#FAF7F0"
          stroke="#c2a15a"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <rect
          x="34"
          y="25"
          width="612"
          height="90"
          rx="4"
          fill="none"
          stroke="#003152"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          opacity="0.35"
        />

        {/* Left Flourish Ornament */}
        <g transform="translate(44, 42)" stroke="#c2a15a" strokeWidth="1.2" fill="none">
          <path d="M 16 28 C 4 20, 2 8, 14 2 C 22 -2, 28 8, 22 18 C 18 24, 8 26, 2 28" />
          <circle cx="14" cy="2" r="2" fill="#c2a15a" />
          <circle cx="22" cy="18" r="1.5" fill="#c2a15a" />
          <path d="M 8 15 Q 16 12 18 6" />
        </g>

        {/* Brand Name: Lane & Edwards */}
        <text
          x="340"
          y="68"
          textAnchor="middle"
          fill="#003152"
          style={{
            fontFamily: "var(--font-cormorant), 'Cinzel', 'EB Garamond', Georgia, serif",
            fontSize: "44px",
            fontWeight: "700",
            letterSpacing: "0.06em",
          }}
        >
          <tspan fill="#003152">Lane </tspan>
          <tspan fill="#c2a15a" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: "400" }}>
            &amp;{" "}
          </tspan>
          <tspan fill="#003152">Edwards</tspan>
        </text>

        {/* VIOLINS Banner */}
        <text
          x="340"
          y="93"
          textAnchor="middle"
          fill="#003152"
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel', Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.45em",
          }}
        >
          VIOLINS
        </text>

        {/* Sub-tag: Jeffersontown, KY */}
        <text
          x="340"
          y="110"
          textAnchor="middle"
          fill="#c2a15a"
          style={{
            fontFamily: "var(--font-eb-garamond), Georgia, serif",
            fontSize: "10.5px",
            letterSpacing: "0.22em",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          HISTORIC JEFFERSONTOWN, KY · EST. 2016
        </text>

        {/* Right Flourish Ornament */}
        <g transform="translate(608, 42) scale(-1, 1)" stroke="#c2a15a" strokeWidth="1.2" fill="none">
          <path d="M 16 28 C 4 20, 2 8, 14 2 C 22 -2, 28 8, 22 18 C 18 24, 8 26, 2 28" />
          <circle cx="14" cy="2" r="2" fill="#c2a15a" />
          <circle cx="22" cy="18" r="1.5" fill="#c2a15a" />
          <path d="M 8 15 Q 16 12 18 6" />
        </g>
      </svg>
    </div>
  );
}
