// hooks/usePageTransition.ts
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return { isTransitioning };
}