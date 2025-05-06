
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  // Logo sizes
  const sizes = {
    sm: { width: 24, height: 24, fontSize: 'text-xs' },
    md: { width: 32, height: 32, fontSize: 'text-sm' },
    lg: { width: 48, height: 48, fontSize: 'text-base' },
  };

  const { width, height, fontSize } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600 rounded-full blur-sm opacity-70"></div>
        <div className="relative bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg" style={{ width, height }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-[60%] h-[60%] text-white"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Stylized "P" with mathematical symbol elements */}
            <path d="M6 4h6a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6z" fill="rgba(255,255,255,0.2)" />
            <path d="M6 4v16" />
            {/* Mathematical elements */}
            <path d="M14 12l4 4" />
            <path d="M14 16l4-4" />
          </svg>
        </div>
      </div>
      <div className="ml-2 font-bold flex items-center">
        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">PyTha</span>
        <span className="text-primary font-extrabold">GO.AI</span>
      </div>
    </div>
  );
}
