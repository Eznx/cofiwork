'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import Preloader from '@/components/ui/Preloader';
import SectionIndicator from '@/components/ui/SectionIndicator';
import Marquee from '@/components/ui/Marquee';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Closing from '@/components/sections/Closing';
import Features from '@/components/sections/Features';

import { sectionNames } from '@/lib/constants';

/* ============================================================
   CONSTANTS
============================================================ */

const LIME = '#B4FF39';

const EASE = [
  0.16,
  1,
  0.3,
  1,
] as [number, number, number, number];

/* ============================================================
   DETERMINISTIC DATA
============================================================ */

const ambientParticles = Array.from(
  { length: 28 },
  (_, index) => ({
    x: 3 + ((index * 43) % 94),
    y: 5 + ((index * 67) % 90),
    size: 1 + (index % 3) * 0.5,
    delay: (index * 0.31) % 4,
    duration: 3 + (index % 5) * 0.7,
  })
);

const scanLines = Array.from(
  { length: 9 },
  (_, index) => ({
    top: `${8 + index * 11}%`,
    delay: index * 0.08,
    rotation: index % 2 === 0 ? 2.5 : -2.5,
  })
);

/* ============================================================
   HOME
============================================================ */

export default function Home() {
  const [cargando, setCargando] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState(0);

  const reducedMotion = useReducedMotion();

  const sectionRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from(
      { length: sectionNames.length + 1 },
      () => null
    )
  );

  const mainRef = useRef<HTMLElement>(null);

  /* ==========================================================
     GLOBAL SCROLL SYSTEM
  ========================================================== */

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 100,
      damping: 30,
      mass: 0.2,
    }
  );

  const progressScale = useTransform(
    smoothProgress,
    [0, 1],
    [0, 1]
  );

  const progressGlow = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.2, 0.7, 1, 0.7, 0.25]
  );

  /* ==========================================================
     GLOBAL CURSOR FIELD
  ========================================================== */

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 65,
    damping: 25,
    mass: 0.45,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 65,
    damping: 25,
    mass: 0.45,
  });

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (reducedMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  /* ==========================================================
     SECTION OBSERVER
  ========================================================== */

  useEffect(() => {
    if (cargando) return;

    const refs = sectionRefs.current.filter(
      Boolean
    ) as HTMLDivElement[];

    if (!refs.length) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-42% 0px -42% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (!visibleEntries.length) return;

        const closest = visibleEntries.reduce(
          (previous, current) => {
            const previousDistance = Math.abs(
              previous.boundingClientRect.top -
                window.innerHeight / 2
            );

            const currentDistance = Math.abs(
              current.boundingClientRect.top -
                window.innerHeight / 2
            );

            return currentDistance < previousDistance
              ? current
              : previous;
          }
        );

        const index =
          sectionRefs.current.indexOf(
            closest.target as HTMLDivElement
          );

        if (index >= 0) {
          setSeccionActiva(index);
        }
      },
      observerOptions
    );

    refs.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, [cargando]);

  /* ==========================================================
     REFS
  ========================================================== */

  const setRef =
    (index: number) =>
    (element: HTMLDivElement | null) => {
      sectionRefs.current[index] = element;
    };

  /* ==========================================================
     PRELOADER
  ========================================================== */

  if (cargando) {
    return (
      <Preloader
        onComplete={() => setCargando(false)}
      />
    );
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main
      ref={mainRef}
      onPointerMove={handlePointerMove}
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-black
        text-white
        selection:bg-[#B4FF39]
        selection:text-black
      "
    >
      {/* ======================================================
          GLOBAL UI
      ====================================================== */}

      <SectionIndicator
        active={seccionActiva}
        total={sectionRefs.current.length}
      />

      <Navbar />

      {/* ======================================================
          GLOBAL PROGRESS
      ====================================================== */}

      <motion.div
        style={{
          scaleX: progressScale,
          opacity: progressGlow,
          transformOrigin: 'left center',
        }}
        className="
          pointer-events-none
          fixed
          left-0
          right-0
          top-0
          z-[100]
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#B4FF39]
          to-transparent
          shadow-[0_0_16px_rgba(180,255,57,0.8)]
        "
      />

      {/* ======================================================
          GLOBAL ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          overflow-hidden
        "
      >
        {/* Cursor radiation */}

        {!reducedMotion && (
          <motion.div
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
            }}
            className="
              absolute
              h-[550px]
              w-[550px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              opacity-70
            "
          >
            <div
              className="
                h-full
                w-full
                rounded-full
              "
              style={{
                background:
                  'radial-gradient(circle, rgba(180,255,57,0.045) 0%, rgba(180,255,57,0.018) 30%, transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
          </motion.div>
        )}

        {/* Central atmospheric light */}

        <div
          className="
            absolute
            left-1/2
            top-[35%]
            h-[900px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
          "
          style={{
            background:
              'radial-gradient(circle, rgba(180,255,57,0.018), transparent 68%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Fine technical grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(180,255,57,0.15) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(180,255,57,0.15) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '100px 100px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        />

        {/* Micro grid */}

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.3) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.3) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '25px 25px',
          }}
        />

        {/* Horizontal scan system */}

        {scanLines.map((line, index) => (
          <motion.div
            key={`scan-${index}`}
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: '-15%',
                  }
            }
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0, 0.55, 0],
                    x: ['-15%', '15%', '35%'],
                  }
            }
            transition={{
              duration: 9 + index * 0.5,
              repeat: Infinity,
              delay: line.delay,
              ease: 'linear',
            }}
            className="
              absolute
              left-[-20%]
              h-px
              w-[140%]
              bg-gradient-to-r
              from-transparent
              via-[#B4FF39]/[0.035]
              to-transparent
            "
            style={{
              top: line.top,
              transform: `rotate(${line.rotation}deg)`,
            }}
          />
        ))}

        {/* Ambient particles */}

        {ambientParticles.map(
          (particle, index) => (
            <motion.div
              key={`ambient-${index}`}
              className="
                absolute
                rounded-full
                bg-[#B4FF39]
              "
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                boxShadow:
                  '0 0 8px rgba(180,255,57,0.45)',
              }}
              animate={
                reducedMotion
                  ? {
                      opacity: 0.05,
                    }
                  : {
                      opacity: [
                        0.015,
                        0.25,
                        0.015,
                      ],
                      scale: [
                        0.7,
                        1.3,
                        0.7,
                      ],
                    }
              }
              transition={{
                duration: particle.duration,
                repeat: reducedMotion
                  ? 0
                  : Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          )
        )}

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.38)_100%)]
          "
        />

        {/* Film grain */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            mix-blend-screen
          "
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.7%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ======================================================
          SIDE TELEMETRY
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          bottom-6
          left-5
          z-40
          hidden
          flex-col
          gap-2
          lg:flex
        "
      >
        <span className="font-mono text-[7px] tracking-[0.3em] text-white/15 [writing-mode:vertical-rl]">
          COFIWORK
        </span>

        <span className="h-20 w-px bg-gradient-to-b from-[#B4FF39]/30 to-transparent" />
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          bottom-6
          right-5
          z-40
          hidden
          flex-col
          items-end
          gap-2
          lg:flex
        "
      >
        <span className="font-mono text-[7px] tracking-[0.3em] text-white/15 [writing-mode:vertical-rl]">
          DIGITAL ATELIER
        </span>

        <span className="h-20 w-px bg-gradient-to-b from-[#B4FF39]/20 to-transparent" />
      </div>

      {/* ======================================================
          HERO
      ====================================================== */}

      <div
        ref={setRef(0)}
        id="inicio"
        className="relative z-10"
      >
        <Hero />
      </div>

      {/* ======================================================
          BRAND SIGNAL
      ====================================================== */}

      <section
        aria-label="COFIWORK brand signal"
        className="
          relative
          z-10
          overflow-hidden
          border-y
          border-[#B4FF39]/15
          bg-black
          py-10
        "
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.035),transparent_60%)]" />

        <div className="relative">
          <Marquee
            speed={30}
          >
            <span className="mx-8 text-4xl font-black uppercase tracking-[-0.04em] text-white/[0.09] sm:text-5xl">
              COFIWORK
            </span>

            <span className="text-[#B4FF39]/25">
              /
            </span>

            <span className="mx-8 text-4xl font-black uppercase tracking-[-0.04em] text-white/[0.09] sm:text-5xl">
              TU WEB A MEDIDA
            </span>

            <span className="text-[#B4FF39]/25">
              /
            </span>

            <span className="mx-8 text-4xl font-black uppercase tracking-[-0.04em] text-white/[0.09] sm:text-5xl">
              SIN PLANTILLAS
            </span>

            <span className="text-[#B4FF39]/25">
              /
            </span>

            <span className="mx-8 text-4xl font-black uppercase tracking-[-0.04em] text-white/[0.09] sm:text-5xl">
              HECHA PARA VENDER
            </span>

            <span className="text-[#B4FF39]/25">
              /
            </span>
          </Marquee>
        </div>
      </section>

      {/* ======================================================
          ABOUT
      ====================================================== */}

      <div
        ref={setRef(1)}
        id="quien-soy"
        className="relative z-10"
      >
        <About />
      </div>

      {/* ======================================================
          SERVICES
      ====================================================== */}

      <div
        ref={setRef(2)}
        id="servicios"
        className="relative z-10"
      >
        <Services />
      </div>

      {/* ======================================================
          FEATURES
      ====================================================== */}

      <div
        ref={setRef(3)}
        id="destacados"
        className="relative z-10"
      >
        <Features />
      </div>

      {/* ======================================================
          PROJECTS
      ====================================================== */}

      <div
        ref={setRef(4)}
        id="proyectos"
        className="relative z-10"
      >
        <Projects />
      </div>

      {/* ======================================================
          PROCESS
      ====================================================== */}

      <div
        ref={setRef(5)}
        id="proceso"
        className="relative z-10"
      >
        <Process />
      </div>

      {/* ======================================================
          PRICING
      ====================================================== */}

      <section
        className="relative z-10"
        id="precios"
      >
        <Pricing />
      </section>

      {/* ======================================================
          CLOSING
      ====================================================== */}

      <section
        className="relative z-10"
        id="contacto"
      >
        <Closing />
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10">
        <Footer />
      </footer>

      {/* ======================================================
          FINAL ATMOSPHERIC FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-[30rem]
          bg-gradient-to-t
          from-[#B4FF39]/[0.018]
          via-transparent
          to-transparent
        "
      />
    </main>
  );
}