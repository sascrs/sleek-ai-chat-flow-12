
import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export function Logo({ size = 'md', className = '', animate = false }: LogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Logo sizes
  const sizes = {
    sm: { width: 26, height: 26, fontSize: 'text-sm' },
    md: { width: 34, height: 34, fontSize: 'text-sm' },
    lg: { width: 56, height: 56, fontSize: 'text-base' },
  };

  const { width, height, fontSize } = sizes[size];
  
  // Initialize animation state if animate prop is true
  useEffect(() => {
    if (animate) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // Handle hover animation
  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    }
  };

  return (
    <div className={`flex items-center ${className}`} onMouseEnter={startAnimation}>
      <div className="relative">
        {/* Animated background elements */}
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse-soft' : ''} blur-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-80`}></div>
        
        {/* Orbital particles */}
        {isAnimating && (
          <>
            <div className="absolute left-0 top-0 w-2 h-2 bg-indigo-300 rounded-full animate-rotate-orbit" style={{ animationDelay: '0ms' }}></div>
            <div className="absolute left-0 top-0 w-1.5 h-1.5 bg-purple-300 rounded-full animate-rotate-orbit" style={{ animationDelay: '800ms' }}></div>
          </>
        )}
        
        {/* Main logo shape */}
        <div 
          className={`relative bg-gradient-to-br from-premium via-violet-600 to-indigo-700 rounded-full flex items-center justify-center shadow-md ${isAnimating ? 'animate-float' : ''} transition-all duration-300`} 
          style={{ width, height }}
        >
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
            <path d="M6 4v16" className={isAnimating ? 'animate-pulse-soft' : ''} />
            {/* Mathematical elements */}
            <path d="M14 12l4 4" className={isAnimating ? 'animate-pulse-soft' : ''} style={{ animationDelay: '200ms' }} />
            <path d="M14 16l4-4" className={isAnimating ? 'animate-pulse-soft' : ''} style={{ animationDelay: '400ms' }} />
          </svg>
        </div>
      </div>
      
      <div className="ml-2 font-bold flex items-center">
        <span className="bg-gradient-to-r from-premium to-violet-600 bg-clip-text text-transparent font-space-grotesk">PyTha</span>
        <span className="text-primary font-extrabold font-space-grotesk">GO.AI</span>
        {isAnimating && (
          <span className="absolute ml-[6.5rem] mt-[-0.8rem] text-[0.6rem] font-space-grotesk bg-gradient-to-r from-indigo-400 to-premium text-white px-1.5 py-0.5 rounded-full animate-bounce">Pro</span>
        )}
      </div>
    </div>
  );
}
