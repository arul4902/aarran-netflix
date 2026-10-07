import React from 'react';

interface AMonogramProps {
  size?: number;
  glow?: boolean;
  className?: string;
  animated?: boolean;
}

export const AMonogram: React.FC<AMonogramProps> = ({
  size = 40,
  glow = true,
  className = '',
  animated = false
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        position: 'relative',
        filter: glow ? 'drop-shadow(0 0 14px rgba(229, 9, 20, 0.75))' : 'none'
      }}
      className={className}
    >
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={(size * 120) / 100}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="monogramRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E27" />
            <stop offset="50%" stopColor="#E50914" />
            <stop offset="100%" stopColor="#990008" />
          </linearGradient>
          <linearGradient id="monogramHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="cinematicShine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow base */}
        <path
          d="M 50 12 L 88 108 L 68 108 L 59 84 L 41 84 L 32 108 L 12 108 Z"
          fill="#5a0004"
          transform="translate(1, 2)"
        />

        {/* Primary Monogram Body */}
        <path
          d="M 50 12 L 88 108 L 68 108 L 59 84 L 41 84 L 32 108 L 12 108 Z"
          fill="url(#monogramRedGrad)"
        />

        {/* Inner Counter / Cutout */}
        <polygon
          points="50,38 37,70 63,70"
          fill="#141414"
        />

        {/* Left Arch Highlight Ribbon */}
        <path
          d="M 50 12 L 12 108 L 26 108 L 50 48 Z"
          fill="url(#monogramHighlight)"
        />

        {/* Center Crossbar Accent */}
        <rect
          x="34"
          y="68"
          width="32"
          height="7"
          rx="1"
          fill="#FF2E36"
        />

        {/* Animated Stroke Overlay */}
        {animated && (
          <path
            d="M 12 108 L 50 12 L 88 108 M 32 72 L 68 72"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset="400"
            style={{
              animation: 'drawRedLine 2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          />
        )}
      </svg>
    </div>
  );
};
