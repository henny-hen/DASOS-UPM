'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Subject } from '@/types';

interface SubjectCardProps {
  subject: Subject;
  index?: number; // For staggered animations
}

export default function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1, // Stagger animation
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group"
    >
      <Link href={`/dashboard/subjectdata/${subject.subject_code}`}>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg  hover:bg-opacity-20 transition-all duration-300 h-full cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-bold font-outfit text-fuchsia-950 mb-2 group-hover:text-purple-900 transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {subject.subject_name}
              </motion.h3>
              <motion.p 
                className="text-sm text-purple-700 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {subject.subject_code}
              </motion.p>
            </div>
            
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="text-sm text-purple-900 mb-1">{subject.credits} créditos</div>
              <div className="text-xs text-purple-800">{subject.semester} sem.</div>
            </motion.div>
          </div>
          

          
          <motion.div 
            className="mt-4 pt-4 border-t border-purple-300 border-opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div className="flex justify-between items-center text-xs text-purple-800">
              <span>{subject.academic_year}</span>
              <motion.span 
                className="group-hover:text-purple-800 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Ver detalles →
              </motion.span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}