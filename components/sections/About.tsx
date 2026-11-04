'use client';

import { useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';

const LIME = '#B4FF39';
const OLIVE = '#8FA828';
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const hexClip =
  'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)';

const triangleClip = 'polygon(50% 0%, 0% 100%, 100% 100%)';

const telemetry = [
  { value: '01', label: 'IDENTIDAD' },
  { value: '02', label: 'ESTRATEGIA' },
  { value: '03', label: 'DISEÑO' },
  { value: '04', label: 'DESARROLLO' },
];

const capabilities = [
  {
    index: '01',
    title: 'DISEÑO A MEDIDA',
    detail: 'Cada interfaz nace desde cero.',
  },
  {
    index: '02',
    title: 'SIN PLANTILLAS',
    detail: 'Una identidad propia, no una copia.',
  },
  {
    index: '03',
    title: 'TECNOLOGÍA REAL',
    detail: 'Código pensado para funcionar.',
  },
  {
    index: '04',
    title: 'VISIÓN DE NEGOCIO',
    detail: 'Diseño conectado a objetivos.',
  },
];

const useDeterministicNodes = (count: number) =>
  useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: 4 + ((i * 37) % 92),
        y: 8 + ((i * 53) % 84),
        size: 1 + (i % 3),
        delay: (i % 7) * 0.4,
        duration: 2.5 + (i % 4) * 0.65,
      })),
    [count]
  );

export default function QuienSoy() {
  const [mouseNearPhoto, setMouseNearPhoto] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  const nodes = useDeterministicNodes(24);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const photoY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0, 1, 1, 0]
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const photoRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const photoRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  const handlePhotoMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePhotoLeave = () => {
    setMouseNearPhoto(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="quien-soy"
      className="relative overflow-hidden border-b border-white/5 bg-black px-4 py-28 sm:px-6 sm:py-36"
    >
      {/* =========================================================
          ATMOSPHERE / BACKGROUND SYSTEM
      ========================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Radial atmosphere */}
        <motion.div
          style={{ y: parallaxYSlow, opacity: backgroundOpacity }}
          className="absolute left-1/2 top-[12%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B4FF39]/[0.025] blur-[140px]"
        />

        <motion.div
          style={{ y: parallaxY, opacity: backgroundOpacity }}
          className="absolute bottom-[-10%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#8FA828]/[0.035] blur-[120px]"
        />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,255,57,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,255,57,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(circle at center, black 0%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 0%, transparent 72%)',
          }}
        />

        {/* Fine horizontal scan lines */}
        <div className="absolute inset-0 opacity-[0.025]">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`scan-${i}`}
              className="absolute left-0 h-px w-full bg-[#B4FF39]"
              style={{ top: `${i * 6}%` }}
            />
          ))}
        </div>

        {/* Moving scan */}
        {!reducedMotion && (
          <motion.div
            animate={{ y: ['-10vh', '110vh'] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-[#B4FF39]/20 to-transparent"
          />
        )}

        {/* Floating nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={`node-${index}`}
            className="absolute rounded-full bg-[#B4FF39]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              opacity: 0.2,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.12, 0.45, 0.12],
                    scale: [1, 1.8, 1],
                  }
            }
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Giant geometric triangle */}
        <motion.div
          style={{
            y: parallaxY,
            opacity: backgroundOpacity,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute left-1/2 top-[7%] h-[480px] w-[480px] -translate-x-1/2 sm:h-[620px] sm:w-[620px]"
        >
          {!reducedMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 border border-[#8FA828]/10"
                style={{ clipPath: triangleClip }}
              />
            </motion.div>
          )}

          <div
            className="absolute inset-[14%] border border-[#8FA828]/[0.08]"
            style={{ clipPath: triangleClip }}
          />

          <div
            className="absolute inset-[30%] bg-[#8FA828]/[0.018]"
            style={{ clipPath: triangleClip }}
          />

          {/* Triangle vertex markers */}
          <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#B4FF39]/50 shadow-[0_0_16px_rgba(180,255,57,0.5)]" />
          <div className="absolute bottom-0 left-0 h-1.5 w-1.5 rounded-full bg-[#B4FF39]/30" />
          <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[#B4FF39]/30" />
        </motion.div>

        {/* Vertical energy columns */}
        <motion.div
          style={{ y: parallaxYSlow, opacity: backgroundOpacity }}
          className="absolute bottom-[14%] left-[18%] h-[180px] w-px bg-gradient-to-b from-transparent via-[#B4FF39]/20 to-transparent"
        />

        <motion.div
          style={{ y: parallaxY, opacity: backgroundOpacity }}
          className="absolute bottom-[8%] right-[20%] h-[240px] w-px bg-gradient-to-b from-transparent via-[#B4FF39]/15 to-transparent"
        />

        {/* Coordinates */}
        <div className="absolute left-5 top-24 font-mono text-[8px] tracking-[0.3em] text-white/[0.12]">
          34°36&apos; // 58°22&apos;
        </div>

        <div className="absolute bottom-8 right-5 font-mono text-[8px] tracking-[0.3em] text-white/[0.12]">
          COFIWORK // IDENTITY SYSTEM
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top system header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 flex flex-col gap-5 border-y border-white/[0.07] py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3 font-mono text-[9px] font-bold tracking-[0.25em] text-white/35">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#B4FF39]/30" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#B4FF39]" />
            </span>

            COFIWORK / PERSONAL SYSTEM
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] tracking-[0.2em] text-white/25">
            <span>STATUS: ONLINE</span>
            <span>MODE: CUSTOM</span>
            <span>NODE: NL-01</span>
          </div>
        </motion.div>

        {/* =====================================================
            HERO IDENTITY
        ====================================================== */}

        <div className="mb-20 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          {/* PHOTO */}
          <motion.div
            ref={photoRef}
            style={{
              y: photoY,
              rotate: photoRotate,
              rotateX: photoRotateX,
              rotateY: photoRotateY,
              transformPerspective: 1200,
            }}
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto w-full max-w-[430px] lg:mx-0"
            onMouseEnter={() => setMouseNearPhoto(true)}
            onMouseMove={handlePhotoMove}
            onMouseLeave={handlePhotoLeave}
          >
            {/* Outer HUD frame */}
            <div className="absolute -inset-5">
              <div className="absolute left-0 top-0 h-14 w-14 border-l border-t border-[#B4FF39]/30" />
              <div className="absolute right-0 top-0 h-14 w-14 border-r border-t border-[#B4FF39]/30" />
              <div className="absolute bottom-0 left-0 h-14 w-14 border-b border-l border-[#B4FF39]/30" />
              <div className="absolute bottom-0 right-0 h-14 w-14 border-b border-r border-[#B4FF39]/30" />

              <div className="absolute left-5 top-0 h-px w-16 bg-[#B4FF39]/40" />
              <div className="absolute right-5 bottom-0 h-px w-16 bg-[#B4FF39]/40" />
            </div>

            {/* Rotating technical ring */}
            {!reducedMotion && (
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="pointer-events-none absolute -inset-10"
              >
                <div
                  className="absolute inset-0 border border-[#B4FF39]/[0.07]"
                  style={{ clipPath: hexClip }}
                />
              </motion.div>
            )}

            {/* Photo container */}
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* Glow */}
              <motion.div
                animate={{
                  opacity: mouseNearPhoto ? 0.18 : 0.28,
                  scale: mouseNearPhoto ? 1.08 : 1,
                }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute inset-[8%] rounded-full bg-[#B4FF39]/10 blur-[70px]"
              />

              {/* Image */}
              <Image
                src="/foto2t.png"
                alt="Nicolás Lombardo"
                fill
                priority
                className="relative z-10 object-contain drop-shadow-[0_0_24px_rgba(180,255,57,0.12)]"
                sizes="(max-width: 1024px) 430px, 35vw"
              />

              {/* Bottom atmosphere */}
              <motion.div
                animate={{
                  opacity: mouseNearPhoto ? 0.18 : 0.38,
                  y: mouseNearPhoto ? 8 : 0,
                }}
                transition={{ duration: 0.8, ease: EASE }}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
              />

              {/* Scanline */}
              {!reducedMotion && (
                <motion.div
                  animate={{ y: ['0%', '400%'] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="pointer-events-none absolute left-[10%] right-[10%] top-0 z-30 h-px bg-gradient-to-r from-transparent via-[#B4FF39]/50 to-transparent"
                />
              )}

              {/* Target reticle */}
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: [0.25, 0.55, 0.25],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute right-[16%] top-[23%] z-30 h-8 w-8"
              >
                <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-[#B4FF39]/60" />
                <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-[#B4FF39]/60" />
                <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#B4FF39]/60" />
                <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#B4FF39]/60" />
                <div className="absolute inset-3 rounded-full border border-[#B4FF39]/40" />
              </motion.div>

              {/* Status labels */}
              <div className="absolute left-3 top-3 z-30 font-mono text-[8px] font-bold tracking-[0.25em] text-[#B4FF39]/60">
                SUBJECT // 001
              </div>

              <div className="absolute bottom-3 right-3 z-30 font-mono text-[8px] tracking-[0.2em] text-white/30">
                VISUAL ID
              </div>
            </div>

            {/* Technical metadata */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[8px] tracking-[0.2em] text-white/25">
              <span>NICOLÁS LOMBARDO</span>
              <span>COFIWORK</span>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] font-bold tracking-[0.3em] text-[#B4FF39]/70">
              <span className="h-px w-8 bg-[#B4FF39]/50" />
              QUIÉN ESTÁ DETRÁS
            </div>

            <h2 className="max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-black uppercase leading-[0.84] tracking-[-0.065em] text-white">
              Soy
              <span className="block text-[#B4FF39]">
                Nicolás
              </span>
              <span className="block text-white/20">
                Lombardo.
              </span>
            </h2>

            <div className="mt-8 max-w-2xl">
              <p className="text-xl font-medium leading-relaxed text-white/75 sm:text-2xl">
                No me interesa hacer una web que simplemente se vea bien.
              </p>

              <p className="mt-5 text-base leading-8 text-white/45 sm:text-lg">
                Diseño y desarrollo experiencias digitales pensadas para que
                una marca tenga presencia, personalidad y una razón clara para
                ser elegida. Cada proyecto parte de una idea y termina
                convertido en un sistema digital propio.
              </p>
            </div>

            {/* Telemetry */}
            <div className="mt-10 grid max-w-2xl grid-cols-2 border-y border-white/[0.08] sm:grid-cols-4">
              {telemetry.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: 0.35 + index * 0.08,
                  }}
                  className="border-r border-white/[0.08] px-4 py-4 last:border-r-0"
                >
                  <div className="font-mono text-[9px] tracking-[0.25em] text-[#B4FF39]/50">
                    {item.value}
                  </div>

                  <div className="mt-2 text-[9px] font-bold tracking-[0.16em] text-white/40">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            STATEMENT
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mb-24 overflow-hidden border border-white/[0.08] bg-white/[0.015] px-6 py-10 sm:px-10 sm:py-14"
        >
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '30%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute left-0 top-0 h-px bg-[#B4FF39]"
          />

          {/* Decorative number */}
          <div className="absolute right-5 top-5 font-mono text-[8px] tracking-[0.3em] text-white/10">
            001 / 004
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <div className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#B4FF39]/60">
                PRINCIPIO OPERATIVO
              </div>

              <div className="mt-4 text-sm uppercase tracking-[0.18em] text-white/25">
                Design with purpose.
              </div>
            </div>

            <p className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-white/75 sm:text-3xl lg:text-4xl">
              “Una web no debería explicar solamente quién sos.
              <span className="text-white/25">
                {' '}
                Debería hacer que entiendan por qué elegirte.
              </span>
              ”
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            CAPABILITIES
        ====================================================== */}

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <div className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#B4FF39]/70">
                CORE CAPABILITIES
              </div>

              <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                Cómo trabajo.
              </h3>
            </div>

            <div className="max-w-sm font-mono text-[8px] leading-5 tracking-[0.15em] text-white/25">
              ESTRATEGIA → INTERFAZ → CÓDIGO → EXPERIENCIA
            </div>
          </motion.div>

          <div className="grid border-l border-t border-white/[0.08] sm:grid-cols-2">
            {capabilities.map((item, index) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: index * 0.08,
                }}
                whileHover={{
                  backgroundColor: 'rgba(180,255,57,0.025)',
                }}
                className="group relative min-h-[190px] overflow-hidden border-b border-r border-white/[0.08] p-7 transition-colors duration-500 sm:p-9"
              >
                {/* Hover beam */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[#B4FF39]"
                />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#B4FF39]/50">
                    {item.index}
                  </span>

                  <div className="relative h-4 w-4 opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-[#B4FF39]" />
                    <div className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-[#B4FF39]" />
                    <div className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#B4FF39]" />
                    <div className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#B4FF39]" />
                    <div className="absolute inset-[5px] rounded-full bg-[#B4FF39]" />
                  </div>
                </div>

                <h4 className="mt-12 text-xl font-black tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#B4FF39]">
                  {item.title}
                </h4>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/35">
                  {item.detail}
                </p>

                <div className="absolute bottom-6 right-7 font-mono text-[7px] tracking-[0.3em] text-white/10">
                  SYSTEM / READY
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom system line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-5 font-mono text-[8px] tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>COFIWORK // DIGITAL EXPERIENCE SYSTEM</span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_10px_rgba(180,255,57,0.6)]" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </motion.div>
      </div>
    </section>
  );
}