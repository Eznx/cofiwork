'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { WA_URL } from '@/lib/constants';

export default function Introduction() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);

  const movePortrait = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !portraitRef.current) return;
    const bounds = portraitRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPortrait = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section id="presentacion" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-[#090d10]/75 px-6 py-24 text-[#f2f4ee] backdrop-blur-[2px] sm:px-10 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_52%,rgba(44,143,123,.13),transparent_42%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1"
        >
          <p className="eyebrow">Detrás de cada experiencia</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            Soy Nicolás.
            <span className="mt-2 block text-[#a6f5dd]">Diseño con intención.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Trabajo de forma directa con cada marca para encontrar su voz y convertir una buena idea en una presencia digital que se sienta propia.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-white/40">
            Estrategia, identidad y desarrollo en el mismo proceso. Cada detalle tiene un motivo; cada proyecto, su propio lenguaje.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-4 border-b border-[#a6f5dd]/30 pb-2 text-sm text-[#d8e7df] transition hover:border-[#b4ff39] hover:text-[#b4ff39]">
            Hablemos de tu proyecto <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 24 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto h-[26rem] w-full max-w-[34rem] md:order-2 md:h-[36rem] lg:h-[42rem]"
        >
          <div aria-hidden="true" className="absolute left-1/2 top-[48%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#47c9a3]/10 blur-[70px] sm:h-[28rem] sm:w-[28rem]" />
          <motion.div aria-hidden="true" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 58, repeat: Infinity, ease: 'linear' }} className="absolute left-1/2 top-[48%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a6f5dd]/15 sm:h-[27rem] sm:w-[27rem]">
            <span className="absolute left-[13%] top-[16%] h-2 w-2 rounded-full bg-[#b4ff39] shadow-[0_0_18px_#b4ff39]" />
            <span className="absolute bottom-[17%] right-[11%] h-1.5 w-1.5 rounded-full bg-[#a6f5dd] shadow-[0_0_15px_#a6f5dd]" />
          </motion.div>
          <motion.div aria-hidden="true" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 76, repeat: Infinity, ease: 'linear' }} className="absolute left-1/2 top-[48%] h-[19rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] rounded-[50%] border border-[#aa9dff]/20 sm:h-[23rem] sm:w-[31rem]" />
          <div
            ref={portraitRef}
            onPointerMove={movePortrait}
            onPointerLeave={resetPortrait}
            className="absolute inset-x-0 bottom-0 top-2 z-10 [perspective:1000px]"
          >
            <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
              <Image src="/foto2t.png" alt="Nicolás Lombardo, fundador de COFIWORK" fill sizes="(max-width: 768px) 90vw, 42vw" className="object-contain object-bottom drop-shadow-[0_0_32px_rgba(166,245,221,.12)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[14%] bottom-0 h-1/3 bg-gradient-to-t from-[#090d10] via-[#090d10]/30 to-transparent" />
            </motion.div>
          </div>
          <p className="absolute bottom-4 left-0 z-20 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">Nicolás Lombardo <span className="mx-2 text-[#b4ff39]/70">·</span> Dirección digital</p>
        </motion.div>
      </div>
    </section>
  );
}
