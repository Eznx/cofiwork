'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { jetonEase } from '@/lib/animations';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function TextReveal({ children, delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: jetonEase, delay }}
    >
      {children}
    </motion.div>
  );
}