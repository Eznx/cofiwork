'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { jetonEase } from '@/lib/animations';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function ScaleOnScroll({ children, delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: jetonEase, delay }}
    >
      {children}
    </motion.div>
  );
}