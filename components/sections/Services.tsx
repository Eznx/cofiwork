'use client';

import { useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import TextReveal from '@/components/ui/TextReveal';
import ScaleOnScroll from '@/components/ui/ScaleOnScroll';
import Marquee from '@/components/ui/Marquee';

/* ============================================================
   DATA
============================================================ */

const servicios = [
  {
    numero: '01',
    tecnico: 'DISEÑO WEB',
    claro: 'Una identidad digital que se reconoce.',
    descripcion:
      'Diseño interfaces con carácter propio, construidas alrededor de tu marca y no de una plantilla.',
    tag: 'IDENTIDAD',
  },
  {
    numero: '02',
    tecnico: 'DESARROLLO',
    claro: 'Tecnología que desaparece detrás de la experiencia.',
    descripcion:
      'Código limpio, arquitectura sólida y una experiencia fluida en cada interacción.',
    tag: 'ENGINE',
  },
  {
    numero: '03',
    tecnico: 'VELOCIDAD',
    claro: 'Menos espera. Más atención.',
    descripcion:
      'Optimización desde la estructura hasta el último recurso para que todo responda con precisión.',
    tag: 'PERFORMANCE',
  },
  {
    numero: '04',
    tecnico: 'RESPONSIVE',
    claro: 'Una experiencia. Cualquier pantalla.',
    descripcion:
      'La interfaz se adapta al contexto sin perder diseño, jerarquía ni funcionalidad.',
    tag: 'ADAPTIVE',
  },
  {
    numero: '05',
    tecnico: 'SEO',
    claro: 'Que te encuentren cuando importa.',
    descripcion:
      'Una base técnica preparada para que los buscadores entiendan, indexen y encuentren tu proyecto.',
    tag: 'DISCOVERY',
  },
  {
    numero: '06',
    tecnico: 'WHATSAPP',
    claro: 'Del interés a la conversación en un clic.',
    descripcion:
      'Integro puntos de contacto directos para reducir fricción y acercar clientes a tu negocio.',
    tag: 'CONNECT',
  },
  {
    numero: '07',
    tecnico: 'A MEDIDA',
    claro: 'Porque tu negocio no funciona como los demás.',
    descripcion:
      'Cada decisión se adapta a tus objetivos, tu público y la forma particular en la que querés crecer.',
    tag: 'CUSTOM',
  },
];

const jetonEase = [
  0.16,
  1,
  0.3,
  1,
] as [number, number, number, number];

/* ============================================================
   HELPERS
============================================================ */

/**
 * Puntos deterministas.
 * Evita Math.random() para no provocar diferencias
 * entre render del servidor y cliente.
 */
const useGridPoints = (count: number) => {
  return useMemo(() => {
    return Array.from({ length: count }).map(
      (_, i) => ({
        x: 4 + ((i * 37) % 92),
        y: 5 + ((i * 61) % 90),
        delay: (i * 0.37) % 3,
        size: 1 + (i % 3) * 0.6,
        dur: 2.4 + (i % 4) * 0.65,
      })
    );
  }, [count]);
};

/* ============================================================
   ICONOS
============================================================ */

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Crosshair() {
  return (
    <div className="relative h-5 w-5">
      <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-[#B4FF39]/70" />
      <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-[#B4FF39]/40" />
      <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#B4FF39]/40" />
      <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#B4FF39]/70" />

      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B4FF39]" />
    </div>
  );
}

/* ============================================================
   SERVICE MODULE
============================================================ */

function ServiceModule({
  servicio,
  index,
}: {
  servicio: (typeof servicios)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        margin: '-60px',
      }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: jetonEase,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.018]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#B4FF39]/25
        hover:bg-[#B4FF39]/[0.025]
      "
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
        style={{
          background:
            'rgba(180,255,57,0.08)',
        }}
      />

      {/* Technical corner */}

      <div className="absolute right-0 top-0 h-8 w-8 opacity-40 transition-all duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#B4FF39]/50" />
        <div className="absolute right-0 top-0 h-px w-8 bg-gradient-to-l from-[#B4FF39]/40 to-transparent" />
      </div>

      {/* Header */}

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#B4FF39]/55">
          MODULE_{servicio.numero}
        </span>

        <span className="font-mono text-[8px] tracking-[0.2em] text-white/20">
          {servicio.tag}
        </span>
      </div>

      {/* Main */}

      <div className="relative mt-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-5 bg-[#B4FF39]/50 transition-all duration-500 group-hover:w-10 group-hover:bg-[#B4FF39]" />

          <span className="font-mono text-[8px] tracking-[0.25em] text-white/20">
            SYSTEM CAPABILITY
          </span>
        </div>

        <h3 className="text-xl font-black tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#B4FF39]">
          {servicio.tecnico}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {servicio.claro}
        </p>

        <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/25">
          {servicio.descripcion}
        </p>
      </div>

      {/* Footer */}

      <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-[8px] tracking-[0.25em] text-white/15">
          AVAILABLE
        </span>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_8px_rgba(180,255,57,0.7)]" />

          <span className="font-mono text-[8px] tracking-[0.2em] text-[#B4FF39]/50">
            ACTIVE
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
============================================================ */

export default function Services() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const gridPoints =
    useGridPoints(24);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      'start end',
      'end start',
    ],
  });

  const parallaxFast = useTransform(
    scrollYProgress,
    [0, 1],
    [70, -70]
  );

  const parallaxMed = useTransform(
    scrollYProgress,
    [0, 1],
    [40, -40]
  );

  const parallaxSlow = useTransform(
    scrollYProgress,
    [0, 1],
    [20, -20]
  );

  const backgroundOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [0, 1, 1, 0]
    );

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="
        relative
        overflow-hidden
        border-b
        border-white/[0.06]
        bg-black
        px-5
        py-32
        sm:px-6
        sm:py-40
      "
    >
      {/* ======================================================
          ATMÓSFERA DE FONDO
      ====================================================== */}

      <motion.div
        style={{
          opacity: backgroundOpacity,
        }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Radial energy */}

        <div
          className="absolute left-1/2 top-[30%] h-[700px] w-[700px] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,255,57,0.045) 0%, rgba(180,255,57,0.018) 30%, transparent 68%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,255,57,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,255,57,0.14) 1px, transparent 1px)
            `,
            backgroundSize:
              '80px 80px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />

        {/* Diagonal scanning lines */}

        {Array.from({ length: 10 }).map(
          (_, i) => (
            <motion.div
              key={`scan-${i}`}
              initial={{
                opacity: 0,
                x: '-20%',
              }}
              whileInView={{
                opacity: 1,
                x: '0%',
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.06,
                duration: 1.2,
                ease: jetonEase,
              }}
              className="absolute left-[-20%] h-px w-[140%] bg-gradient-to-r from-transparent via-[#B4FF39]/[0.08] to-transparent"
              style={{
                top: `${i * 11}%`,
                transform:
                  `rotate(${i % 2 === 0 ? 5 : -5}deg)`,
              }}
            />
          )
        )}

        {/* Partículas */}

        {gridPoints.map(
          (point, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-[#B4FF39]"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: point.size,
                height: point.size,
                boxShadow:
                  '0 0 8px rgba(180,255,57,0.5)',
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              whileInView={{
                opacity: [
                  0.05,
                  0.5,
                  0.05,
                ],
                scale: [
                  0.8,
                  1.4,
                  0.8,
                ],
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: point.dur,
                repeat: Infinity,
                delay: point.delay,
                ease: 'easeInOut',
              }}
            />
          )
        )}
      </motion.div>

      {/* ======================================================
          MARCAS LATERALES
      ====================================================== */}

      <motion.div
        style={{
          y: parallaxFast,
        }}
        className="
          pointer-events-none
          absolute
          left-5
          top-[22%]
          hidden
          flex-col
          gap-3
          lg:flex
        "
      >
        <span className="font-mono text-[8px] tracking-[0.35em] text-white/15 [writing-mode:vertical-rl]">
          COFIWORK / SYSTEM
        </span>

        <span className="h-24 w-px bg-gradient-to-b from-[#B4FF39]/30 to-transparent" />
      </motion.div>

      <motion.div
        style={{
          y: parallaxMed,
        }}
        className="
          pointer-events-none
          absolute
          right-5
          top-[42%]
          hidden
          flex-col
          items-end
          gap-3
          lg:flex
        "
      >
        <span className="font-mono text-[8px] tracking-[0.35em] text-white/15 [writing-mode:vertical-rl]">
          DIGITAL ARCHITECTURE
        </span>

        <span className="h-24 w-px bg-gradient-to-b from-[#B4FF39]/20 to-transparent" />
      </motion.div>

      {/* ======================================================
          CONTENIDO
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="max-w-5xl">
          <TextReveal>
            <div className="mb-7 flex items-center gap-4">
              <div className="h-px w-10 bg-[#B4FF39]" />

              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.38em] text-[#B4FF39]/70">
                02 / CAPACIDADES
              </span>

              <span className="font-mono text-[8px] tracking-[0.2em] text-white/15">
                SYSTEM_MODULES
              </span>
            </div>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.045em]
                text-white
                sm:text-7xl
                lg:text-[7.5rem]
              "
            >
              No hago
              <br />

              <span className="text-white/20">
                solamente webs.
              </span>
            </h2>
          </TextReveal>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: jetonEase,
            }}
            className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="max-w-2xl text-lg leading-relaxed text-white/45 sm:text-xl">
              Construyo experiencias digitales
              que combinan{' '}
              <span className="text-white">
                estrategia, diseño y tecnología
              </span>{' '}
              para que tu negocio tenga una presencia
              que esté a la altura de lo que ofrece.
            </p>

            <div className="hidden shrink-0 lg:block">
              <div className="flex items-center gap-3">
                <Crosshair />

                <div>
                  <p className="font-mono text-[8px] tracking-[0.25em] text-white/20">
                    SYSTEM STATUS
                  </p>

                  <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-[#B4FF39]/60">
                    ALL SYSTEMS ACTIVE
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ====================================================
            MARQUEE
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.35,
            duration: 1,
          }}
          className="
            relative
            mt-20
            overflow-hidden
            border-y
            border-white/[0.06]
            py-5
          "
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

          <Marquee speed={32}>
            {servicios.map(
              (servicio, index) => (
                <span
                  key={servicio.tecnico}
                  className="mx-7 inline-flex items-center gap-4"
                >
                  <span className="font-mono text-[8px] text-[#B4FF39]/40">
                    {servicio.numero}
                  </span>

                  <span className="text-xs font-bold tracking-[0.12em] text-white/70">
                    {servicio.tecnico}
                  </span>

                  <span className="text-[#B4FF39]/30">
                    /
                  </span>

                  <span className="text-xs text-white/25">
                    {servicio.tag}
                  </span>
                </span>
              )
            )}
          </Marquee>
        </motion.div>

        {/* ====================================================
            BLOQUE PRINCIPAL
        ==================================================== */}

        <div className="mt-24 grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">

          {/* ==================================================
              IZQUIERDA
          ================================================== */}

          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: jetonEase,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#B4FF39]/60">
                  01
                </span>

                <div className="h-px w-12 bg-[#B4FF39]/30" />

                <span className="font-mono text-[8px] tracking-[0.28em] text-white/20">
                  CORE CAPABILITIES
                </span>
              </div>

              <h3 className="mt-7 max-w-xl text-3xl font-black leading-[0.98] tracking-[-0.035em] text-white sm:text-4xl">
                Todo lo que
                <span className="text-[#B4FF39]">
                  {' '}
                  necesita
                </span>{' '}
                una presencia digital seria.
              </h3>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/35">
                No se trata de sumar funciones porque sí.
                Cada pieza tiene que cumplir una función,
                responder a una necesidad y formar parte de
                una experiencia coherente.
              </p>
            </motion.div>

            {/* Timeline */}

            <div className="relative mt-14">
              <div className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-[#B4FF39]/40 via-[#B4FF39]/10 to-transparent" />

              <div className="space-y-8">
                {servicios.map(
                  (servicio, index) => (
                    <motion.div
                      key={servicio.tecnico}
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: '-40px',
                      }}
                      transition={{
                        duration: 0.65,
                        delay:
                          index * 0.07,
                        ease: jetonEase,
                      }}
                      className="group relative flex gap-6"
                    >
                      {/* Node */}

                      <div className="relative z-10 mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#B4FF39]/30 bg-black transition-all duration-500 group-hover:border-[#B4FF39] group-hover:shadow-[0_0_15px_rgba(180,255,57,0.3)]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#B4FF39]/50 transition-all duration-500 group-hover:bg-[#B4FF39] group-hover:shadow-[0_0_8px_rgba(180,255,57,0.8)]" />
                      </div>

                      <div className="pb-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-[#B4FF39]">
                            {servicio.tecnico}
                          </span>

                          <span className="font-mono text-[7px] tracking-[0.2em] text-white/15">
                            {servicio.tag}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-white/35">
                          {servicio.claro}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ==================================================
              DERECHA — VIDEO / EXPERIENCE CORE
          ================================================== */}

          <motion.div
            style={{
              y: parallaxMed,
            }}
            className="relative"
          >
            {/* Outer frame */}

            <div className="absolute -inset-5 pointer-events-none">
              {/* Rotating orbital frame */}

              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 70,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-[2rem] border border-[#B4FF39]/[0.08]"
              />

              {/* Corners */}

              <div className="absolute left-0 top-0 h-12 w-12 border-l border-t border-[#B4FF39]/40" />
              <div className="absolute right-0 top-0 h-12 w-12 border-r border-t border-[#B4FF39]/40" />
              <div className="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-[#B4FF39]/20" />
              <div className="absolute bottom-0 right-0 h-12 w-12 border-b border-r border-[#B4FF39]/20" />

              {/* Corner points */}

              {[0, 1, 2, 3].map(
                (i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [
                        0.25,
                        1,
                        0.25,
                      ],
                      scale: [
                        1,
                        1.35,
                        1,
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.55,
                      ease: 'easeInOut',
                    }}
                    className={[
                      'absolute h-1.5 w-1.5 rounded-full bg-[#B4FF39]',
                      i === 0
                        ? 'left-[-2px] top-[-2px]'
                        : '',
                      i === 1
                        ? 'right-[-2px] top-[-2px]'
                        : '',
                      i === 2
                        ? 'bottom-[-2px] left-[-2px]'
                        : '',
                      i === 3
                        ? 'bottom-[-2px] right-[-2px]'
                        : '',
                    ].join(' ')}
                  />
                )
              )}
            </div>

            {/* Video container */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
                ease: jetonEase,
              }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.12]
                bg-black
                shadow-[0_30px_100px_rgba(0,0,0,0.55)]
              "
            >
              {/* Video */}

              <video
                src="/video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="
                  aspect-[4/3]
                  w-full
                  object-cover
                  opacity-80
                  grayscale-[0.15]
                  transition-all
                  duration-1000
                  hover:scale-[1.02]
                  hover:opacity-95
                "
              />

              {/* Color atmosphere */}

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      rgba(0,0,0,0.05) 0%,
                      transparent 35%,
                      rgba(0,0,0,0.65) 100%
                    ),
                    radial-gradient(
                      circle at 50% 50%,
                      transparent 30%,
                      rgba(0,0,0,0.4) 100%
                    )
                  `,
                }}
              />

              {/* Scanline */}

              <motion.div
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#B4FF39]/[0.04] to-transparent"
              />

              {/* Top HUD */}

              <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_10px_rgba(180,255,57,0.8)]" />

                  <span className="font-mono text-[8px] tracking-[0.28em] text-white/55">
                    LIVE EXPERIENCE
                  </span>
                </div>

                <span className="font-mono text-[8px] tracking-[0.25em] text-white/30">
                  COFI_02
                </span>
              </div>

              {/* Bottom HUD */}

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[7px] tracking-[0.3em] text-white/25">
                    VISUAL SYSTEM
                  </p>

                  <p className="mt-1 text-xs font-semibold tracking-wide text-white/70">
                    DIGITAL EXPERIENCE
                  </p>
                </div>

                <Crosshair />
              </div>
            </motion.div>

            {/* Below metadata */}

            <div className="mt-8 grid grid-cols-3 border-y border-white/[0.06]">
              {[
                ['01', 'DESIGN'],
                ['02', 'CODE'],
                ['03', 'IMPACT'],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="border-r border-white/[0.06] px-4 py-4 last:border-r-0"
                >
                  <p className="font-mono text-[8px] tracking-[0.25em] text-[#B4FF39]/50">
                    {number}
                  </p>

                  <p className="mt-2 text-[9px] font-bold tracking-[0.18em] text-white/35">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.8,
              }}
              className="mt-5 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/20"
            >
              Una presencia digital diseñada para avanzar.
            </motion.p>
          </motion.div>
        </div>

        {/* ====================================================
            MODULES GRID
        ==================================================== */}

        <div className="mt-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              ease: jetonEase,
            }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#B4FF39]/60">
                  02
                </span>

                <div className="h-px w-10 bg-[#B4FF39]/30" />

                <span className="font-mono text-[8px] tracking-[0.28em] text-white/20">
                  SYSTEM MODULES
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Todo conectado.
                <span className="text-white/25">
                  {' '}
                  Nada puesto porque sí.
                </span>
              </h3>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <span className="font-mono text-[8px] tracking-[0.25em] text-white/20">
                07 MODULES
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_8px_rgba(180,255,57,0.7)]" />
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map(
              (servicio, index) => (
                <ScaleOnScroll
                  key={servicio.tecnico}
                  delay={index * 0.07}
                >
                  <ServiceModule
                    servicio={servicio}
                    index={index}
                  />
                </ScaleOnScroll>
              )
            )}
          </div>
        </div>

        {/* ====================================================
            CIERRE
        ==================================================== */}

        <motion.div
          style={{
            y: parallaxSlow,
          }}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="
            relative
            mt-32
            overflow-hidden
            border-y
            border-[#B4FF39]/10
            py-16
            text-center
          "
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(180,255,57,0.045), transparent 65%)',
            }}
          />

          <p className="relative font-mono text-[8px] tracking-[0.35em] text-[#B4FF39]/50">
            SYSTEM READY
          </p>

          <h3 className="relative mt-5 text-3xl font-black tracking-[-0.035em] text-white sm:text-5xl">
            Tu próxima web debería
            <span className="text-[#B4FF39]">
              {' '}
              hacer más.
            </span>
          </h3>

          <p className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/30">
            No solamente verse bien. Comunicar, posicionar,
            conectar y convertir.
          </p>

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: '180px',
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: jetonEase,
            }}
            className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-[#B4FF39] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}