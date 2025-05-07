
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
        {/* Dynamic background glow */}
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse-soft' : ''} blur-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 opacity-80`}></div>
        
        {/* Geometric orbital elements */}
        {isAnimating && (
          <>
            <div className="absolute z-10 w-2 h-2 bg-blue-300 rounded-full animate-rotate-orbit" style={{ animationDelay: '0ms', transformOrigin: 'center', left: width/2, top: height/2 }}></div>
            <div className="absolute z-10 w-1.5 h-1.5 bg-purple-300 rounded-full animate-rotate-orbit-reverse" style={{ animationDelay: '400ms', transformOrigin: 'center', left: width/2, top: height/2 }}></div>
            <div className="absolute z-10 w-1 h-1 bg-indigo-200 rounded-full animate-rotate-orbit" style={{ animationDelay: '800ms', transformOrigin: 'center', left: width/2, top: height/2 }}></div>
          </>
        )}
        
        {/* Main logo shape */}
        <div 
          className={`relative bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg ${isAnimating ? 'animate-float shadow-indigo-500/30' : ''} transition-all duration-300`} 
          style={{ width, height }}
        >
          {/* Mathematical symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg opacity-20">π</div>
          </div>
          
          {/* Geometric logo shape */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-[60%] h-[60%] text-white/90"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Modern P shape with mathematical elements */}
            <path d="M6 4h6a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" fill="rgba(255,255,255,0.15)" />
            <path d="M6 4v16" className={isAnimating ? 'animate-pulse-soft' : ''} />
            <path d="M14 9l3 3" className={isAnimating ? 'animate-pulse-soft' : ''} style={{ animationDelay: '200ms' }} />
            <path d="M14 12l3-3" className={isAnimating ? 'animate-pulse-soft' : ''} style={{ animationDelay: '400ms' }} />
            <circle cx="17.5" cy="17.5" r="1.5" fill="white" className={isAnimating ? 'animate-ping-slow' : ''} opacity="0.8" />
          </svg>
        </div>
        
        {/* Decorative elements */}
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-500 to-indigo-400 rounded-full opacity-90 ${isAnimating ? 'animate-pulse' : ''}`}></div>
      </div>
      
      {/* Updated typography */}
      <div className="ml-2 font-bold flex items-center">
        <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent font-space-grotesk">PyTha</span>
        <span className="text-primary font-extrabold font-space-grotesk">GO.AI</span>
        {isAnimating && (
          <span className="absolute ml-[6.5rem] mt-[-0.8rem] text-[0.6rem] font-space-grotesk bg-gradient-to-r from-indigo-400 to-violet-500 text-white px-1.5 py-0.5 rounded-full animate-pulse-soft">Pro</span>
        )}
      </div>
    </div>
  );
}
