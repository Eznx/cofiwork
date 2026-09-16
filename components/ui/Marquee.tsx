'use client';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  speed?: number;
}

export default function Marquee({ children, speed = 30 }: Props) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="inline-block"
      >
        {children}{children}
      </motion.div>
    </div>
  );
}