"use client";

import { useEffect, useMemo, useRef } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { WA_URL } from "@/lib/constants";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const COSMIC = {
  lime: new THREE.Color("#B4FF39"),
  limeSoft: new THREE.Color("#8FCF36"),
  deepGreen: new THREE.Color("#0F2E1A"),
  cosmicViolet: new THREE.Color("#2A1B47"),
  deepBlue: new THREE.Color("#0A1628"),
  midnight: new THREE.Color("#050A14"),
  goldSoft: new THREE.Color("#BFA96E"),
  goldBright: new THREE.Color("#E7CF82"),
  whiteSoft: new THREE.Color("#E8EED4"),
};

const TAU = Math.PI * 2;

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function rnd(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* -------------------------------------------------------------------------- */
/*                                SCENE STATE                                 */
/* -------------------------------------------------------------------------- */

type SceneState = {
  pointer: THREE.Vector2;
  scroll: number;
  velocity: number;
  time: number;
};

function useSceneState() {
  return useMemo<SceneState>(
    () => ({
      pointer: new THREE.Vector2(0, 0),
      scroll: 0,
      velocity: 0,
      time: 0,
    }),
    [],
  );
}

/* -------------------------------------------------------------------------- */
/*                                  NEBULA                                    */
/* -------------------------------------------------------------------------- */

function LivingNebula({
  scene,
}: {
  scene: SceneState;
}) {
  const count = 2600;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const depths = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const seed = rnd(i + 17);
      const seed2 = rnd(i * 1.731 + 9);
      const seed3 = rnd(i * 3.113 + 41);

      const radius = 1.8 + seed * 7.5;
      const angle = seed2 * TAU;

      const spiral = angle + radius * 0.75;

      positions[i3] =
        Math.cos(spiral) *
        radius *
        (0.72 + seed3 * 0.5);

      positions[i3 + 1] =
        (seed3 - 0.5) *
        (2.8 + radius * 0.42);

      positions[i3 + 2] =
        Math.sin(spiral) *
        radius *
        (0.72 + seed2 * 0.5);

      seeds[i] = seed;
      sizes[i] = 0.5 + seed2 * 2.2;
      depths[i] = clamp((radius - 1.8) / 7.5, 0, 1);
    }

    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    geo.setAttribute(
      "aSeed",
      new THREE.BufferAttribute(seeds, 1),
    );

    geo.setAttribute(
      "aSize",
      new THREE.BufferAttribute(sizes, 1),
    );

    geo.setAttribute(
      "aDepth",
      new THREE.BufferAttribute(depths, 1),
    );

    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uVelocity: { value: 0 },
        uPointer: {
          value: new THREE.Vector2(0, 0),
        },

        uBase: {
          value: COSMIC.deepGreen,
        },

        uAccent: {
          value: COSMIC.lime,
        },

        uGold: {
          value: COSMIC.goldBright,
        },
      },

      vertexShader: `
        attribute float aSeed;
        attribute float aSize;
        attribute float aDepth;

        uniform float uTime;
        uniform float uScroll;
        uniform float uVelocity;
        uniform vec2 uPointer;

        varying float vDepth;
        varying float vSeed;

        void main() {
          vec3 p = position;

          float t = uTime * 0.14;

          /* Organic rotation */
          float rotation = t * (0.25 + aSeed * 0.2);

          float c = cos(rotation);
          float s = sin(rotation);

          p.xz = mat2(c, -s, s, c) * p.xz;

          /* Breathing */
          float wave =
            sin(
              p.y * 0.8 +
              aSeed * 8.0 +
              uTime * 0.65
            );

          p += normalize(p + vec3(0.001)) *
            wave *
            (0.025 + aDepth * 0.06);

          /* Spiral deformation */
          float spiral =
            sin(
              atan(p.z, p.x) * 3.0 +
              length(p.xz) * 1.7 -
              uTime * 0.35
            );

          p.y += spiral * 0.08 * aDepth;

          /* Cursor gravity */
          vec2 cursor = uPointer;

          float cursorDistance =
            distance(
              vec2(p.x, p.z) * 0.12,
              cursor
            );

          float cursorInfluence =
            exp(-cursorDistance * 4.0);

          p.x += cursor.x * cursorInfluence * 0.7;
          p.z += cursor.y * cursorInfluence * 0.7;

          /* Scroll field */
          p.y += uScroll * (0.55 + aDepth * 0.7);

          /* Velocity stretch */
          p.z += uVelocity * aDepth * 0.18;

          vec4 mvPosition =
            modelViewMatrix *
            vec4(p, 1.0);

          float perspective =
            250.0 / max(1.0, -mvPosition.z);

          gl_PointSize =
            aSize *
            perspective *
            (0.75 + aDepth * 0.75);

          gl_Position =
            projectionMatrix *
            mvPosition;

          vDepth = aDepth;
          vSeed = aSeed;
        }
      `,

      fragmentShader: `
        uniform vec3 uBase;
        uniform vec3 uAccent;
        uniform vec3 uGold;

        varying float vDepth;
        varying float vSeed;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;

          float d = length(uv);

          if (d > 0.5) discard;

          float core =
            smoothstep(
              0.18,
              0.0,
              d
            );

          float halo =
            smoothstep(
              0.5,
              0.0,
              d
            );

          vec3 color =
            mix(
              uBase,
              uAccent,
              vDepth
            );

          color =
            mix(
              color,
              uGold,
              pow(vSeed, 5.0) * 0.65
            );

          float alpha =
            halo *
            (0.16 + core * 0.8) *
            (0.25 + vDepth * 0.8);

          gl_FragColor =
            vec4(
              color,
              alpha
            );
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    scene.time += delta;

    material.uniforms.uTime.value =
      scene.time;

    material.uniforms.uScroll.value =
      scene.scroll;

    material.uniforms.uVelocity.value =
      scene.velocity;

    material.uniforms.uPointer.value.lerp(
      scene.pointer,
      0.08,
    );
  });

  return (
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   RINGS                                    */
/* -------------------------------------------------------------------------- */

function LivingRings({
  scene,
}: {
  scene: SceneState;
}) {
  const rings = useMemo(
    () => [
      {
        radius: 2.0,
        tube: 0.008,
        opacity: 0.52,
        speed: 0.18,
        rotation: [0.15, 0.4, 0.2] as [
          number,
          number,
          number,
        ],
      },
      {
        radius: 2.65,
        tube: 0.014,
        opacity: 0.3,
        speed: -0.12,
        rotation: [1.1, 0.2, 0.8] as [
          number,
          number,
          number,
        ],
      },
      {
        radius: 3.25,
        tube: 0.008,
        opacity: 0.24,
        speed: 0.08,
        rotation: [0.4, 1.2, 0.2] as [
          number,
          number,
          number,
        ],
      },
      {
        radius: 4.1,
        tube: 0.005,
        opacity: 0.15,
        speed: -0.06,
        rotation: [1.3, 0.5, 1.1] as [
          number,
          number,
          number,
        ],
      },
    ],
    [],
  );

  const refs = useRef<
    Array<THREE.Mesh | null>
  >([]);

  useFrame((_, delta) => {
    refs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const ring = rings[index];

      mesh.rotation.x +=
        delta * ring.speed;

      mesh.rotation.z +=
        delta * ring.speed * 0.55;

      mesh.rotation.y +=
        delta * ring.speed * 0.25;

      const pulse =
        1 +
        Math.sin(
          scene.time * 0.65 +
          index
        ) *
        0.012;

      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <group>
      {rings.map((ring, index) => (
        <mesh
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          rotation={ring.rotation}
        >
          <torusGeometry
            args={[
              ring.radius,
              ring.tube,
              16,
              220,
            ]}
          />

          <meshBasicMaterial
            color={
              index % 2 === 0
                ? COSMIC.lime
                : COSMIC.goldSoft
            }
            transparent
            opacity={ring.opacity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    CORE                                    */
/* -------------------------------------------------------------------------- */

function LivingCore({
  scene,
}: {
  scene: SceneState;
}) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      uniforms: {
        uTime: { value: 0 },
        uPointer: {
          value: new THREE.Vector2(0, 0),
        },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        uniform float uTime;
        uniform vec2 uPointer;

        varying vec2 vUv;

        #define PI 3.14159265359

        void main() {
          vec2 uv =
            vUv -
            vec2(0.5);

          float radius =
            length(uv);

          float angle =
            atan(
              uv.y,
              uv.x
            );

          /* Breathing */
          float breath =
            0.5 +
            0.5 *
            sin(
              uTime * 1.2
            );

          /* Concentric geometry */
          float rings =
            sin(
              radius * 62.0 -
              uTime * 1.6
            );

          float ringMask =
            smoothstep(
              0.15,
              0.9,
              rings
            );

          /* Radial energy */
          float rays =
            pow(
              max(
                0.0,
                cos(angle * 18.0)
              ),
              14.0
            );

          /* Cursor deformation */
          float cursor =
            distance(
              uv,
              uPointer * 0.12
            );

          float cursorGlow =
            smoothstep(
              0.55,
              0.0,
              cursor
            );

          vec3 lime =
            vec3(
              0.705,
              1.0,
              0.22
            );

          vec3 gold =
            vec3(
              0.91,
              0.81,
              0.51
            );

          vec3 violet =
            vec3(
              0.22,
              0.08,
              0.35
            );

          vec3 color =
            mix(
              violet,
              lime,
              1.0 - radius * 1.6
            );

          color =
            mix(
              color,
              gold,
              ringMask * 0.35
            );

          color +=
            lime *
            rays *
            0.65;

          color +=
            gold *
            cursorGlow *
            0.35;

          float core =
            smoothstep(
              0.18,
              0.0,
              radius
            );

          float edge =
            smoothstep(
              0.52,
              0.24,
              radius
            );

          float alpha =
            edge *
            (
              0.2 +
              core * 0.85 +
              breath * 0.08
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

  useFrame((_, delta) => {
    material.uniforms.uTime.value +=
      delta;

    material.uniforms.uPointer.value.lerp(
      scene.pointer,
      0.08,
    );
  });

  return (
    <mesh>
      <circleGeometry args={[1.45, 128]} />

      <primitive
        object={material}
        attach="material"
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CAMERA                                    */
/* -------------------------------------------------------------------------- */

function LivingCamera({
  scene,
}: {
  scene: SceneState;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetX =
      scene.pointer.x * 0.42;

    const targetY =
      scene.pointer.y * 0.24;

    const targetZ =
      9.5 -
      scene.scroll * 1.2 +
      scene.velocity * 0.08;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      2.2,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      2.2,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      1.8,
      delta,
    );

    camera.rotation.z = THREE.MathUtils.damp(
      camera.rotation.z,
      scene.pointer.x * 0.018,
      2,
      delta,
    );

    camera.lookAt(
      0,
      0,
      0,
    );
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/*                                   SCENE                                    */
/* -------------------------------------------------------------------------- */

function LivingCosmos({
  scene,
}: {
  scene: SceneState;
}) {
  return (
    <>
      <LivingCamera scene={scene} />

      <ambientLight
        intensity={0.15}
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={4}
        distance={10}
        color="#B4FF39"
      />

      <pointLight
        position={[-4, 2, 2]}
        intensity={2}
        distance={12}
        color="#BFA96E"
      />

      <LivingCore scene={scene} />

      <LivingRings scene={scene} />

      <LivingNebula scene={scene} />

      <Sparkles
        count={280}
        scale={[12, 8, 12]}
        size={1.6}
        speed={0.18}
        opacity={0.28}
        color="#B4FF39"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HUD                                     */
/* -------------------------------------------------------------------------- */

function Corner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const styles = {
    tl: "left-6 top-6 border-l border-t",
    tr: "right-6 top-6 border-r border-t",
    bl: "bottom-6 left-6 border-b border-l",
    br: "bottom-6 right-6 border-b border-r",
  };

  return (
    <div
      className={`pointer-events-none absolute z-30 h-12 w-12 border-[#B4FF39]/25 ${styles[position]}`}
    />
  );
}

function SignalDot() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4FF39]/60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B4FF39]" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const heroRef =
    useRef<HTMLElement | null>(null);

  const introRef =
    useRef<HTMLDivElement | null>(null);

  const titleRef =
    useRef<HTMLHeadingElement | null>(null);

  const subtitleRef =
    useRef<HTMLParagraphElement | null>(null);

  const ctaRef =
    useRef<HTMLAnchorElement | null>(null);

  const scene = useSceneState();

  const shouldReduceMotion =
    useReducedMotion();

  const {
    scrollYProgress,
  } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  /* ---------------------------------------------------------------------- */
  /*                                SCROLL                                  */
  /* ---------------------------------------------------------------------- */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {
      scene.scroll = value;
    },
  );

  /* ---------------------------------------------------------------------- */
  /*                              POINTER                                   */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const x =
        event.clientX /
          window.innerWidth *
          2 -
        1;

      const y =
        -(event.clientY /
          window.innerHeight *
          2 -
          1);

      scene.pointer.set(
        x,
        y,
      );
    };

    const handlePointerLeave = () => {
      scene.pointer.multiplyScalar(0.65);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [scene, shouldReduceMotion]);

  /* ---------------------------------------------------------------------- */
  /*                           VELOCITY FIELD                               */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (shouldReduceMotion) return;

    let previousScroll = 0;
    let raf = 0;

    const update = () => {
      const current =
        window.scrollY;

      const velocity =
        current -
        previousScroll;

      previousScroll = current;

      scene.velocity =
        THREE.MathUtils.lerp(
          scene.velocity,
          velocity,
          0.15,
        );

      raf =
        requestAnimationFrame(
          update,
        );
    };

    raf =
      requestAnimationFrame(
        update,
      );

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [scene, shouldReduceMotion]);

  /* ---------------------------------------------------------------------- */
  /*                                  INTRO                                 */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx =
      gsap.context(() => {
        const tl =
          gsap.timeline({
            defaults: {
              ease: "power4.out",
            },
          });

        tl.fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
        );

        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            rotateX: 18,
            filter:
              "blur(14px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter:
              "blur(0px)",
            duration: 1.35,
          },
          "-=0.8",
        );

        tl.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.65",
        );

        tl.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
          "-=0.45",
        );
      }, heroRef);

    return () =>
      ctx.revert();
  }, [shouldReduceMotion]);

  /* ---------------------------------------------------------------------- */
  /*                              MAGNETIC CTA                              */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !ctaRef.current
    ) {
      return;
    }

    const button =
      ctaRef.current;

    const handleMove = (
      event: PointerEvent,
    ) => {
      const rect =
        button.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left +
          rect.width / 2);

      const y =
        event.clientY -
        (rect.top +
          rect.height / 2);

      const distance =
        Math.sqrt(
          x * x +
          y * y,
        );

      if (distance > 140) {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        return;
      }

      gsap.to(button, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, 0.45)",
      });
    };

    button.addEventListener(
      "pointermove",
      handleMove,
    );

    button.addEventListener(
      "pointerleave",
      handleLeave,
    );

    return () => {
      button.removeEventListener(
        "pointermove",
        handleMove,
      );

      button.removeEventListener(
        "pointerleave",
        handleLeave,
      );
    };
  }, [shouldReduceMotion]);

  /* ---------------------------------------------------------------------- */
  /*                                 RENDER                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      ref={heroRef}
      className="relative min-h-[180vh] overflow-hidden bg-[#050A14] text-white"
    >
      {/* ------------------------------------------------------------------ */}
      {/* ATMOSPHERE                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(180,255,57,0.08), transparent 26%), radial-gradient(circle at 20% 20%, rgba(42,27,71,0.45), transparent 32%), radial-gradient(circle at 80% 70%, rgba(10,22,40,0.95), transparent 45%), #050A14",
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180,255,57,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(180,255,57,0.035) 1px, transparent 1px)",
            backgroundSize:
              "72px 72px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* THREE SCENE                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          camera={{
            position: [
              0,
              0,
              9.5,
            ],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              "high-performance",
          }}
        >
          <LivingCosmos
            scene={scene}
          />
        </Canvas>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* VIGNETTE                                                           */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle, transparent 30%, rgba(5,10,20,0.18) 62%, rgba(5,10,20,0.88) 100%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* SCANLINES                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none fixed inset-0 z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.8) 4px)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* HUD                                                                */}
      {/* ------------------------------------------------------------------ */}

      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div className="pointer-events-none fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <div className="flex -rotate-90 origin-left items-center gap-3 text-[9px] uppercase tracking-[0.42em] text-white/30">
          <span>COFIWORK</span>
          <span className="h-px w-12 bg-white/20" />
          <span>Digital Atelier</span>
        </div>
      </div>

      <div className="pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <div className="flex rotate-90 origin-right items-center gap-3 text-[9px] uppercase tracking-[0.42em] text-white/30">
          <span>Creative Systems</span>
          <span className="h-px w-12 bg-white/20" />
          <span>∞</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-28 sm:px-10 lg:px-16">
        <div
          ref={introRef}
          className="w-full"
        >
          {/* eyebrow */}

          <div className="mb-8 flex items-center gap-3">
            <SignalDot />

            <span className="text-[10px] font-medium uppercase tracking-[0.36em] text-white/50">
              Sistema creativo activo
            </span>
          </div>

          {/* title */}

          <h1
            ref={titleRef}
            className="max-w-6xl text-balance font-black uppercase leading-[0.82] tracking-[-0.065em]"
            style={{
              fontSize:
                "clamp(4.5rem, 13vw, 12rem)",
              perspective:
                "1000px",
            }}
          >
            <span className="block text-white">
              Ideas
            </span>

            <span
              className="block"
              style={{
                color:
                  "transparent",
                WebkitTextStroke:
                  "1px rgba(180,255,57,0.72)",
                textShadow:
                  "0 0 55px rgba(180,255,57,0.12)",
              }}
            >
              que
            </span>

            <span
              className="block bg-gradient-to-r from-[#B4FF39] via-[#E7CF82] to-[#B4FF39] bg-clip-text text-transparent"
            >
              respiran.
            </span>
          </h1>

          {/* subtitle */}

          <p
            ref={subtitleRef}
            className="mt-10 max-w-2xl text-base leading-7 text-white/55 sm:text-lg"
          >
            Diseñamos experiencias digitales donde
            estrategia, identidad, tecnología e
            interacción se convierten en un mismo
            lenguaje.
          </p>

          {/* cards */}

          <div className="mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Estrategia",
                text: "Pensamiento antes que decoración.",
              },
              {
                number: "02",
                title: "Diseño",
                text: "Sistemas visuales con carácter propio.",
              },
              {
                number: "03",
                title: "Tecnología",
                text: "Interfaces que responden y evolucionan.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-[#B4FF39]/30 hover:bg-[#B4FF39]/[0.035]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.3em] text-[#B4FF39]/60">
                    {item.number}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#B4FF39]/50 transition group-hover:bg-[#B4FF39]" />
                </div>

                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  {item.title}
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  {item.text}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#B4FF39] transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* CTA */}

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              ref={ctaRef}
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#B4FF39]/40 bg-[#B4FF39] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#07100A] shadow-[0_0_50px_rgba(180,255,57,0.12)] transition hover:border-[#E7CF82] hover:bg-[#E7CF82]"
            >
              <span className="relative z-10">
                Empecemos algo
              </span>

              <span className="relative z-10 text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>

              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <span className="max-w-xs text-xs leading-5 text-white/30">
              Una conversación puede ser el
              comienzo de una experiencia
              completamente distinta.
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SCROLL CUE                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] uppercase tracking-[0.45em] text-white/30">
            Explorar
          </span>

          <div className="relative h-14 w-px overflow-hidden bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-5 w-px bg-[#B4FF39]"
              animate={{
                y: [
                  "-100%",
                  "300%",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PROGRESS                                                           */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-px origin-left bg-[#B4FF39]"
        style={{
          scaleX: scrollYProgress,
        }}
      />
    </section>
  );
}