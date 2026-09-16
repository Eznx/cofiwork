'use client';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function MagneticButton({ children, href, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold uppercase text-white hover:bg-white hover:text-black transition-colors ${className}`}
    >
      {children}
    </motion.a>
  );
}