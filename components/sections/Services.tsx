'use client';

import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

import TextReveal from '@/components/ui/TextReveal';
import ScaleOnScroll from '@/components/ui/ScaleOnScroll';
import Marquee from '@/components/ui/Marquee';

/* ============================================================
   DESIGN SYSTEM
============================================================ */

const LIME = '#B4FF39';

const easeLuxury = [
  0.16,
  1,
  0.3,
  1,
] as [number, number, number, number];

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
    tag: 'TECNOLOGÍA',
  },
  {
    numero: '03',
    tecnico: 'VELOCIDAD',
    claro: 'Menos espera. Más atención.',
    descripcion:
      'Optimización desde la estructura hasta el último recurso para que todo responda con precisión.',
    tag: 'RENDIMIENTO',
  },
  {
    numero: '04',
    tecnico: 'RESPONSIVE',
    claro: 'Una experiencia. Cualquier pantalla.',
    descripcion:
      'La interfaz se adapta al contexto sin perder diseño, jerarquía ni funcionalidad.',
    tag: 'ADAPTABILIDAD',
  },
  {
    numero: '05',
    tecnico: 'SEO',
    claro: 'Que te encuentren cuando importa.',
    descripcion:
      'Una base técnica preparada para que los buscadores entiendan, indexen y encuentren tu proyecto.',
    tag: 'VISIBILIDAD',
  },
  {
    numero: '06',
    tecnico: 'WHATSAPP',
    claro: 'Del interés a la conversación en un clic.',
    descripcion:
      'Integro puntos de contacto directos para reducir fricción y acercar clientes a tu negocio.',
    tag: 'CONEXIÓN',
  },
  {
    numero: '07',
    tecnico: 'A MEDIDA',
    claro: 'Porque tu negocio no funciona como los demás.',
    descripcion:
      'Cada decisión se adapta a tus objetivos, tu público y la forma particular en la que querés crecer.',
    tag: 'EXCLUSIVO',
  },
];

/* ============================================================
   HELPERS
============================================================ */

function useGridPoints(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: 3 + ((i * 37) % 94),
        y: 4 + ((i * 61) % 92),
        delay: (i * 0.37) % 4,
        size: 1 + (i % 3) * 0.55,
        dur: 2.4 + (i % 4) * 0.65,
      })),
    [count]
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* ============================================================
   ICON
============================================================ */

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceModule({
  servicio,
  index,
  reducedMotion,
}: {
  servicio: (typeof servicios)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const rotateX = useSpring(0, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  const rotateY = useSpring(0, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = clamp(
      ((event.clientX - rect.left) / rect.width) * 100,
      0,
      100
    );

    const y = clamp(
      ((event.clientY - rect.top) / rect.height) * 100,
      0,
      100
    );

    pointerX.set(x);
    pointerY.set(y);

    rotateY.set((x - 50) * 0.1);
    rotateX.set((50 - y) * 0.1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    pointerX.set(50);
    pointerY.set(50);
  };

  const glowStyle = {
    '--pointer-x': pointerX,
    '--pointer-y': pointerY,
  } as CSSProperties;

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 40,
              filter: 'blur(10px)',
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }
      }
      viewport={{
        once: true,
        margin: '-70px',
      }}
      transition={{
        duration: 0.9,
        delay: reducedMotion ? 0 : index * 0.07,
        ease: easeLuxury,
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
        ...glowStyle,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="
        group
        relative
        min-h-[340px]
        overflow-hidden
        rounded-[1.6rem]
        border
        border-white/[0.075]
        bg-white/[0.018]
        p-7
        [transform-style:preserve-3d]
        transition-all
        duration-700
        hover:border-[#B4FF39]/25
        hover:bg-white/[0.028]
      "
    >
      {/* Cursor light */}

      {!reducedMotion && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-700
            group-hover:opacity-100
          "
          style={{
            background:
              'radial-gradient(300px circle at var(--pointer-x) var(--pointer-y), rgba(180,255,57,0.11), transparent 68%)',
          }}
        />
      )}

      {/* Ambient light */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-28
          h-64
          w-64
          rounded-full
          bg-[#B4FF39]/[0.025]
          blur-[80px]
          transition-all
          duration-1000
          group-hover:bg-[#B4FF39]/[0.075]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          h-60
          w-60
          rounded-full
          bg-[#B4FF39]/[0.015]
          blur-[80px]
          transition-all
          duration-1000
          group-hover:bg-[#B4FF39]/[0.04]
        "
      />

      {/* Inner frame */}

      <div
        className="
          pointer-events-none
          absolute
          inset-3
          rounded-[1.25rem]
          border
          border-white/[0.025]
        "
      />

      {/* Number */}

      <div className="pointer-events-none absolute right-6 top-5 select-none">
        <span
          className="
            text-[6rem]
            font-black
            leading-none
            tracking-[-0.1em]
            text-white/[0.025]
            transition-all
            duration-700
            group-hover:text-[#B4FF39]/[0.055]
          "
        >
          {servicio.numero}
        </span>
      </div>

      {/* Category */}

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#B4FF39]/60">
          {servicio.numero}
        </span>

        <span className="font-mono text-[8px] tracking-[0.2em] text-white/20">
          {servicio.tag}
        </span>
      </div>

      {/* Main content */}

      <div className="relative z-10 mt-24 [transform:translateZ(28px)]">
        <div className="mb-6 h-px w-7 bg-[#B4FF39]/50 transition-all duration-700 group-hover:w-16 group-hover:bg-[#B4FF39]" />

        <h3
          className="
            text-xl
            font-black
            tracking-[-0.025em]
            text-white
            transition-colors
            duration-500
            group-hover:text-[#B4FF39]
          "
        >
          {servicio.tecnico}
        </h3>

        <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/55">
          {servicio.claro}
        </p>

        <p className="mt-4 max-w-sm text-xs leading-6 text-white/25">
          {servicio.descripcion}
        </p>
      </div>

      {/* Bottom */}

      <div
        className="
          absolute
          bottom-0
          left-7
          right-7
          h-px
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-transparent
          via-[#B4FF39]/60
          to-transparent
          opacity-0
          transition-all
          duration-700
          group-hover:scale-x-100
          group-hover:opacity-100
        "
      />
    </motion.article>
  );
}

/* ============================================================
   MAIN
============================================================ */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeService, setActiveService] = useState(0);

  const gridPoints = useGridPoints(30);

  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);

  /* ==========================================================
     POINTER
  ========================================================== */

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 60,
    damping: 24,
    mass: 0.45,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 60,
    damping: 24,
    mass: 0.45,
  });

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      ((event.clientX - rect.left) / rect.width) * 100
    );

    mouseY.set(
      ((event.clientY - rect.top) / rect.height) * 100
    );
  };

  /* ==========================================================
     SCROLL
  ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxFast = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -80]
  );

  const parallaxMed = useTransform(
    scrollYProgress,
    [0, 1],
    [45, -45]
  );

  const parallaxSlow = useTransform(
    scrollYProgress,
    [0, 1],
    [20, -20]
  );

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 0.88, 1],
    [0, 1, 1, 1, 0]
  );

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      onPointerMove={handlePointerMove}
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
          SUBTLE PROGRESS
      ====================================================== */}

      <motion.div
        style={{
          scaleX: progressScale,
          transformOrigin: 'left',
        }}
        className="
          absolute
          left-0
          right-0
          top-0
          z-50
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#B4FF39]/70
          to-transparent
        "
      />

      {/* ======================================================
          ATMOSPHERE
      ====================================================== */}

      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        {!reducedMotion && (
          <motion.div
            className="
              absolute
              h-[560px]
              w-[560px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
              background:
                'radial-gradient(circle, rgba(180,255,57,0.055) 0%, rgba(180,255,57,0.015) 32%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
        )}

        {/* Main atmospheric glow */}

        <div
          className="
            absolute
            left-1/2
            top-[30%]
            h-[900px]
            w-[900px]
            -translate-x-1/2
            rounded-full
          "
          style={{
            background:
              'radial-gradient(circle, rgba(180,255,57,0.045) 0%, rgba(180,255,57,0.012) 35%, transparent 68%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Editorial grid */}

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
          }}
        />

        {/* Fine grid */}

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          }}
        />

        {/* Organic light streaks */}

        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`light-${i}`}
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: '-15%',
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
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              delay: reducedMotion ? 0 : i * 0.08,
              ease: easeLuxury,
            }}
            className="
              absolute
              left-[-10%]
              h-px
              w-[120%]
              bg-gradient-to-r
              from-transparent
              via-[#B4FF39]/[0.045]
              to-transparent
            "
            style={{
              top: `${16 + i * 14}%`,
              transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
            }}
          />
        ))}

        {/* Small atmospheric particles */}

        {gridPoints.map((point, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-[#B4FF39]"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: point.size,
              height: point.size,
              boxShadow:
                '0 0 8px rgba(180,255,57,0.35)',
            }}
            animate={
              reducedMotion
                ? { opacity: 0.06 }
                : {
                    opacity: [0.015, 0.3, 0.015],
                    scale: [0.8, 1.35, 0.8],
                  }
            }
            transition={{
              duration: point.dur,
              repeat: reducedMotion ? 0 : Infinity,
              delay: point.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ======================================================
          SIDE EDITORIAL ELEMENTS
      ====================================================== */}

      <motion.div
        style={{ y: parallaxFast }}
        className="
          pointer-events-none
          absolute
          left-6
          top-[18%]
          hidden
          flex-col
          items-center
          gap-5
          lg:flex
        "
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-[#B4FF39]/35 to-transparent" />

        <span
          className="
            font-mono
            text-[8px]
            tracking-[0.3em]
            text-white/15
            [writing-mode:vertical-rl]
          "
        >
          COFIWORK
        </span>
      </motion.div>

      <motion.div
        style={{ y: parallaxMed }}
        className="
          pointer-events-none
          absolute
          right-6
          top-[42%]
          hidden
          flex-col
          items-center
          gap-5
          lg:flex
        "
      >
        <span
          className="
            font-mono
            text-[8px]
            tracking-[0.3em]
            text-white/15
            [writing-mode:vertical-rl]
          "
        >
          DIGITAL CRAFT
        </span>

        <span className="h-20 w-px bg-gradient-to-b from-[#B4FF39]/25 to-transparent" />
      </motion.div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ====================================================
            HERO
        ==================================================== */}

        <div className="max-w-6xl">
          <TextReveal>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-[#B4FF39]" />

              <span className="font-mono text-[9px] tracking-[0.38em] text-[#B4FF39]/65">
                CAPACIDADES
              </span>
            </div>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.84]
                tracking-[-0.06em]
                text-white
                sm:text-7xl
                lg:text-[8.2rem]
              "
            >
              No hago
              <br />

              <span className="relative text-white/18">
                solamente webs.

                <span
                  className="
                    absolute
                    -bottom-4
                    left-0
                    h-px
                    w-32
                    bg-gradient-to-r
                    from-[#B4FF39]/60
                    to-transparent
                  "
                />
              </span>
            </h2>
          </TextReveal>

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
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
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: reducedMotion ? 0 : 0.2,
              ease: easeLuxury,
            }}
            className="
              mt-12
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <p className="max-w-2xl text-lg leading-relaxed text-white/42 sm:text-xl">
              Construyo experiencias digitales que combinan{' '}
              <span className="text-white">
                estrategia, diseño y tecnología
              </span>{' '}
              para que tu negocio tenga una presencia a la altura
              de lo que ofrece.
            </p>

            <div className="hidden max-w-xs lg:block">
              <div className="mb-3 h-px w-16 bg-[#B4FF39]/40" />

              <p className="text-xs leading-6 text-white/25">
                Cada detalle tiene una razón.
                <br />
                Cada decisión construye percepción.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ====================================================
            MARQUEE
        ==================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{ once: true }}
          transition={{
            delay: reducedMotion ? 0 : 0.35,
            duration: 1,
          }}
          className="
            relative
            mt-24
            overflow-hidden
            border-y
            border-white/[0.06]
            py-6
          "
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

          <Marquee speed={28}>
            {servicios.map((servicio) => (
              <span
                key={servicio.tecnico}
                className="mx-8 inline-flex items-center gap-5"
              >
                <span className="font-mono text-[8px] text-[#B4FF39]/40">
                  {servicio.numero}
                </span>

                <span className="text-xs font-bold tracking-[0.14em] text-white/65">
                  {servicio.tecnico}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#B4FF39]/30" />

                <span className="text-xs text-white/20">
                  {servicio.tag}
                </span>
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* ====================================================
            CORE EXPERIENCE
        ==================================================== */}

        <div className="mt-28 grid items-start gap-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24 xl:gap-32">
          {/* ==================================================
              LEFT
          ================================================== */}

          <div>
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -30,
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
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: easeLuxury,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#B4FF39]/60">
                  01
                </span>

                <div className="h-px w-12 bg-[#B4FF39]/30" />

                <span className="font-mono text-[8px] tracking-[0.28em] text-white/20">
                  SERVICIOS
                </span>
              </div>

              <h3
                className="
                  mt-8
                  max-w-xl
                  text-3xl
                  font-black
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-white
                  sm:text-4xl
                "
              >
                Todo lo que
                <span className="text-[#B4FF39]">
                  {' '}
                  necesita
                </span>{' '}
                una presencia digital seria.
              </h3>

              <p className="mt-7 max-w-lg text-sm leading-7 text-white/35">
                No se trata de sumar funciones porque sí. Cada pieza
                tiene que cumplir una función, responder a una
                necesidad y formar parte de una experiencia coherente.
              </p>
            </motion.div>

            {/* ==================================================
                SERVICE SELECTOR
            ================================================== */}

            <div className="mt-14 border-y border-white/[0.06]">
              {servicios.map((servicio, index) => (
                <button
                  key={servicio.tecnico}
                  type="button"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-white/[0.045]
                    py-5
                    text-left
                    last:border-b-0
                  "
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={[
                        'font-mono text-[9px] tracking-[0.15em] transition-colors duration-300',
                        index === activeService
                          ? 'text-[#B4FF39]'
                          : 'text-white/15',
                      ].join(' ')}
                    >
                      {servicio.numero}
                    </span>

                    <span
                      className={[
                        'text-sm font-semibold tracking-wide transition-all duration-300',
                        index === activeService
                          ? 'translate-x-1 text-white'
                          : 'text-white/35',
                      ].join(' ')}
                    >
                      {servicio.tecnico}
                    </span>
                  </div>

                  <motion.span
                    animate={{
                      x: index === activeService ? 4 : 0,
                      opacity: index === activeService ? 1 : 0.25,
                    }}
                    className="text-[#B4FF39]"
                  >
                    <ArrowIcon />
                  </motion.span>
                </button>
              ))}
            </div>

            {/* ==================================================
                TIMELINE
            ================================================== */}

            <div className="relative mt-16">
              <div className="absolute bottom-5 left-[7px] top-5 w-px bg-gradient-to-b from-[#B4FF39]/35 via-white/[0.06] to-transparent" />

              <div className="space-y-9">
                {servicios.map((servicio, index) => (
                  <motion.div
                    key={servicio.tecnico}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -20,
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
                      margin: '-40px',
                    }}
                    transition={{
                      duration: 0.65,
                      delay: reducedMotion
                        ? 0
                        : index * 0.06,
                      ease: easeLuxury,
                    }}
                    className="group relative flex gap-6"
                  >
                    <div className="relative z-10 mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black transition-all duration-500 group-hover:border-[#B4FF39]/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#B4FF39]/40 transition-all duration-500 group-hover:bg-[#B4FF39]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-white/75 transition-colors group-hover:text-white">
                          {servicio.tecnico}
                        </span>

                        <span className="font-mono text-[7px] tracking-[0.2em] text-white/15">
                          {servicio.tag}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-white/30">
                        {servicio.claro}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================================================
              RIGHT — VISUAL
          ================================================== */}

          <motion.div
            style={{ y: parallaxMed }}
            className="relative"
          >
            {/* Decorative frame */}

            <div className="pointer-events-none absolute -inset-6">
              {!reducedMotion && (
                <>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 90,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 rounded-[2rem] border border-[#B4FF39]/[0.055]"
                  />

                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 120,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-4 rounded-[2rem] border border-dashed border-white/[0.025]"
                  />
                </>
              )}

              <div className="absolute left-0 top-0 h-14 w-14 border-l border-t border-[#B4FF39]/35" />

              <div className="absolute right-0 top-0 h-14 w-14 border-r border-t border-[#B4FF39]/35" />

              <div className="absolute bottom-0 left-0 h-14 w-14 border-b border-l border-white/10" />

              <div className="absolute bottom-0 right-0 h-14 w-14 border-b border-r border-white/10" />
            </div>

            {/* ==================================================
                VIDEO
            ================================================== */}

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.94,
                      y: 35,
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
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: easeLuxury,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/[0.1]
                bg-black
                shadow-[0_40px_120px_rgba(0,0,0,0.65)]
              "
            >
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
                  opacity-75
                  grayscale-[0.1]
                  transition-all
                  duration-[1400ms]
                  group-hover:scale-[1.035]
                  group-hover:opacity-95
                "
              />

              {/* Cinematic grade */}

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      rgba(0,0,0,0.02) 0%,
                      transparent 35%,
                      rgba(0,0,0,0.72) 100%
                    ),
                    radial-gradient(
                      circle at 50% 45%,
                      transparent 25%,
                      rgba(0,0,0,0.42) 100%
                    )
                  `,
                }}
              />

              {/* Lime light bloom */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-20%]
                  left-1/2
                  h-[55%]
                  w-[65%]
                  -translate-x-1/2
                  rounded-full
                  bg-[#B4FF39]/[0.045]
                  blur-[90px]
                  transition-all
                  duration-1000
                  group-hover:bg-[#B4FF39]/[0.08]
                "
              />

              {/* Elegant scan */}

              {!reducedMotion && (
                <motion.div
                  animate={{
                    y: ['-120%', '220%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    h-24
                    bg-gradient-to-b
                    from-transparent
                    via-[#B4FF39]/[0.025]
                    to-transparent
                  "
                />
              )}

              {/* Minimal upper label */}

              <div className="absolute left-6 top-6">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/40">
                  EXPERIENCIA DIGITAL
                </span>
              </div>

              {/* Vertical number */}

              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <span className="font-mono text-[7px] tracking-[0.25em] text-white/20 [writing-mode:vertical-rl]">
                  DISEÑO · CÓDIGO · IMPACTO
                </span>
              </div>

              {/* Bottom caption */}

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-white/65">
                    Experiencias que hacen avanzar una marca.
                  </p>
                </div>

                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          scale: [1, 1.12, 1],
                          opacity: [0.5, 1, 0.5],
                        }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-2 w-2 rounded-full bg-[#B4FF39] shadow-[0_0_12px_rgba(180,255,57,0.8)]"
                />
              </div>
            </motion.div>

            {/* ==================================================
                METADATA
            ================================================== */}

            <div className="mt-9 grid grid-cols-3 border-y border-white/[0.06]">
              {[
                ['01', 'DISEÑO'],
                ['02', 'TECNOLOGÍA'],
                ['03', 'RESULTADO'],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="
                    group
                    border-r
                    border-white/[0.06]
                    px-4
                    py-5
                    last:border-r-0
                  "
                >
                  <p className="font-mono text-[8px] tracking-[0.25em] text-[#B4FF39]/45">
                    {number}
                  </p>

                  <p className="mt-2 text-[9px] font-bold tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-[10px] tracking-[0.12em] text-white/20">
              Una presencia digital diseñada para avanzar.
            </p>
          </motion.div>
        </div>

        {/* ====================================================
            MODULES
        ==================================================== */}

        <div className="mt-36">
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
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
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: easeLuxury,
            }}
            className="mb-12 max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#B4FF39]/60">
                02
              </span>

              <div className="h-px w-10 bg-[#B4FF39]/30" />
            </div>

            <h3
              className="
                text-3xl
                font-black
                tracking-[-0.04em]
                text-white
                sm:text-4xl
              "
            >
              Todo conectado.
              <span className="text-white/20">
                {' '}
                Nada puesto porque sí.
              </span>
            </h3>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio, index) => (
              <ScaleOnScroll
                key={servicio.tecnico}
                delay={reducedMotion ? 0 : index * 0.06}
              >
                <ServiceModule
                  servicio={servicio}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              </ScaleOnScroll>
            ))}
          </div>
        </div>

        {/* ====================================================
            FINAL STATEMENT
        ==================================================== */}

        <motion.div
          style={{ y: parallaxSlow }}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="
            relative
            mt-36
            overflow-hidden
            border-y
            border-white/[0.07]
            py-24
            text-center
          "
        >
          {/* Ambient center */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[600px]
              w-[600px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              background:
                'radial-gradient(circle, rgba(180,255,57,0.045), transparent 62%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Orbital lines */}

          {!reducedMotion && (
            <>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[440px]
                  w-[440px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-[#B4FF39]/[0.025]
                "
              />

              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[310px]
                  w-[310px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-dashed
                  border-white/[0.025]
                "
              />
            </>
          )}

          <div className="relative">
            <p className="font-mono text-[8px] tracking-[0.35em] text-[#B4FF39]/50">
              EXPERIENCIA DIGITAL
            </p>

            <h3
              className="
                mx-auto
                mt-6
                max-w-4xl
                text-3xl
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Tu próxima web debería
              <span className="text-[#B4FF39]">
                {' '}
                hacer más.
              </span>
            </h3>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/30">
              No solamente verse bien.
              <br />
              Comunicar. Posicionar. Conectar. Convertir.
            </p>

            <div
              className="
                mx-auto
                mt-10
                flex
                w-fit
                items-center
                gap-4
                border-b
                border-[#B4FF39]/30
                pb-3
                text-[#B4FF39]/70
              "
            >
              <span className="text-[10px] font-semibold tracking-[0.18em]">
                DISEÑADA PARA AVANZAR
              </span>

              <ArrowIcon />
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '240px' }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                delay: reducedMotion ? 0 : 0.25,
                ease: easeLuxury,
              }}
              className="
                mx-auto
                mt-12
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#B4FF39]/70
                to-transparent
              "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}