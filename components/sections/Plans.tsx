'use client';

import {
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import * as THREE from 'three';
import gsap from 'gsap';

import { plans, WA_URL } from '@/lib/constants';

/* =========================================================
   TYPES
========================================================= */

type PlanData = (typeof plans)[number];

type PlanCardProps = {
  plan: PlanData;
  index: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const LIME = '#B4FF39';
const LIME_SOFT = '#E9FFC4';

/* =========================================================
   SEEDED RANDOM
========================================================= */

function seededRandom(seed: number) {
  const x =
    Math.sin(seed * 12.9898) *
    43758.5453;

  return x - Math.floor(x);
}

/* =========================================================
   THREE — AMBIENT PARTICLES
========================================================= */

function AmbientParticles() {
  const pointsRef =
    useRef<THREE.Points>(null);

  const count = 1100;

  const geometry = useMemo(() => {
    const positions =
      new Float32Array(count * 3);

    const sizes =
      new Float32Array(count);

    const randomness =
      new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius =
        2.5 +
        Math.pow(
          seededRandom(i * 13),
          1.7
        ) *
          8;

      const angle =
        seededRandom(i * 17) *
        Math.PI *
        2;

      const height =
        (
          seededRandom(i * 23) -
          0.5
        ) *
        5;

      positions[i * 3] =
        Math.cos(angle) *
        radius;

      positions[i * 3 + 1] =
        height;

      positions[i * 3 + 2] =
        Math.sin(angle) *
        radius;

      sizes[i] =
        0.25 +
        seededRandom(i * 31) *
          1.2;

      randomness[i] =
        seededRandom(i * 47);
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    geo.setAttribute(
      'aSize',
      new THREE.BufferAttribute(
        sizes,
        1
      )
    );

    geo.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(
        randomness,
        1
      )
    );

    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,

      uniforms: {
        uTime: {
          value: 0,
        },
      },

      vertexShader: `
        uniform float uTime;

        attribute float aSize;
        attribute float aRandom;

        varying float vRandom;

        void main() {
          vec3 p = position;

          float wave =
            sin(
              uTime * 0.25 +
              aRandom * 30.0
            );

          p.y += wave * 0.035;

          vec4 mvPosition =
            modelViewMatrix *
            vec4(p, 1.0);

          gl_PointSize =
            aSize *
            (
              95.0 /
              max(
                -mvPosition.z,
                1.0
              )
            );

          gl_Position =
            projectionMatrix *
            mvPosition;

          vRandom = aRandom;
        }
      `,

      fragmentShader: `
        varying float vRandom;

        void main() {
          vec2 uv =
            gl_PointCoord -
            vec2(0.5);

          float distanceFromCenter =
            length(uv);

          float glow =
            smoothstep(
              0.5,
              0.0,
              distanceFromCenter
            );

          float core =
            smoothstep(
              0.12,
              0.0,
              distanceFromCenter
            );

          vec3 lime =
            vec3(
              0.705,
              1.0,
              0.223
            );

          vec3 white =
            vec3(
              0.95,
              1.0,
              0.82
            );

          vec3 color =
            mix(
              lime,
              white,
              vRandom * 0.45
            );

          float alpha =
            glow *
            (
              0.035 +
              core * 0.45
            );

          gl_FragColor =
            vec4(
              color,
              alpha
            );
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    material.uniforms.uTime.value =
      state.clock.elapsedTime;

    pointsRef.current.rotation.y +=
      0.00035;

    pointsRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime *
          0.12
      ) *
      0.02;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}

/* =========================================================
   THREE — ENERGY RINGS
========================================================= */

function EnergyRings() {
  const groupRef =
    useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from(
      { length: 8 },
      (_, index) => {
        const radius =
          2.8 +
          index * 0.62;

        const segments = 160;

        const positions =
          new Float32Array(
            segments * 3
          );

        for (
          let i = 0;
          i < segments;
          i++
        ) {
          const angle =
            (i / segments) *
            Math.PI *
            2;

          const distortion =
            Math.sin(
              angle *
                (
                  3 +
                  index
                )
            ) *
            0.025;

          const r =
            radius +
            distortion;

          positions[i * 3] =
            Math.cos(angle) * r;

          positions[i * 3 + 1] =
            (
              index -
              3.5
            ) *
            0.08;

          positions[i * 3 + 2] =
            Math.sin(angle) * r;
        }

        const geometry =
          new THREE.BufferGeometry();

        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(
            positions,
            3
          )
        );

        return {
          geometry,
          radius,
          opacity:
            0.025 +
            (
              index % 3
            ) *
              0.018,
        };
      }
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y =
      state.clock.elapsedTime *
      0.025;

    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime *
          0.08
      ) *
      0.05;
  });

  return (
    <group ref={groupRef}>
      {rings.map(
        (ring, index) => (
          <line
            key={index}
            geometry={
              ring.geometry
            }
            rotation={[
              index % 2 === 0
                ? 0.08
                : -0.08,
              index *
                0.17,
              index *
                0.12,
            ]}
          >
            <lineBasicMaterial
              color={LIME}
              transparent
              opacity={
                ring.opacity
              }
              depthWrite={false}
              blending={
                THREE.AdditiveBlending
              }
            />
          </line>
        )
      )}
    </group>
  );
}

/* =========================================================
   THREE — CENTRAL CORE
========================================================= */

function EnergyCore() {
  const groupRef =
    useRef<THREE.Group>(null);

  const coreRef =
    useRef<THREE.Mesh>(null);

  const innerRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    groupRef.current.rotation.y =
      time * 0.08;

    groupRef.current.rotation.z =
      Math.sin(time * 0.3) *
      0.06;

    if (coreRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2) *
          0.025;

      coreRef.current.scale.setScalar(
        pulse
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.x =
        time * 0.4;

      innerRef.current.rotation.y =
        -time * 0.65;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry
          args={[
            0.42,
            2,
          ]}
        />

        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0.13}
          wireframe
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry
          args={[
            0.18,
            1,
          ]}
        />

        <meshBasicMaterial
          color={LIME_SOFT}
          transparent
          opacity={0.8}
          wireframe
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[
            0.045,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color={LIME_SOFT}
        />
      </mesh>

      <pointLight
        color={LIME}
        intensity={1.8}
        distance={4}
      />
    </group>
  );
}

/* =========================================================
   THREE — SCENE
========================================================= */

function PlansScene() {
  return (
    <>
      <ambientLight intensity={0.15} />

      <EnergyRings />

      <EnergyCore />

      <AmbientParticles />
    </>
  );
}

/* =========================================================
   PLAN CARD
========================================================= */

function PlanCard({
  plan,
  index,
}: PlanCardProps) {
  const [hovered, setHovered] =
    useState(false);

  const reducedMotion =
    useReducedMotion();

  const cardRef =
    useRef<HTMLDivElement>(null);

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotateX =
    useSpring(
      useTransform(y, [-100, 100], [5, -5]),
      {
        stiffness: 220,
        damping: 24,
        mass: 0.45,
      }
    );

  const rotateY =
    useSpring(
      useTransform(x, [-100, 100], [-5, 5]),
      {
        stiffness: 220,
        damping: 24,
        mass: 0.45,
      }
    );

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      reducedMotion ||
      !cardRef.current
    ) {
      return;
    }

    const rect =
      cardRef.current.getBoundingClientRect();

    const relativeX =
      event.clientX -
      rect.left -
      rect.width / 2;

    const relativeY =
      event.clientY -
      rect.top -
      rect.height / 2;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handlePointerLeave =
    () => {
      x.set(0);
      y.set(0);
      setHovered(false);
    };

  const handlePointerEnter =
    () => {
      setHovered(true);

      if (
        cardRef.current &&
        !reducedMotion
      ) {
        gsap.fromTo(
          cardRef.current,
          {
            boxShadow:
              '0 0 0 rgba(180,255,57,0)',
          },
          {
            boxShadow:
              plan.featured
                ? '0 0 80px rgba(180,255,57,0.10)'
                : '0 0 55px rgba(180,255,57,0.055)',
            duration: 0.7,
            ease: 'power3.out',
          }
        );
      }
    };

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
      }}
      onPointerMove={
        handlePointerMove
      }
      onPointerEnter={
        handlePointerEnter
      }
      onPointerLeave={
        handlePointerLeave
      }
      className={`
        group
        relative
        flex
        min-h-[650px]
        flex-col
        overflow-hidden
        rounded-[2rem]
        border
        p-7
        sm:p-8
        lg:p-9
        ${
          plan.featured
            ? `
              border-[#B4FF39]/30
              bg-[#B4FF39]/[0.045]
            `
            : `
              border-white/[0.09]
              bg-white/[0.018]
            `
        }
      `}
    >
      {/* =====================================================
          CARD GRID
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
          [background-size:42px_42px]
          [mask-image:linear-gradient(to_bottom,black,transparent_72%)]
        "
      />

      {/* =====================================================
          MOVING LIGHT
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-1/2
          top-0
          h-[1px]
          w-[200%]
          bg-gradient-to-r
          from-transparent
          via-[#B4FF39]/60
          to-transparent
        "
        animate={
          hovered && !reducedMotion
            ? {
                x: ['-20%', '20%'],
                opacity: [
                  0.1,
                  0.8,
                  0.1,
                ],
              }
            : {
                x: '-10%',
                opacity: 0.15,
              }
        }
        transition={{
          duration: 2.2,
          repeat:
            hovered &&
            !reducedMotion
              ? Infinity
              : 0,
          ease: 'linear',
        }}
      />

      {/* =====================================================
          CORNER SYSTEM
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-12
          w-12
        "
      >
        <span
          className="
            absolute
            right-0
            top-0
            h-3
            w-3
            border-r
            border-t
            border-[#B4FF39]/40
          "
        />

        <span
          className="
            absolute
            bottom-0
            left-0
            h-3
            w-3
            border-b
            border-l
            border-white/10
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div
            className={`
              flex
              items-center
              gap-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              ${
                plan.featured
                  ? 'text-[#B4FF39]'
                  : 'text-white/30'
              }
            `}
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-current
              "
            />

            COFIWORK
          </div>

          <span className="font-mono text-[10px] text-white/20">
            0{index + 1}
          </span>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-5">
            <h3
              className="
                text-3xl
                font-black
                tracking-[-0.045em]
                text-white
                sm:text-4xl
              "
            >
              {plan.name}
            </h3>

            {plan.featured && (
              <span
                className="
                  mb-1
                  shrink-0
                  rounded-full
                  border
                  border-[#B4FF39]/30
                  bg-[#B4FF39]/10
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#B4FF39]
                "
              >
                Recomendado
              </span>
            )}
          </div>

          <p
            className="
              mt-5
              min-h-[84px]
              max-w-md
              text-[15px]
              leading-7
              text-white/50
              sm:text-base
              sm:leading-7
            "
          >
            {plan.description}
          </p>
        </div>
      </div>

      {/* =====================================================
          PRICE
      ====================================================== */}

      <div
        className={`
          relative
          z-10
          mt-8
          overflow-hidden
          rounded-2xl
          border
          p-5
          ${
            plan.featured
              ? `
                border-[#B4FF39]/15
                bg-[#B4FF39]/[0.055]
              `
              : `
                border-white/[0.07]
                bg-black/20
              `
          }
        `}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25">
              Inversión
            </p>

            <p
              className={`
                mt-2
                text-2xl
                font-black
                tracking-[-0.035em]
                sm:text-3xl
                ${
                  plan.featured
                    ? 'text-[#B4FF39]'
                    : 'text-white'
                }
              `}
            >
              {plan.price}
            </p>
          </div>

          <div
            className="
              hidden
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-xs
              text-white/30
              sm:flex
            "
          >
            →
          </div>
        </div>

        <p className="mt-3 text-xs text-white/25">
          {plan.maintenance}
        </p>
      </div>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <div className="relative z-10 mt-8">
        <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/25">
          Incluye
        </p>

        <ul className="space-y-4">
          {plan.features.map(
            (feature, featureIndex) => (
              <motion.li
                key={feature}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    0.15 +
                    index * 0.1 +
                    featureIndex *
                      0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  flex
                  items-start
                  gap-3
                  text-[15px]
                  leading-6
                  text-white/65
                  sm:text-base
                "
              >
                <span
                  className={`
                    mt-[5px]
                    flex
                    h-4
                    w-4
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-[9px]
                    ${
                      plan.featured
                        ? 'border-[#B4FF39]/40 text-[#B4FF39]'
                        : 'border-white/15 text-white/40'
                    }
                  `}
                >
                  ✓
                </span>

                <span>
                  {feature}
                </span>
              </motion.li>
            )
          )}
        </ul>
      </div>

      {/* =====================================================
          CTA
      ====================================================== */}

      <div className="relative z-10 mt-auto pt-10">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            relative
            flex
            min-h-[56px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-full
            px-6
            text-sm
            font-bold
            transition-all
            duration-500
            ${
              plan.featured
                ? `
                  bg-[#B4FF39]
                  text-black
                  shadow-[0_0_0_rgba(180,255,57,0)]
                  hover:shadow-[0_0_45px_rgba(180,255,57,0.20)]
                `
                : `
                  border
                  border-white/15
                  bg-white/[0.025]
                  text-white
                  hover:border-[#B4FF39]/35
                  hover:bg-[#B4FF39]/[0.05]
                `
            }
          `}
        >
          <span className="relative z-10">
            {plan.cta}
          </span>

          <span
            className={`
              absolute
              right-5
              text-lg
              transition-transform
              duration-500
              group-hover:translate-x-1
              ${
                plan.featured
                  ? 'text-black/60'
                  : 'text-[#B4FF39]'
              }
            `}
          >
            →
          </span>

          {plan.featured && (
            <motion.span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                -left-1/2
                w-1/3
                skew-x-[-20deg]
                bg-white/30
                blur-md
              "
              animate={
                !reducedMotion
                  ? {
                      x: [
                        '0%',
                        '420%',
                      ],
                    }
                  : undefined
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />
          )}
        </a>
      </div>

      {/* =====================================================
          BOTTOM TELEMETRY
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-white/[0.06]
          pt-4
        "
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
          COFIWORK / CUSTOM
        </span>

        <span
          className={`
            font-mono
            text-[8px]
            uppercase
            tracking-[0.18em]
            ${
              plan.featured
                ? 'text-[#B4FF39]/45'
                : 'text-white/20'
            }
          `}
        >
          READY
        </span>
      </div>

      {/* =====================================================
          HOVER AURA
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/3
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#B4FF39]/10
          blur-[100px]
        "
        animate={{
          opacity:
            hovered
              ? plan.featured
                ? 0.9
                : 0.45
              : 0,
          scale:
            hovered
              ? 1
              : 0.65,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.article>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Plans() {
  const reducedMotion =
    useReducedMotion();

  return (
    <section
      id="servicios"
      className="
        relative
        isolate
        overflow-hidden
        border-t
        border-white/[0.07]
        bg-[#030403]
        px-5
        py-28
        sm:px-6
        lg:py-40
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[-20%]
            h-[800px]
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-[#B4FF39]/[0.025]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-30
            [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
            [background-size:70px_70px]
            [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]
          "
        />
      </div>

      {/* =====================================================
          THREE WORLD
      ====================================================== */}

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            opacity-80
          "
        >
          <Canvas
            camera={{
              position: [
                0,
                0,
                10,
              ],
              fov: 45,
            }}
            dpr={[1, 1.5]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference:
                'high-performance',
            }}
          >
            <PlansScene />
          </Canvas>
        </div>
      )}

      {/* =====================================================
          TOP SIGNAL
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-[min(900px,80%)]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#B4FF39]/50
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          <div
            className="
              mb-8
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B4FF39]/70" />

            <span
              className="
                font-mono
                text-[9px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-[#B4FF39]/80
              "
            >
              COFIWORK / SERVICIOS
            </span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B4FF39]/70" />
          </div>

          <h2
            className="
              text-5xl
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.055em]
              text-white
              sm:text-6xl
              lg:text-8xl
            "
          >
            Elegí cómo
            <br />
            <span className="text-[#B4FF39]">
              empezamos.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-base
              leading-7
              text-white/45
              sm:text-lg
              sm:leading-8
            "
          >
            Tres formas de construir tu presencia digital.
            Si ya sabés qué necesitás, elegí una. Si no,
            hablamos y lo definimos juntos.
          </p>
        </motion.div>

        {/* =================================================
            SYSTEM LINE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            mt-16
            flex
            max-w-5xl
            items-center
            justify-center
            gap-5
          "
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />

          <span
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39] shadow-[0_0_10px_#B4FF39]" />
            SISTEMA DISPONIBLE
          </span>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
        </motion.div>

        {/* =================================================
            CARDS
        ================================================== */}

        <div
          className="
            mt-10
            grid
            gap-5
            lg:grid-cols-3
            lg:items-stretch
          "
        >
          {plans.map(
            (plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                index={index}
              />
            )
          )}
        </div>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            mt-16
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              leading-7
              text-white/30
              sm:text-base
            "
          >
            ¿No sabés cuál elegir?
            <span className="text-white/55">
              {' '}
              No hace falta que lo sepas.
            </span>{' '}
            Contame qué tenés en mente y vemos juntos qué
            tiene sentido para tu proyecto.
          </p>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              text-sm
              font-semibold
              text-[#B4FF39]
              underline
              decoration-[#B4FF39]/25
              underline-offset-8
              transition-all
              duration-300
              hover:decoration-[#B4FF39]
              hover:gap-4
            "
          >
            Hablar sobre mi proyecto
            <span className="text-base">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}