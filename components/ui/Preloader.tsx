'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================================
   PALETA / CONFIG
============================================================ */

const GREEN = '#B4FF39';
const GREEN_DARK = '#5CB811';
const GREEN_SOFT = '#D4FF73';

/* ============================================================
   ANILLO ENERGÉTICO
============================================================ */

function EnergyRing({
  radius,
  thickness,
  color,
  speed,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  opacity = 0.8,
  pulse = false,
}: {
  radius: number;
  thickness: number;
  color: string;
  speed: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  opacity?: number;
  pulse?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x =
      rotationX + Math.sin(t * 0.25) * 0.08;

    meshRef.current.rotation.y =
      rotationY + t * speed;

    meshRef.current.rotation.z =
      rotationZ + Math.cos(t * 0.2) * 0.06;

    if (pulse) {
      const scale =
        1 + Math.sin(t * 2.2) * 0.015;

      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry
        args={[
          radius,
          thickness,
          24,
          160,
        ]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ============================================================
   ORBES ORBITALES
============================================================ */

function EnergyOrb({
  radius,
  speed,
  color,
  size = 0.08,
  offset = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  size?: number;
  offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t =
      state.clock.elapsedTime * speed + offset;

    ref.current.position.x =
      Math.cos(t) * radius;

    ref.current.position.z =
      Math.sin(t) * radius;

    ref.current.position.y =
      Math.sin(t * 1.7) * radius * 0.28;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ============================================================
   NÚCLEO CENTRAL
============================================================ */

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      const pulse =
        1 + Math.sin(t * 2.4) * 0.035;

      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y = t * 0.35;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.6;
      innerRef.current.rotation.z = -t * 0.45;
    }
  });

  return (
    <group>
      {/* Halo exterior */}
      <mesh scale={1.45}>
        <sphereGeometry args={[0.72, 32, 32]} />

        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Núcleo */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.52, 48, 48]} />

        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Estructura interna */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.62, 1]} />

        <meshBasicMaterial
          color={GREEN_SOFT}
          wireframe
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Punto de energía */}
      <mesh>
        <sphereGeometry args={[0.17, 24, 24]} />

        <meshBasicMaterial
          color="#F0FFC2"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   PARTÍCULAS / POLVO ENERGÉTICO
============================================================ */

function EnergyParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 650;

  const positions = new Float32Array(
    particleCount * 3
  );

  const sizes = new Float32Array(
    particleCount
  );

  for (let i = 0; i < particleCount; i++) {
    const radius =
      3.5 + Math.random() * 5.5;

    const angle =
      Math.random() * Math.PI * 2;

    const y =
      (Math.random() - 0.5) * 7;

    positions[i * 3] =
      Math.cos(angle) * radius;

    positions[i * 3 + 1] = y;

    positions[i * 3 + 2] =
      Math.sin(angle) * radius;

    sizes[i] =
      0.015 + Math.random() * 0.045;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.018;

    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.12) *
      0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>

      <pointsMaterial
        color={GREEN}
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ============================================================
   LÍNEAS ORBITALES / HUD 3D
============================================================ */

function OrbitalGeometry() {
  return (
    <group>
      <EnergyRing
        radius={2.15}
        thickness={0.012}
        color={GREEN_SOFT}
        speed={0.42}
        rotationX={1.05}
        opacity={0.7}
      />

      <EnergyRing
        radius={2.45}
        thickness={0.018}
        color={GREEN}
        speed={-0.28}
        rotationX={0.55}
        rotationZ={0.35}
        opacity={0.75}
        pulse
      />

      <EnergyRing
        radius={2.9}
        thickness={0.009}
        color={GREEN_DARK}
        speed={0.22}
        rotationX={-0.4}
        rotationZ={-0.25}
        opacity={0.55}
      />

      <EnergyRing
        radius={3.35}
        thickness={0.006}
        color={GREEN_SOFT}
        speed={-0.13}
        rotationX={0.72}
        rotationZ={0.1}
        opacity={0.4}
      />

      <EnergyRing
        radius={3.85}
        thickness={0.004}
        color={GREEN}
        speed={0.08}
        rotationX={-0.3}
        rotationZ={0.5}
        opacity={0.25}
      />

      <EnergyOrb
        radius={2.5}
        speed={1.7}
        color={GREEN_SOFT}
        size={0.075}
      />

      <EnergyOrb
        radius={2.9}
        speed={-1.2}
        color={GREEN}
        size={0.055}
        offset={2}
      />

      <EnergyOrb
        radius={3.45}
        speed={0.8}
        color={GREEN_SOFT}
        size={0.045}
        offset={4}
      />

      <EnergyOrb
        radius={3.85}
        speed={-0.5}
        color={GREEN}
        size={0.035}
        offset={1}
      />
    </group>
  );
}

/* ============================================================
   ESCENA 3D
============================================================ */

function EnergyScene() {
  return (
    <>
      <ambientLight intensity={0.12} />

      <pointLight
        position={[0, 0, 2]}
        color={GREEN}
        intensity={5}
        distance={10}
      />

      <pointLight
        position={[4, 2, -3]}
        color={GREEN_SOFT}
        intensity={2}
        distance={12}
      />

      <EnergyCore />

      <OrbitalGeometry />

      <EnergyParticles />

      <Stars
        radius={70}
        depth={55}
        count={500}
        factor={3}
        saturation={0}
        fade
        speed={0.12}
      />
    </>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
============================================================ */

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let valor = 0;

    const intervalo = setInterval(() => {
      valor += 1;

      if (valor >= 100) {
        valor = 100;
        clearInterval(intervalo);

        setTimeout(() => {
          onComplete();
        }, 950);
      }

      setProgreso(valor);
    }, 24);

    return () => {
      clearInterval(intervalo);
    };
  }, [onComplete]);

  const estado =
    progreso < 18
      ? 'INICIALIZANDO NÚCLEO'
      : progreso < 38
        ? 'SINCRONIZANDO SISTEMA'
        : progreso < 58
          ? 'CALIBRANDO INTERFAZ'
          : progreso < 78
            ? 'COMPILANDO EXPERIENCIA'
            : progreso < 100
              ? 'ESTABILIZANDO SISTEMA'
              : 'SISTEMA LISTO';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white"
        initial={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 1.035,
          filter: 'blur(8px)',
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* ==================================================
            ATMÓSFERA
        ================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0">
          <Canvas
            camera={{
              position: [0, 0, 8],
              fov: 48,
            }}
            dpr={[1, 1.7]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <EnergyScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Vignette cinematográfico */}

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(
                circle at center,
                transparent 0%,
                rgba(0,0,0,0.08) 32%,
                rgba(0,0,0,0.72) 100%
              )
            `,
          }}
        />

        {/* Glow central */}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,255,57,0.08) 0%, rgba(180,255,57,0.025) 30%, transparent 68%)',
            filter: 'blur(25px)',
          }}
          animate={{
            scale: [0.92, 1.05, 0.92],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* ==================================================
            HUD SUPERIOR
        ================================================== */}

        <div className="pointer-events-none absolute left-6 right-6 top-6 z-10 flex items-start justify-between sm:left-10 sm:right-10 sm:top-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="flex items-center gap-3"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: GREEN,
                boxShadow:
                  '0 0 12px rgba(180,255,57,0.9)',
              }}
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/40">
              COFIWORK
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="text-right"
          >
            <p className="font-mono text-[9px] tracking-[0.25em] text-white/25">
              CORE // 01
            </p>

            <p
              className="mt-1 font-mono text-[9px] tracking-[0.2em]"
              style={{
                color: 'rgba(180,255,57,0.5)',
              }}
            >
              ONLINE
            </p>
          </motion.div>
        </div>

        {/* ==================================================
            MARCAS LATERALES
        ================================================== */}

        <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden sm:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/20">
              DIGITAL SYSTEM
            </span>

            <span className="font-mono text-[8px] tracking-[0.25em] text-white/10">
              2026 / BUILD 01
            </span>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden sm:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/20">
              SYSTEM STATUS
            </span>

            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: GREEN,
                boxShadow:
                  '0 0 10px rgba(180,255,57,0.8)',
              }}
            />
          </motion.div>
        </div>

        {/* ==================================================
            CONTENIDO CENTRAL
        ================================================== */}

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
          <div className="flex w-full max-w-3xl flex-col items-center text-center">

            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-8 flex items-center gap-4"
            >
              <span
                className="h-px w-8"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #B4FF39)',
                }}
              />

              <span
                className="text-[10px] font-semibold uppercase tracking-[0.42em]"
                style={{
                  color: 'rgba(180,255,57,0.68)',
                }}
              >
                EXPERIENCIA DIGITAL
              </span>

              <span
                className="h-px w-8"
                style={{
                  background:
                    'linear-gradient(to left, transparent, #B4FF39)',
                }}
              />
            </motion.div>

            {/* ==================================================
                LOGO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
                filter: 'blur(14px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1.35,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                className="
                  text-6xl
                  font-black
                  uppercase
                  leading-none
                  tracking-[0.22em]
                  sm:text-8xl
                  sm:tracking-[0.28em]
                  lg:text-9xl
                "
              >
                <span className="text-white">
                  COFI
                </span>

                <span
                  className="relative"
                  style={{
                    color: GREEN,
                    textShadow: `
                      0 0 18px rgba(180,255,57,0.75),
                      0 0 45px rgba(180,255,57,0.35),
                      0 0 90px rgba(180,255,57,0.18)
                    `,
                  }}
                >
                  WORK
                </span>
              </h1>
            </motion.div>

            {/* Descriptor */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.75,
                duration: 0.8,
              }}
              className="mt-5 text-[10px] font-medium uppercase tracking-[0.5em] text-white/35 sm:text-xs"
            >
              DISEÑO · ESTRATEGIA · DESARROLLO
            </motion.p>

            {/* ==================================================
                NÚCLEO / ESTADO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.8,
              }}
              className="mt-16 w-full max-w-lg"
            >
              {/* Status */}

              <div className="mb-3 flex items-end justify-between">
                <div className="text-left">
                  <p
                    className="font-mono text-[9px] font-medium uppercase tracking-[0.28em]"
                    style={{
                      color: 'rgba(180,255,57,0.65)',
                    }}
                  >
                    {estado}
                  </p>
                </div>

                <motion.p
                  className="font-mono text-xs tracking-[0.15em]"
                  style={{
                    color: 'rgba(180,255,57,0.45)',
                  }}
                >
                  SYS_{String(progreso).padStart(3, '0')}
                </motion.p>
              </div>

              {/* Barra */}

              <div
                className="relative h-[3px] w-full overflow-hidden"
                style={{
                  background:
                    'rgba(180,255,57,0.08)',
                  boxShadow:
                    '0 0 25px rgba(180,255,57,0.05)',
                }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${progreso}%`,
                    background:
                      'linear-gradient(90deg, #5CB811, #B4FF39, #E8FFB0)',
                    boxShadow: `
                      0 0 8px rgba(180,255,57,0.95),
                      0 0 22px rgba(180,255,57,0.5)
                    `,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: 'linear',
                  }}
                />

                {/* Línea de escaneo */}

                <motion.div
                  className="absolute bottom-0 top-0 w-16"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                    filter: 'blur(2px)',
                  }}
                  animate={{
                    x: ['-4rem', '32rem'],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>

              {/* Metadata */}

              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/20">
                  INITIALIZING
                </span>

                <motion.span
                  className="font-mono text-[8px] tracking-[0.3em]"
                  style={{
                    color: 'rgba(180,255,57,0.42)',
                  }}
                  animate={{
                    opacity: [0.35, 0.9, 0.35],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                >
                  {progreso < 100
                    ? 'PLEASE WAIT'
                    : 'ACCESS GRANTED'}
                </motion.span>
              </div>
            </motion.div>

            {/* ==================================================
                PORCENTAJE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 1,
                duration: 0.8,
              }}
              className="mt-8"
            >
              <div
                className="font-mono text-3xl font-light tracking-[0.12em] sm:text-4xl"
                style={{
                  color: GREEN,
                  textShadow:
                    '0 0 25px rgba(180,255,57,0.4)',
                }}
              >
                {String(progreso).padStart(3, '0')}
                <span className="ml-1 text-lg text-white/20">
                  %
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==================================================
            SCANLINES SUTILÍSIMAS
        ================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 4px)',
          }}
        />

        {/* ==================================================
            FLASH FINAL
        ================================================== */}

        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity:
              progreso === 100 ? [0, 0.12, 0] : 0,
          }}
          transition={{
            duration: 0.65,
            ease: 'easeOut',
          }}
          style={{
            background: GREEN,
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}