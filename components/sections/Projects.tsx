'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const jetonEase = [0.16, 1, 0.3, 1] as [
  number,
  number,
  number,
  number
];

const proyectos = [
  {
    titulo: 'Desarrollo Web Profesional',
    descripcion:
      'Diseño y desarrollo pensado para atraer clientes y mostrar servicios con presencia profesional.',
    imagen: '/foto1.jpeg',
    code: 'SYS.01',
    category: 'DEVELOPMENT',
  },
  {
    titulo: 'Soluciones a Medida',
    descripcion:
      'Cada proyecto construido desde cero, no desde plantillas. Adaptado a lo que necesitás conseguir.',
    imagen: '/foto2.jpeg',
    code: 'SYS.02',
    category: 'CUSTOM',
  },
  {
    titulo: 'Presencia Completa',
    descripcion:
      'Web completa con información, ubicación, contacto directo y todo listo para crecer.',
    imagen: '/foto3.jpeg',
    code: 'SYS.03',
    category: 'DIGITAL PRESENCE',
  },
];

/* ============================================================
   DETERMINISTIC RANDOM
   Evita Math.random() para no generar diferencias entre renders.
============================================================ */

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/* ============================================================
   GLOBAL POINTER
============================================================ */

const pointer = {
  x: 0,
  y: 0,
};

/* ============================================================
   GALAXY PARTICLES
============================================================ */

function GalaxyParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius = Math.pow(seededRandom(i + 1), 0.55) * 8;

      const angle =
        seededRandom(i + 100) * Math.PI * 2 +
        radius * 0.75;

      const spiral = radius * 0.35;

      positions[i3] =
        Math.cos(angle + spiral) * radius;

      positions[i3 + 1] =
        (seededRandom(i + 200) - 0.5) *
        (1.2 + radius * 0.15);

      positions[i3 + 2] =
        Math.sin(angle + spiral) * radius;
    }

    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x +=
      (pointer.y * 0.08 - pointsRef.current.rotation.x) *
      delta;

    pointsRef.current.rotation.z +=
      (pointer.x * 0.05 - pointsRef.current.rotation.z) *
      delta;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      scale={1.15}
    >
      <pointsMaterial
        color="#B4FF39"
        size={0.025}
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ============================================================
   HOLOGRAPHIC CORE
============================================================ */

function HolographicCore() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  const rings = useMemo(() => {
    return [1.3, 1.65, 2.05, 2.5];
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.22;

    group.current.rotation.x +=
      (pointer.y * 0.12 - group.current.rotation.x) *
      delta;

    group.current.rotation.z +=
      (pointer.x * 0.1 - group.current.rotation.z) *
      delta;

    if (core.current) {
      const pulse =
        1 +
        Math.sin(state.clock.elapsedTime * 2.2) *
          0.08;

      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* CORE */}

      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 2]} />

        <meshBasicMaterial
          color="#B4FF39"
          wireframe
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={0.38}>
        <sphereGeometry args={[1, 32, 32] as [number, number, number]} />

        <meshBasicMaterial
          color="#B4FF39"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ORBITAL RINGS */}

      {rings.map((radius, index) => (
        <mesh
          key={radius}
          rotation={[
            index * 0.7,
            index * 0.35,
            index * 0.9,
          ]}
        >
          <torusGeometry
            args={[
              radius,
              0.008,
              8,
              128,
            ]}
          />

          <meshBasicMaterial
            color={
              index % 2 === 0
                ? '#B4FF39'
                : '#FFFFFF'
            }
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <pointLight
        color="#B4FF39"
        intensity={7}
        distance={7}
      />
    </group>
  );
}

/* ============================================================
   ENERGY CONNECTIONS
============================================================ */

function EnergyLines() {
  const lineOne = useMemo(
    (): THREE.Vector3Tuple[] => [
      [-5.5, 0, 0],
      [-2.2, 0.1, 0],
      [0, 0, 0] as [number, number, number],
    ],
    []
  );

  const lineTwo = useMemo(
    (): THREE.Vector3Tuple[] => [
      [0, 0, 0] as [number, number, number],
      [2.2, -0.1, 0],
      [5.5, 0, 0],
    ],
    []
  );

  return (
    <>
      <Line
        points={lineOne}
        color="#B4FF39"
        transparent
        opacity={0.18}
        lineWidth={1}
      />

      <Line
        points={lineTwo}
        color="#B4FF39"
        transparent
        opacity={0.18}
        lineWidth={1}
      />
    </>
  );
}

/* ============================================================
   THREE SCENE
============================================================ */

function ProjectsScene({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const scene = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!scene.current) return;

    const progress = scrollProgress.current;

    /*
      El sistema literalmente "entra" en la galaxia
      mientras el usuario avanza.
    */

    const targetZ = progress * 4.5;

    scene.current.position.z +=
      (targetZ - scene.current.position.z) *
      delta *
      3;

    scene.current.rotation.y +=
      (pointer.x * 0.08 - scene.current.rotation.y) *
      delta;

    scene.current.rotation.x +=
      (-pointer.y * 0.05 - scene.current.rotation.x) *
      delta;
  });

  return (
    <group ref={scene}>
      <GalaxyParticles />

      <HolographicCore />

      <EnergyLines />
    </group>
  );
}

/* ============================================================
   HUD CORNERS
============================================================ */

function HUDCorners() {
  return (
    <>
      <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-[#B4FF39]/50" />
      <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-[#B4FF39]/50" />
      <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-[#B4FF39]/20" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-[#B4FF39]/20" />
    </>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({
  proyecto,
  index,
}: {
  proyecto: (typeof proyectos)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 80,
        rotateX: 12,
        filter: 'blur(12px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        margin: '-100px',
      }}
      transition={{
        duration: 1,
        delay: index * 0.16,
        ease: jetonEase,
      }}
      className="group relative"
    >
      {/* CARD */}

      <div
        className="
          relative
          overflow-hidden
          border
          border-white/[0.08]
          bg-black/35
          backdrop-blur-[3px]
          transition-all
          duration-700
          group-hover:border-[#B4FF39]/40
        "
      >
        <HUDCorners />

        {/* TOP DATA */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-20
            flex
            items-center
            justify-between
            border-b
            border-white/[0.08]
            bg-black/35
            px-4
            py-3
            font-mono
            text-[7px]
            uppercase
            tracking-[0.3em]
            text-white/40
          "
        >
          <span>{proyecto.code}</span>

          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#B4FF39] shadow-[0_0_8px_#B4FF39]" />
            ONLINE
          </span>
        </div>

        {/* IMAGE */}

        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={proyecto.imagen}
            alt={proyecto.titulo}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-out
              group-hover:scale-[1.08]
            "
          />

          {/* HOLOGRAM OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(rgba(180,255,57,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(180,255,57,0.04)_1px,transparent_1px)]
              bg-[size:32px_32px]
              opacity-60
            "
          />

          {/* DARK DEPTH */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/10
              to-transparent
            "
          />

          {/* SCANNER */}

          <motion.div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#B4FF39]
              to-transparent
              shadow-[0_0_14px_#B4FF39]
            "
            animate={{
              y: ['0%', '280px'],
              opacity: [0, 1, 0] as [number, number, number],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              repeatDelay: 2.5,
              delay: index * 0.8,
              ease: 'linear',
            }}
          />

          {/* IMAGE INDEX */}

          <div
            className="
              absolute
              bottom-4
              left-4
              z-10
              font-mono
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-[#B4FF39]/60
            "
          >
            FRAME // 0{index + 1}
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="relative mt-6 pl-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#B4FF39]/60">
            {proyecto.category}
          </span>

          <span className="h-px w-8 bg-white/10" />
        </div>

        <h3
          className="
            text-2xl
            font-bold
            tracking-tight
            text-white
            transition-colors
            duration-300
            group-hover:text-[#B4FF39]
          "
        >
          {proyecto.titulo}
        </h3>

        <p className="mt-3 max-w-md text-base leading-relaxed text-white/50">
          {proyecto.descripcion}
        </p>
      </div>
    </motion.article>
  );
}

/* ============================================================
   MAIN
============================================================ */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const galaxyScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7, 1.15, 1.8]
  );

  const galaxyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [0, 0.8, 0.65, 0]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on(
      'change',
      (value) => {
        scrollProgress.current = value;
      }
    );

    return unsubscribe;
  }, [scrollYProgress]);

  /* ==========================================================
     POINTER SYSTEM
  ========================================================== */

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      pointer.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointer.y =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener(
      'pointermove',
      handlePointer,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointer
      );
    };
  }, []);

  /* ==========================================================
     GSAP SYSTEM ACTIVATION
  ========================================================== */

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-project-system]',
        {
          opacity: 0,
          letterSpacing: '0.6em',
        },
        {
          opacity: 1,
          letterSpacing: '0.35em',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: undefined,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-t
        border-white/5
        px-5
        py-32
        sm:px-6
      "
    >
      {/* ======================================================
          DEEP SPACE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_45%,rgba(180,255,57,0.07),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.025),transparent_42%)]
        "
      />

      {/* ======================================================
          THREE.JS GALAXY
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          scale: galaxyScale,
          opacity: galaxyOpacity,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[46%]
          h-[800px]
          w-[1100px]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <Canvas
          camera={{
            position: [0, 0, 11] as [number, number, number],
            fov: 48,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ProjectsScene
            scrollProgress={scrollProgress}
          />
        </Canvas>
      </motion.div>

      {/* ======================================================
          SECTION CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 1,
            ease: jetonEase,
          }}
          className="relative mb-20"
        >
          {/* HEADER HUD */}

          <div
            data-project-system
            className="
              mb-5
              flex
              items-center
              gap-3
              font-mono
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-[#B4FF39]/60
            "
          >
            <span className="h-px w-10 bg-[#B4FF39]/50" />

            COFIWORK // PROJECT ARCHIVE

            <span className="h-1 w-1 rounded-full bg-[#B4FF39]" />

            SYSTEM ONLINE
          </div>

          <h2
            className="
              text-5xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.045em]
              sm:text-6xl
              md:text-7xl
            "
          >
            Algunos{' '}
            <span
              className="
                text-[#B4FF39]
                [text-shadow:0_0_35px_rgba(180,255,57,0.18)]
              "
            >
              proyectos
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-white/50 sm:text-xl">
            Una web con un buen propósito.
          </p>

          {/* HEADER TELEMETRY */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-x-8
              gap-y-3
              font-mono
              text-[7px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            <span>ARCHIVE // 003</span>
            <span>VISUAL SYSTEM // ACTIVE</span>
            <span>SCANNING // PANORAMA</span>
          </div>
        </motion.div>

        {/* ====================================================
            PANORAMIC PROJECT SYSTEM

            IMPORTANT:
            Las tres imágenes siguen siendo independientes,
            pero NO separamos visualmente sus imágenes con
            gutters. El conjunto mantiene la sensación de
            panorama fragmentado.
        ==================================================== */}

        <div
          className="
            relative
            grid
            gap-0
            md:grid-cols-3
          "
          style={{
            perspective: '1800px',
          }}
        >
          {/* CENTRAL ENERGY AXIS */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              z-30
              hidden
              h-full
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#B4FF39]/20
              to-transparent
              md:block
            "
          />

          {proyectos.map((proyecto, i) => (
            <ProjectCard
              key={proyecto.titulo}
              proyecto={proyecto}
              index={i}
            />
          ))}
        </div>

        {/* ====================================================
            SYSTEM FOOTER
        ==================================================== */}

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
            delay: 0.3,
            duration: 0.8,
            ease: jetonEase,
          }}
          className="
            mt-20
            flex
            items-center
            justify-center
            gap-4
            font-mono
            text-[7px]
            uppercase
            tracking-[0.4em]
            text-white/20
          "
        >
          <span className="h-px w-12 bg-white/10" />

          <span>END OF VISUAL ARCHIVE</span>

          <motion.span
            className="h-1 w-1 rounded-full bg-[#B4FF39]"
            animate={{
              opacity: [0.25, 1, 0.25],
              boxShadow: [
                '0 0 0 rgba(180,255,57,0)',
                '0 0 14px rgba(180,255,57,.9)',
                '0 0 0 rgba(180,255,57,0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <span className="h-px w-12 bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
