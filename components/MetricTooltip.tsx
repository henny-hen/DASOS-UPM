"use client";
import React, { useState, useRef, useEffect } from 'react';

interface MetricTooltipProps {
  title: string;
  description: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function MetricTooltip({ 
  title, 
  description, 
  children, 
  position = 'top' 
}: MetricTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle showing tooltip
  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  // Handle hiding tooltip with delay for hover
  const hideTooltip = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 150); // Small delay to prevent flickering
    }
  };

  // Handle click for mobile
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsVisible(!isVisible);
    }
  };

  // Handle click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isMobile && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible, isMobile]);

  // Position classes based on tooltip position
  const getPositionClasses = () => {
    const baseClasses = "absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 max-w-xs";
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  };

  // Arrow classes based on position
  const getArrowClasses = () => {
    const baseArrow = "absolute w-0 h-0";
    
    switch (position) {
      case 'top':
        return `${baseArrow} top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900`;
      case 'bottom':
        return `${baseArrow} bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900`;
      case 'left':
        return `${baseArrow} left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900`;
      case 'right':
        return `${baseArrow} right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900`;
      default:
        return `${baseArrow} top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900`;
    }
  };

  return (
    <div 
      className="relative inline-block"
      ref={tooltipRef}
      onMouseEnter={!isMobile ? showTooltip : undefined}
      onMouseLeave={!isMobile ? hideTooltip : undefined}
      onClick={handleClick}
    >
      {/* Trigger element */}
      <div className={`cursor-help ${isMobile ? 'select-none' : ''} flex items-center gap-1`}>
        {children}
        {/* Info icon */}
        <svg 
          className="w-4 h-4 text-purple-600 hover:text-purple-800 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>

      {/* Tooltip <div className="font-semibold text-white mb-1">{title}</div> */}
      {isVisible && (
        <div className={getPositionClasses()}>
          
          <div className="text-gray-200 text-xs leading-[1.5]">{description}</div>
          
          {/* Arrow */}
          <div className={getArrowClasses()}></div>
        </div>
      )}
    </div>
  );
}