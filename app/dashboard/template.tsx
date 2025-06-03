// dashboard/template.tsx (Simplified version)
'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface TemplateProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
};

export default function Template({ children }: TemplateProps) {
  useEffect(() => {
    // Add transitioning class to main element
    const mainElement = document.querySelector('main[aria-label="Dashboard content"]') as HTMLElement;
    if (mainElement) {
      mainElement.classList.add('transitioning');
      
      // Remove transitioning class after animation
      const timer = setTimeout(() => {
        mainElement.classList.remove('transitioning');
      }, 400); // Match animation duration

      return () => {
        clearTimeout(timer);
        mainElement.classList.remove('transitioning');
      };
    }
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}