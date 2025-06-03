// components/AnimatedSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '',
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced stats card component
export function AnimatedStatsCard({ 
  title, 
  value, 
  index = 0 
}: { 
  title: string; 
  value: string | number; 
  index?: number;
}) {
  return (
    <motion.div
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 shadow-lg"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.2 + index * 0.1,
        ease: "easeOut"
      }}

    >
      <motion.h3 
        className="text-md font-outfit font-medium text-fuchsia-950 mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-2xl font-bold text-purple-800"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}

      >
        {value}
      </motion.p>
    </motion.div>
  );
}