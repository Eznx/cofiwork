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

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   CONTENT
============================================================ */

const principles = [
  {
    index: '01',
    title: 'NO DISEÑO PARA RELLENAR',
    detail:
      'Si una decisión no mejora cómo se percibe una marca, no tiene por qué estar ahí.',
  },
  {
    index: '02',
    title: 'LA PERSONALIDAD IMPORTA',
    detail:
      'Una interfaz puede ser impecable y aun así no decir absolutamente nada. Busco que tenga una voz propia.',
  },
  {
    index: '03',
    title: 'MENOS PLANTILLA. MÁS CRITERIO.',
    detail:
      'No parto de una estructura para después vestirla. Primero entiendo qué tiene que provocar la experiencia.',
  },
  {
    index: '04',
    title: 'EL CÓDIGO TAMBIÉN DISEÑA',
    detail:
      'Movimiento, velocidad, interacción y detalle forman parte del lenguaje visual, no son el último paso.',
  },
];

const capabilities = [
  {
    index: '01',
    title: 'DIRECCIÓN DIGITAL',
    detail:
      'Convierto una idea abstracta en una dirección visual clara, reconocible y difícil de confundir con otra.',
  },
  {
    index: '02',
    title: 'EXPERIENCIAS WEB',
    detail:
      'Diseño interfaces donde tipografía, imagen, espacio y movimiento trabajan como una misma pieza.',
  },
  {
    index: '03',
    title: 'FRONTEND',
    detail:
      'Construyo la experiencia real. No entrego solamente una maqueta de cómo debería sentirse.',
  },
  {
    index: '04',
    title: 'INTERACCIÓN',
    detail:
      'Cada movimiento tiene una intención: guiar, sorprender, enfatizar o simplemente hacer que algo se sienta mejor.',
  },
];

/* ============================================================
   UTILS
============================================================ */

const useParticles = (count: number) =>
  useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: 2 + ((i * 43) % 96),
        y: 4 + ((i * 67) % 94),
        size: i % 4 === 0 ? 2 : 1,
        duration: 3.5 + (i % 6) * 0.7,
        delay: (i % 9) * 0.35,
      })),
    [count]
  );

/* ============================================================
   COMPONENT
============================================================ */

export default function QuienSoy() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  const [photoHover, setPhotoHover] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const particles = useParticles(34);

  /* ==========================================================
     SCROLL
  ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const heroTitleY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.52],
    [180, 0, -180]
  );

  const heroTitleScale = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58],
    [0.75, 1, 1.15]
  );

  const heroTitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35],
    [0, 1, 1]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 1],
    [220, 30, -90, -260]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.78, 1, 1.06, 1.18]
  );

  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [7, 0, -2, -7]
  );

  const giantTextX = useTransform(
    scrollYProgress,
    [0, 1],
    ['7%', '-22%']
  );

  const giantTextX2 = useTransform(
    scrollYProgress,
    [0, 1],
    ['-25%', '8%']
  );

  const portalScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0.5, 1, 1.25, 1.5]
  );

  const statementY = useTransform(
    scrollYProgress,
    [0.35, 0.58, 0.82],
    [120, 0, -100]
  );

  const capabilitiesY = useTransform(
    scrollYProgress,
    [0.55, 1],
    [150, -120]
  );

  /* ==========================================================
     CURSOR
  ========================================================== */

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothCursorX = useSpring(cursorX, {
    stiffness: 70,
    damping: 22,
    mass: 0.65,
  });

  const smoothCursorY = useSpring(cursorY, {
    stiffness: 70,
    damping: 22,
    mass: 0.65,
  });

  const cursorRingX = useSpring(cursorX, {
    stiffness: 35,
    damping: 18,
    mass: 0.8,
  });

  const cursorRingY = useSpring(cursorY, {
    stiffness: 35,
    damping: 18,
    mass: 0.8,
  });

  const handlePointerMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (reducedMotion) return;

    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  };

  /* ==========================================================
     PHOTO TILT
  ========================================================== */

  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);

  const smoothPhotoX = useSpring(photoX, {
    stiffness: 120,
    damping: 20,
    mass: 0.45,
  });

  const smoothPhotoY = useSpring(photoY, {
    stiffness: 120,
    damping: 20,
    mass: 0.45,
  });

  const rotateX = useTransform(
    smoothPhotoY,
    [-0.5, 0.5],
    [6, -6]
  );

  const rotateY = useTransform(
    smoothPhotoX,
    [-0.5, 0.5],
    [-8, 8]
  );

  const photoLightX = useTransform(
    smoothPhotoX,
    [-0.5, 0.5],
    ['15%', '85%']
  );

  const photoLightY = useTransform(
    smoothPhotoY,
    [-0.5, 0.5],
    ['15%', '85%']
  );

  const handlePhotoMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    photoX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    photoY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  };

  const resetPhoto = () => {
    setPhotoHover(false);
    photoX.set(0);
    photoY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      id="quien-soy"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* ======================================================
          CURSOR
      ======================================================= */}

      {!reducedMotion && (
        <>
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-2.5 w-2.5 rounded-full bg-white mix-blend-difference md:block"
            style={{
              x: smoothCursorX,
              y: smoothCursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />

          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[199] hidden h-20 w-20 rounded-full border border-white/20 md:block"
            style={{
              x: cursorRingX,
              y: cursorRingY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />

          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] rounded-full md:block"
            style={{
              x: smoothCursorX,
              y: smoothCursorY,
              translateX: '-50%',
              translateY: '-50%',
              background: `radial-gradient(circle, ${LIME}0a 0%, transparent 65%)`,
            }}
          />
        </>
      )}

      {/* ======================================================
          AMBIENT WORLD
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        <motion.div
          style={{ y: heroTitleY }}
          className="absolute left-[-20vw] top-[15vh] h-[65vw] w-[65vw] rounded-full"
        >
          <div
            className="h-full w-full rounded-full blur-[150px]"
            style={{
              background: `radial-gradient(circle, ${LIME}14, transparent 68%)`,
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="absolute right-[-30vw] top-[55vh] h-[70vw] w-[70vw] rounded-full"
        >
          <div
            className="h-full w-full rounded-full blur-[170px]"
            style={{
              background: `radial-gradient(circle, ${LIME}0b, transparent 68%)`,
            }}
          />
        </motion.div>

        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.03, 0.45, 0.03],
                    scale: [0.8, 1.8, 0.8],
                    y: [0, -18, 0],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ======================================================
          HEADER
      ======================================================= */}

      <header className="relative z-30 mx-auto flex max-w-[1900px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <motion.span
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: LIME }}
          />

          <span className="text-[9px] uppercase tracking-[0.4em] text-white/45">
            Sobre mí
          </span>
        </div>

        <div className="text-[9px] uppercase tracking-[0.4em] text-white/25">
          NL / 2026
        </div>
      </header>

      {/* ======================================================
          HERO
      ======================================================= */}

      <div className="relative z-10 min-h-[145vh]">
        {/* ----------------------------------------------------
            GIANT MOVING TYPOGRAPHY
        ----------------------------------------------------- */}

        <motion.div
          style={{
            x: giantTextX,
            y: heroTitleY,
          }}
          className="pointer-events-none absolute left-0 top-[18vh] z-[2] whitespace-nowrap"
        >
          <span className="text-[23vw] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.035]">
            NICOLÁS — NICOLÁS — NICOLÁS
          </span>
        </motion.div>

        <motion.div
          style={{
            x: giantTextX2,
            y: useTransform(
              scrollYProgress,
              [0, 1],
              [-120, 150]
            ),
          }}
          className="pointer-events-none absolute left-0 top-[42vh] z-[2] whitespace-nowrap"
        >
          <span
            className="text-[18vw] font-black uppercase leading-none tracking-[-0.09em]"
            style={{ color: `${LIME}09` }}
          >
            LOMBARDO — LOMBARDO
          </span>
        </motion.div>

        {/* ----------------------------------------------------
            TITLE
        ----------------------------------------------------- */}

        <motion.div
          style={{
            y: heroTitleY,
            scale: heroTitleScale,
            opacity: heroTitleOpacity,
          }}
          className="relative z-20 mx-auto max-w-[1900px] px-5 pt-[12vh] sm:px-8 lg:px-12"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={
                reducedMotion
                  ? undefined
                  : { y: '120%' }
              }
              animate={
                reducedMotion
                  ? undefined
                  : { y: 0 }
              }
              transition={{
                duration: 1.1,
                ease: EASE,
              }}
              className="text-[20vw] font-black uppercase leading-[0.72] tracking-[-0.095em] sm:text-[17vw] lg:text-[15vw]"
            >
              Soy
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={
                reducedMotion
                  ? undefined
                  : { y: '120%' }
              }
              animate={
                reducedMotion
                  ? undefined
                  : { y: 0 }
              }
              transition={{
                duration: 1.15,
                delay: 0.08,
                ease: EASE,
              }}
              className="text-[20vw] font-black uppercase leading-[0.72] tracking-[-0.095em] sm:text-[17vw] lg:text-[15vw]"
            >
              Nicolás
            </motion.div>
          </div>

          <div className="relative flex items-end justify-between">
            <div className="overflow-hidden">
              <motion.div
                initial={
                  reducedMotion
                    ? undefined
                    : { y: '120%' }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : { y: 0 }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.16,
                  ease: EASE,
                }}
                className="text-[20vw] font-black uppercase leading-[0.72] tracking-[-0.095em] sm:text-[17vw] lg:text-[15vw]"
              >
                Lombardo
                <span style={{ color: LIME }}>.</span>
              </motion.div>
            </div>

            <motion.div
              initial={
                reducedMotion
                  ? undefined
                  : { opacity: 0, x: 30 }
              }
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: 1, x: 0 }
              }
              transition={{
                duration: 1,
                delay: 0.9,
                ease: EASE,
              }}
              className="mb-2 hidden max-w-[180px] pb-3 text-right text-[8px] uppercase leading-[1.8] tracking-[0.3em] text-white/30 lg:block"
            >
              Diseñador digital
              <br />
              Frontend
              <br />
              Dirección
              <br />
              Interacción
            </motion.div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------
            PORTAL
        ----------------------------------------------------- */}

        <div className="absolute left-1/2 top-[67vh] z-30 flex -translate-x-1/2 -translate-y-1/2 justify-center">
          <motion.div
            style={{ scale: portalScale }}
            className="absolute h-[72vw] w-[42vw] max-h-[880px] max-w-[510px] rounded-[50%] border border-white/[0.05]"
          />

          <motion.div
            style={{
              scale: useTransform(
                portalScale,
                [0.5, 1.5],
                [0.85, 1.2]
              ),
            }}
            className="absolute h-[65vw] w-[36vw] max-h-[780px] max-w-[440px] rounded-[50%] border border-white/[0.08]"
          />

          <motion.div
            style={{
              scale: useTransform(
                portalScale,
                [0.5, 1.5],
                [0.75, 1.1]
              ),
            }}
            className="absolute h-[58vw] w-[31vw] max-h-[680px] max-w-[380px] rounded-[50%]"
          >
            <div
              className="absolute inset-0 rounded-[50%] blur-[100px]"
              style={{
                background: `radial-gradient(circle, ${LIME}1b, transparent 68%)`,
              }}
            />
          </motion.div>

          {/* ------------------------------------------------
              PHOTO
          ------------------------------------------------- */}

          <motion.div
            ref={photoRef}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={resetPhoto}
            onMouseMove={handlePhotoMove}
            style={{
              y: imageY,
              scale: imageScale,
              rotate: imageRotate,
              rotateX,
              rotateY,
              transformPerspective: 1300,
            }}
            className="group relative h-[68vh] min-h-[510px] w-[min(76vw,480px)] cursor-none overflow-hidden border border-white/10 bg-neutral-950"
          >
            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : {
                      scale: photoHover ? 1.06 : 1,
                    }
              }
              transition={{
                duration: 1.1,
                ease: EASE,
              }}
              className="absolute inset-0"
            >
              <Image
                src="/foto2t.png"
                alt="Nicolás Lombardo"
                fill
                priority
                sizes="(max-width: 768px) 76vw, 480px"
                className="object-cover object-center"
              />
            </motion.div>

            {/* dynamic light */}

            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: useTransform(
                  [photoLightX, photoLightY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${x} ${y}, ${LIME}26 0%, transparent 36%)`
                ),
                opacity: photoHover ? 1 : 0,
              }}
            />

            {/* film */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/20" />

            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,.35) 4px)',
              }}
            />

            {/* frame */}

            <div className="absolute inset-5 border border-white/10" />

            <div
              className="absolute left-8 top-8 h-4 w-4 border-l border-t"
              style={{ borderColor: LIME }}
            />

            <div
              className="absolute bottom-8 right-8 h-4 w-4 border-b border-r"
              style={{ borderColor: LIME }}
            />

            {/* metadata */}

            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
              <div>
                <span className="block text-[7px] uppercase tracking-[0.4em] text-white/35">
                  Portrait / 001
                </span>

                <span className="mt-2 block text-[9px] uppercase tracking-[0.25em] text-white">
                  Nicolás Lombardo
                </span>
              </div>

              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scale: photoHover
                          ? [1, 1.7, 1]
                          : 1,
                      }
                }
                transition={{
                  duration: 1,
                  repeat: photoHover ? Infinity : 0,
                }}
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: LIME,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ----------------------------------------------------
            VERTICAL META
        ----------------------------------------------------- */}

        <div className="absolute bottom-[10vh] left-5 z-30 sm:left-8 lg:left-12">
          <div className="flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{ backgroundColor: LIME }}
            />

            <span className="text-[8px] uppercase tracking-[0.35em] text-white/30">
              Scroll to enter
            </span>
          </div>
        </div>

        <div className="absolute bottom-[10vh] right-5 z-30 sm:right-8 lg:right-12">
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, 10, 0],
                    opacity: [0.3, 1, 0.3],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-10 w-px"
            style={{ backgroundColor: LIME }}
          />
        </div>
      </div>

      {/* ======================================================
          MARQUEE
      ======================================================= */}

      <div className="relative z-20 overflow-hidden border-y border-white/10 py-5">
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ['0%', '-50%'],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex w-max whitespace-nowrap"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-8 pr-8"
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-8"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Diseño con intención
                  </span>

                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: LIME,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ======================================================
          INTRO
      ======================================================= */}

      <section className="relative z-20 px-5 py-40 sm:px-8 sm:py-56 lg:px-12">
        <motion.div
          style={{ y: statementY }}
          className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[0.45fr_1fr]"
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              01 / Manifiesto
            </span>

            <div className="mt-10 text-[9px] uppercase leading-[1.8] tracking-[0.3em] text-white/20">
              No hago interfaces
              <br />
              para llenar pantallas.
            </div>
          </div>

          <div>
            <h2 className="max-w-[1200px] text-[8vw] font-black uppercase leading-[0.86] tracking-[-0.075em] sm:text-[6.5vw]">
              No me interesa
              <br />
              hacer una web
              <br />
              que solamente
              <span className="text-white/20"> se vea bien.</span>
            </h2>

            <div className="mt-16 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
              <p className="max-w-lg text-sm leading-7 text-white/45 sm:text-base">
                Me interesa construir algo que tenga una razón para
                existir. Una experiencia que haga que alguien entienda
                una marca antes de que termine de leerla.
              </p>

              <p className="max-w-lg text-sm leading-7 text-white/30 sm:text-base">
                La diferencia suele estar en lo que no aparece en un
                brief: criterio, ritmo, personalidad, detalle y una
                obsesión bastante poco práctica por cómo se siente
                cada cosa.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          STATEMENT
      ======================================================= */}

      <section className="relative z-20 min-h-[100vh] overflow-hidden px-5 py-40 sm:px-8 sm:py-56 lg:px-12">
        <motion.div
          style={{
            x: giantTextX2,
            y: useTransform(
              scrollYProgress,
              [0.3, 0.75],
              [180, -180]
            ),
          }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <span className="text-[28vw] font-black uppercase leading-none tracking-[-0.1em] text-white/[0.025]">
            PRESENCIA
          </span>
        </motion.div>

        <div className="relative mx-auto max-w-[1800px]">
          <div className="mb-16 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              02 / Idea
            </span>

            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
              Brand × Interface × Motion
            </span>
          </div>

          <motion.h2
            initial={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 100,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.1,
              ease: EASE,
            }}
            className="max-w-[1450px] text-[10vw] font-black uppercase leading-[0.8] tracking-[-0.08em]"
          >
            Una web no debería
            <br />
            explicar solamente
            <br />
            <span className="text-white/20">quién sos.</span>
            <br />
            Debería hacer que
            <br />
            entiendan{' '}
            <span style={{ color: LIME }}>
              por qué elegirte.
            </span>
          </motion.h2>
        </div>
      </section>

      {/* ======================================================
          PRINCIPLES
      ======================================================= */}

      <section className="relative z-20 border-y border-white/10">
        <div className="mx-auto max-w-[1900px] px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.4fr_1fr]">
            <div className="border-b border-white/10 py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
                03 / Criterio
              </span>

              <div className="mt-12">
                <span
                  className="text-[10vw] font-black leading-none tracking-[-0.08em]"
                  style={{ color: `${LIME}12` }}
                >
                  04
                </span>
              </div>

              <p className="mt-8 max-w-xs text-sm leading-7 text-white/30">
                Cuatro cosas que prefiero defender antes que seguir
                cualquier tendencia.
              </p>
            </div>

            <div>
              {principles.map((item, index) => (
                <motion.div
                  key={item.index}
                  onMouseEnter={() =>
                    setActiveCard(index)
                  }
                  onMouseLeave={() =>
                    setActiveCard(null)
                  }
                  initial={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: 80,
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: EASE,
                  }}
                  className="group relative overflow-hidden border-b border-white/10 px-0 py-10 lg:px-12 lg:py-14"
                >
                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            x:
                              activeCard === index
                                ? 18
                                : 0,
                          }
                    }
                    transition={{
                      duration: 0.55,
                      ease: EASE,
                    }}
                    className="grid grid-cols-[50px_1fr] gap-5 sm:grid-cols-[80px_1fr]"
                  >
                    <div className="pt-1 text-[9px] tracking-[0.3em] text-white/20">
                      {item.index}
                    </div>

                    <div>
                      <h3 className="max-w-4xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                        {item.title}
                      </h3>

                      <motion.p
                        animate={
                          reducedMotion
                            ? undefined
                            : {
                                opacity:
                                  activeCard === index
                                    ? 1
                                    : 0.32,
                                x:
                                  activeCard === index
                                    ? 0
                                    : -4,
                              }
                        }
                        className="mt-5 max-w-xl text-sm leading-7 text-white/45"
                      >
                        {item.detail}
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        activeCard === index
                          ? '100%'
                          : '0%',
                    }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                    }}
                    className="absolute bottom-0 left-0 h-px"
                    style={{
                      backgroundColor: LIME,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CAPABILITIES
      ======================================================= */}

      <section className="relative z-20 overflow-hidden px-5 py-40 sm:px-8 sm:py-56 lg:px-12">
        <motion.div
          style={{ y: capabilitiesY }}
          className="mx-auto max-w-[1900px]"
        >
          <div className="mb-20 flex items-end justify-between border-t border-white/10 pt-5">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              04 / Lo que hago
            </span>

            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
              Digital experiences
            </span>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <motion.article
                key={item.index}
                initial={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 80,
                      }
                }
                whileInView={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.08,
                  ease: EASE,
                }}
                className="group relative min-h-[390px] overflow-hidden bg-black p-7 sm:p-10 lg:min-h-[500px]"
              >
                {/* giant number */}

                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          x:
                            activeCard === index
                              ? 15
                              : 0,
                          opacity:
                            activeCard === index
                              ? 0.1
                              : 0.035,
                        }
                  }
                  className="absolute right-[-2%] top-[-12%] text-[18vw] font-black leading-none tracking-[-0.1em]"
                >
                  {item.index}
                </motion.div>

                {/* hover light */}

                <motion.div
                  animate={{
                    opacity:
                      activeCard === index
                        ? 1
                        : 0,
                  }}
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 70% 40%, ${LIME}10, transparent 45%)`,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] tracking-[0.3em] text-white/25">
                      {item.index}
                    </span>

                    <motion.span
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              rotate:
                                activeCard === index
                                  ? 90
                                  : 0,
                              scale:
                                activeCard === index
                                  ? 1.4
                                  : 1,
                            }
                      }
                      className="text-lg font-light"
                      style={{
                        color: LIME,
                      }}
                    >
                      +
                    </motion.span>
                  </div>

                  <div>
                    <h3 className="max-w-3xl text-4xl font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
                      {item.title}
                    </h3>

                    <p className="mt-7 max-w-md text-sm leading-7 text-white/35">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.25 + index * 0.08,
                    ease: EASE,
                  }}
                  style={{
                    backgroundColor: LIME,
                  }}
                />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          FINAL
      ======================================================= */}

      <section className="relative z-20 flex min-h-[110vh] items-center overflow-hidden border-t border-white/10 px-5 py-40 sm:px-8 lg:px-12">
        <motion.div
          style={{
            x: giantTextX,
            y: useTransform(
              scrollYProgress,
              [0.55, 1],
              [100, -250]
            ),
          }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <span className="text-[30vw] font-black uppercase tracking-[-0.1em] text-white/[0.025]">
            CREATE
          </span>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1900px]">
          <div className="mb-16 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              05 / Final frame
            </span>

            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
              Nicolás Lombardo
            </span>
          </div>

          <motion.div
            initial={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.82,
                    y: 100,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.25,
              ease: EASE,
            }}
          >
            <h2 className="text-[14vw] font-black uppercase leading-[0.74] tracking-[-0.095em]">
              Ideas
              <br />
              <span className="text-white/20">con</span>{' '}
              intención.
            </h2>

            <h2 className="mt-8 text-[14vw] font-black uppercase leading-[0.74] tracking-[-0.095em]">
              Experiencias
              <br />
              <span style={{ color: LIME }}>
                con personalidad.
              </span>
            </h2>
          </motion.div>

          <div className="mt-24 flex flex-col gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md text-[10px] uppercase leading-[1.8] tracking-[0.3em] text-white/25">
              Diseño digital.
              <br />
              Desarrollo frontend.
              <br />
              Interacción.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                End / 2026
              </span>

              <motion.span
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scale: [1, 1.7, 1],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: LIME,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ======================================================= */}

      <footer className="relative z-30 border-t border-white/10 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1900px] flex-col gap-5 text-[9px] uppercase tracking-[0.3em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>Nicolás Lombardo</span>

          <div className="flex gap-8">
            <span>Diseño</span>
            <span>Frontend</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </section>
  );
}