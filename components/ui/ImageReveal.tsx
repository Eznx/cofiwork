'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { jetonEase } from '@/lib/animations';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageReveal({ src, alt, className = "" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: jetonEase }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-auto object-cover ${className}`}
        initial={{ scale: 1.15 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: jetonEase }}
      />
    </motion.div>
  );
}