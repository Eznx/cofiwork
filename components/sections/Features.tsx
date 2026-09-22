"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useState,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Feature = {
  numero: string;
  subtitulo: string;
  titulo: string;
  detalle: string;
  palabra: string;
};

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const jetonEase = [
  0.16,
  1,
  0.3,
  1,
] as const;

const puntosDiferenciales: Feature[] = [
  {
    numero: "01",
    subtitulo: "SIN PLANTILLAS",
    titulo: "Creada desde cero",
    detalle:
      "Tu web nace de tu idea, no de un modelo que ya vieron mil veces.",
    palabra: "ORIGEN",
  },
  {
    numero: "02",
    subtitulo: "CON PROPÓSITO",
    titulo: "Diseñada para actuar",
    detalle:
      "No solo se ve bien — está construida para que te elijan.",
    palabra: "IMPACTO",
  },
  {
    numero: "03",
    subtitulo: "CLARO Y DIRECTO",
    titulo: "Sin tecnicismos",
    detalle:
      "Hablamos de lo que importa. Entendés todo en cada paso.",
    palabra: "CLARIDAD",
  },
  {
    numero: "04",
    subtitulo: "CRECÉ JUNTOS",
    titulo: "Escalable",
    detalle:
      "La ampliamos cuando tu negocio crece. Todo lo que necesites.",
    palabra: "EVOLUCIÓN",
  },
];

/* -------------------------------------------------------------------------- */
/*                              BACKGROUND DOTS                               */
/* -------------------------------------------------------------------------- */

const backgroundDots = [
  { left: "7%", top: "14%", size: 2, delay: 0 },
  { left: "16%", top: "72%", size: 1, delay: 0.7 },
  { left: "27%", top: "28%", size: 2, delay: 1.4 },
  { left: "39%", top: "84%", size: 1, delay: 2.1 },
  { left: "51%", top: "17%", size: 1, delay: 0.9 },
  { left: "63%", top: "64%", size: 2, delay: 1.8 },
  { left: "74%", top: "25%", size: 1, delay: 2.7 },
  { left: "87%", top: "78%", size: 2, delay: 1.2 },
  { left: "92%", top: "39%", size: 1, delay: 3 },
  { left: "31%", top: "53%", size: 1, delay: 1.6 },
  { left: "57%", top: "43%", size: 2, delay: 2.4 },
  { left: "81%", top: "57%", size: 1, delay: 0.4 },
];

/* -------------------------------------------------------------------------- */
/*                              FEATURE CARD                                  */
/* -------------------------------------------------------------------------- */

function FeatureCard({
  item,
  index,
  reducedMotion,
}: {
  item: Feature;
  index: number;
  reducedMotion: boolean;
}) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] =
    useState(false);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      reducedMotion ||
      !cardRef.current
    ) {
      return;
    }

    const rect =
      cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    cardRef.current.style.setProperty(
      "--mx",
      `${x * 100}%`,
    );

    cardRef.current.style.setProperty(
      "--my",
      `${y * 100}%`,
    );

    cardRef.current.style.setProperty(
      "--rx",
      `${y * -4}deg`,
    );

    cardRef.current.style.setProperty(
      "--ry",
      `${x * 5}deg`,
    );
  };

  const resetPointer = () => {
    if (!cardRef.current) return;

    cardRef.current.style.setProperty(
      "--mx",
      "50%",
    );

    cardRef.current.style.setProperty(
      "--my",
      "50%",
    );

    cardRef.current.style.setProperty(
      "--rx",
      "0deg",
    );

    cardRef.current.style.setProperty(
      "--ry",
      "0deg",
    );

    setIsHovered(false);
  };

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 50,
              scale: 0.96,
              filter: "blur(10px)",
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.9,
        delay:
          0.1 + index * 0.1,
        ease: jetonEase,
      }}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={resetPointer}
      onPointerMove={handlePointerMove}
      ref={cardRef}
      style={{
        transform:
          "perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
      className="group relative min-h-[390px] overflow-hidden rounded-[2rem] transition-transform duration-500 ease-out"
    >
      {/* ------------------------------------------------------------------ */}
      {/* OUTER GLOW                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(180,255,57,0.45), transparent 35%, transparent 65%, rgba(180,255,57,0.12))",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* CARD BODY                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="absolute inset-px overflow-hidden rounded-[calc(2rem-1px)] border border-white/[0.09] bg-[#07100d]/80 backdrop-blur-xl">
        {/* Cursor light */}

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), rgba(180,255,57,0.12), transparent 70%)",
          }}
        />

        {/* Technical grid */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize:
              "32px 32px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />

        {/* Giant number */}

        <div className="pointer-events-none absolute -right-5 -top-8 select-none text-[10rem] font-black leading-none tracking-[-0.1em] text-white/[0.025] transition-all duration-700 group-hover:-translate-x-2 group-hover:text-[#B4FF39]/[0.06]">
          {item.numero}
        </div>

        {/* Orbital decoration */}

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#B4FF39]/[0.07]"
        />

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: -360,
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute -right-9 -top-9 h-28 w-28 rounded-full border border-dashed border-[#E7CF82]/[0.1]"
        />

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative z-10 flex h-full flex-col p-7 sm:p-9">
          {/* top line */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#B4FF39]/20 text-[9px] font-bold text-[#B4FF39]/70">
                {item.numero}
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/35">
                {item.subtitulo}
              </span>
            </div>

            <motion.span
              animate={
                isHovered
                  ? {
                      scale: 1.4,
                      opacity: 1,
                    }
                  : {
                      scale: 1,
                      opacity: 0.4,
                    }
              }
              className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_12px_rgba(180,255,57,0.8)]"
            />
          </div>

          {/* central title */}

          <div className="mt-auto">
            <div className="mb-5 h-px w-12 bg-gradient-to-r from-[#B4FF39] to-transparent transition-all duration-700 group-hover:w-24" />

            <h3 className="max-w-sm text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white transition-colors duration-500 sm:text-4xl group-hover:text-[#B4FF39]">
              {item.titulo}
            </h3>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/40 transition-colors duration-500 group-hover:text-white/55 sm:text-base">
              {item.detalle}
            </p>

            {/* bottom */}

            <div className="mt-8 flex items-end justify-between">
              <span className="text-[8px] font-medium uppercase tracking-[0.35em] text-white/20">
                {item.palabra}
              </span>

              <motion.div
                animate={
                  isHovered
                    ? {
                        x: 5,
                        opacity: 1,
                      }
                    : {
                        x: 0,
                        opacity: 0.35,
                      }
                }
                className="text-lg text-[#B4FF39]"
              >
                →
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom energy line */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay:
              0.6 + index * 0.12,
            ease: jetonEase,
          }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#B4FF39] via-[#B4FF39]/30 to-transparent"
        />

        {/* Corner brackets */}

        <div className="absolute left-5 top-5 h-5 w-5 border-l border-t border-[#B4FF39]/0 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#B4FF39]/35" />

        <div className="absolute right-5 top-5 h-5 w-5 border-r border-t border-[#B4FF39]/0 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#B4FF39]/35" />

        <div className="absolute bottom-5 left-5 h-5 w-5 border-b border-l border-[#B4FF39]/0 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#B4FF39]/35" />

        <div className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-[#B4FF39]/0 transition-all duration-500 group-hover:h-8 group-hover:w-8 group-hover:border-[#B4FF39]/35" />
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  FEATURES                                  */
/* -------------------------------------------------------------------------- */

export default function Features() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const reducedMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start end",
        "end start",
      ],
    });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 80,
        damping: 25,
        mass: 0.4,
      },
    );

  const orbY =
    useTransform(
      smoothProgress,
      [0, 1],
      [-100, 160],
    );

  const orbRotate =
    useTransform(
      smoothProgress,
      [0, 1],
      [-15, 25],
    );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050A14] px-5 py-32 sm:px-6 sm:py-40"
    >
      {/* ================================================================== */}
      {/* BACKGROUND                                                         */}
      {/* ================================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Main atmospheric glow */}

        <motion.div
          style={{
            y: reducedMotion
              ? 0
              : orbY,
            rotate:
              reducedMotion
                ? 0
                : orbRotate,
          }}
          className="absolute left-[8%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#B4FF39]/[0.035] blur-[120px]"
        />

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [
                    1,
                    1.15,
                    1,
                  ],
                  opacity: [
                    0.12,
                    0.22,
                    0.12,
                  ],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] right-[5%] h-[460px] w-[460px] rounded-full bg-[#B4FF39]/[0.025] blur-[110px]"
        />

        {/* Vertical energy */}

        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 opacity-[0.08]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #B4FF39, transparent)",
          }}
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180,255,57,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(180,255,57,0.7) 1px, transparent 1px)",
            backgroundSize:
              "90px 90px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black, transparent 78%)",
          }}
        />

        {/* Stable deterministic particles */}

        {backgroundDots.map(
          (dot, index) => (
            <motion.span
              key={index}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [
                        0.12,
                        0.45,
                        0.12,
                      ],
                      scale: [
                        1,
                        1.8,
                        1,
                      ],
                    }
              }
              transition={{
                duration:
                  3.5 +
                  (index % 4) *
                    0.7,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-[#B4FF39]"
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
              }}
            />
          ),
        )}
      </div>

      {/* ================================================================== */}
      {/* CONTENT                                                            */}
      {/* ================================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ---------------------------------------------------------------- */}
        {/* INTRO                                                            */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 45,
                  filter:
                    "blur(10px)",
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  filter:
                    "blur(0px)",
                }
          }
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 1,
            ease: jetonEase,
          }}
          className="mb-20 sm:mb-28"
        >
          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4FF39]/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B4FF39]" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B4FF39]/70">
              No es solo código
            </span>
          </div>

          {/* Title */}

          <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] sm:text-7xl lg:text-[7.5rem]">
            <span className="block text-white">
              DISEÑO WEB.
            </span>

            <span className="block text-white/20">
              CONSTRUYO
            </span>

            <span className="block bg-gradient-to-r from-[#B4FF39] via-[#E7CF82] to-[#B4FF39] bg-clip-text text-transparent">
              PRESENCIA.
            </span>
          </h2>

          {/* Description */}

          <p className="mt-9 max-w-2xl text-base leading-7 text-white/45 sm:text-lg sm:leading-8">
            Cada proyecto parte de una idea, no de
            una plantilla. Estrategia, diseño y
            desarrollo se combinan para crear una
            experiencia digital que represente tu
            marca y tenga un propósito claro.
          </p>

          {/* Divider */}

          <div className="mt-10 flex items-center gap-4">
            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
                ease: jetonEase,
                delay: 0.25,
              }}
              className="h-px w-full max-w-xl origin-left bg-gradient-to-r from-[#B4FF39] via-[#B4FF39]/30 to-transparent"
            />

            <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
              04 principios
            </span>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* FEATURE GRID                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-5 md:grid-cols-2">
          {puntosDiferenciales.map(
            (item, index) => (
              <FeatureCard
                key={item.numero}
                item={item}
                index={index}
                reducedMotion={
                  Boolean(
                    reducedMotion,
                  )
                }
              />
            ),
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM STATEMENT                                                  */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
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
            margin: "-80px",
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: jetonEase,
          }}
          className="mt-20 flex flex-col gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/25">
              El resultado
            </span>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Una presencia digital que no parece
              hecha para cualquiera porque fue
              pensada específicamente para vos.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#B4FF39]/30" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B4FF39]/60">
              Hecho para diferenciar
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}