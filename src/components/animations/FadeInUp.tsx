'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  y = 40 
}: FadeInUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;
