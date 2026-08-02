import React from 'react';

interface ArcLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const ArcLogo: React.FC<ArcLogoProps> = ({ size = 'md', animated = true, className = '' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer ambient glow */}
      {animated && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F7931A] to-[#FFD166] opacity-40 blur-md animate-pulse-slow" />
      )}
      
      {/* Geometric SVG Arc Logo */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_12px_rgba(247,147,26,0.5)]"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7931A" />
            <stop offset="50%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD166" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer glowing arc curve */}
        <path
          d="M 15 75 A 40 40 0 0 1 85 75"
          stroke="url(#arcGrad)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Inner high-contrast bridge arc */}
        <path
          d="M 30 75 A 25 25 0 0 1 70 75"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Central Intelligence Pulse Node */}
        <circle cx="50" cy="35" r="7" fill="url(#arcGrad)" />
        <circle cx="50" cy="35" r="12" stroke="#F7931A" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    </div>
  );
};
