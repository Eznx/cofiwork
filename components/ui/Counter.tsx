'use client';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Props {
  value: number;
  label: string;
}

export default function Counter({ value, label }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = value / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-white">{count}</div>
      <div className="mt-2 text-white/40">{label}</div>
    </div>
  );
}