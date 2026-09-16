'use client';

import {
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  Line,
  Sparkles,
} from '@react-three/drei';

import * as THREE from 'three';
import gsap from 'gsap';

import { WA_URL } from '@/lib/constants';
import { jetonEase } from '@/lib/animations';

/* =========================================================
   TYPES
========================================================= */

type SceneInteraction = {
  pointer: React.MutableRefObject<THREE.Vector2>;
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
};

type NebulaProps = {
  count?: number;
  radius?: number;
  opacity?: number;
  interaction: SceneInteraction;
  reducedMotion: boolean;
};

type GalaxySceneProps = {
  interaction: SceneInteraction;
  reducedMotion: boolean;
};

/* =========================================================
   SEEDED RANDOM
   Evita que las partículas cambien en cada render.
========================================================= */

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/* =========================================================
   NEBULA SHADER
========================================================= */

const nebulaVertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uVelocity;
  uniform vec2 uPointer;

  attribute float aRandom;
  attribute float aSize;

  varying float vRandom;
  varying float vDepth;

  void main() {
    vec3 p = position;

    float spin =
      uTime * (0.035 + aRandom * 0.045)
      + uScroll * 0.42;

    float c = cos(spin);
    float s = sin(spin);

    p.xz = mat2(c, -s, s, c) * p.xz;

    float wave =
      sin(
        uTime * 0.75
        + aRandom * 24.0
        + length(p) * 2.4
      );

    p.y += wave * 0.055 * (0.3 + aRandom);

    p.x += uPointer.x * (0.18 + aRandom * 0.45);
    p.y += uPointer.y * (0.12 + aRandom * 0.3);

    float zoom =
      1.0
      + uScroll * 0.65
      + uVelocity * 0.22;

    p *= zoom;

    vec4 mvPosition =
      modelViewMatrix *
      vec4(p, 1.0);

    float depth =
      clamp(
        1.8 / max(-mvPosition.z, 0.1),
        0.15,
        2.8
      );

    gl_PointSize =
      aSize
      * depth
      * (1.0 + uVelocity * 2.0);

    gl_Position =
      projectionMatrix *
      mvPosition;

    vRandom = aRandom;
    vDepth = depth;
  }
`;

const nebulaFragmentShader = `
  varying float vRandom;
  varying float vDepth;

  void main() {
    vec2 uv =
      gl_PointCoord -
      vec2(0.5);

    float distanceFromCenter =
      length(uv);

    float soft =
      smoothstep(
        0.5,
        0.0,
        distanceFromCenter
      );

    float core =
      smoothstep(
        0.24,
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
        1.0,
        1.0,
        1.0
      );

    vec3 greenWhite =
      mix(
        white,
        lime,
        vRandom * 0.82
      );

    float alpha =
      soft
      * (
        0.13
        + core * 0.72
      )
      * (
        0.35
        + vDepth * 0.55
      );

    gl_FragColor =
      vec4(
        greenWhite,
        alpha
      );
  }
`;

/* =========================================================
   MAIN GALAXY PARTICLES
========================================================= */

function Nebula({
  count = 5200,
  radius = 5.2,
  opacity = 1,
  interaction,
  reducedMotion,
}: NebulaProps) {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const geometry =
    useMemo(() => {
      const geo =
        new THREE.BufferGeometry();

      const positions =
        new Float32Array(count * 3);

      const randoms =
        new Float32Array(count);

      const sizes =
        new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const r1 =
          seededRandom(i * 3 + 1);

        const r2 =
          seededRandom(i * 3 + 2);

        const r3 =
          seededRandom(i * 3 + 3);

        const r4 =
          seededRandom(i * 3 + 4);

        /*
         * Spiral galaxy distribution.
         */

        const radial =
          0.18 +
          Math.pow(r1, 0.68) *
            radius;

        const arm =
          Math.floor(r2 * 4);

        const armOffset =
          arm *
          (Math.PI * 2 / 4);

        const spiral =
          radial * 1.65;

        const angle =
          spiral +
          armOffset +
          (r3 - 0.5) * 0.78;

        const thickness =
          0.16 +
          radial * 0.12;

        const x =
          Math.cos(angle) *
            radial +
          (r4 - 0.5) *
            thickness;

        const z =
          Math.sin(angle) *
            radial *
            0.76 +
          (r3 - 0.5) *
            thickness;

        /*
         * Flattened galactic disk.
         */

        const y =
          (r4 - 0.5) *
            (
              1.35 -
              radial * 0.16
            ) +
          Math.sin(angle * 2.0) *
            0.12;

        positions[i * 3] =
          x;

        positions[i * 3 + 1] =
          y;

        positions[i * 3 + 2] =
          z;

        randoms[i] =
          seededRandom(
            i * 17 + 33
          );

        /*
         * Larger particles near the core.
         */

        const coreFactor =
          1 -
          Math.min(
            radial / radius,
            1
          );

        sizes[i] =
          (
            0.45 +
            coreFactor * 1.55 +
            seededRandom(i * 7) * 0.7
          ) *
          (
            reducedMotion
              ? 0.75
              : 1
          );
      }

      geo.setAttribute(
        'position',
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      geo.setAttribute(
        'aRandom',
        new THREE.BufferAttribute(
          randoms,
          1
        )
      );

      geo.setAttribute(
        'aSize',
        new THREE.BufferAttribute(
          sizes,
          1
        )
      );

      return geo;
    }, [
      count,
      radius,
      reducedMotion,
    ]);

  useFrame(
    (state) => {
      if (!materialRef.current) {
        return;
      }

      const uniforms =
        materialRef.current.uniforms;

      uniforms.uTime.value =
        state.clock.elapsedTime;

      uniforms.uScroll.value =
        reducedMotion
          ? 0
          : interaction.scroll.current;

      uniforms.uVelocity.value =
        reducedMotion
          ? 0
          : interaction.velocity.current;

      uniforms.uPointer.value.lerp(
        interaction.pointer.current,
        0.035
      );
    }
  );

  return (
    <points
      geometry={geometry}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={
          nebulaVertexShader
        }
        fragmentShader={
          nebulaFragmentShader
        }
        uniforms={{
          uTime: {
            value: 0,
          },
          uScroll: {
            value: 0,
          },
          uVelocity: {
            value: 0,
          },
          uPointer: {
            value: new THREE.Vector2(),
          },
          uOpacity: {
            value: opacity,
          },
        }}
      />
    </points>
  );
}

/* =========================================================
   SECONDARY DUST
========================================================= */

function DustCloud({
  count = 2400,
  interaction,
  reducedMotion,
}: {
  count?: number;
  interaction: SceneInteraction;
  reducedMotion: boolean;
}) {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const geometry =
    useMemo(() => {
      const geo =
        new THREE.BufferGeometry();

      const positions =
        new Float32Array(count * 3);

      const randoms =
        new Float32Array(count);

      const sizes =
        new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const r1 =
          seededRandom(i + 1000);

        const r2 =
          seededRandom(i + 2000);

        const r3 =
          seededRandom(i + 3000);

        const radius =
          4.5 +
          r1 * 5.5;

        const angle =
          r2 *
          Math.PI *
          2;

        positions[i * 3] =
          Math.cos(angle) *
          radius;

        positions[i * 3 + 1] =
          (r3 - 0.5) *
          5.5;

        positions[i * 3 + 2] =
          Math.sin(angle) *
          radius;

        randoms[i] =
          r1;

        sizes[i] =
          0.35 +
          r2 * 1.1;
      }

      geo.setAttribute(
        'position',
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      geo.setAttribute(
        'aRandom',
        new THREE.BufferAttribute(
          randoms,
          1
        )
      );

      geo.setAttribute(
        'aSize',
        new THREE.BufferAttribute(
          sizes,
          1
        )
      );

      return geo;
    }, [count]);

  useFrame(
    (state) => {
      if (!materialRef.current) {
        return;
      }

      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime;

      materialRef.current.uniforms.uScroll.value =
        reducedMotion
          ? 0
          : interaction.scroll.current;

      materialRef.current.uniforms.uVelocity.value =
        reducedMotion
          ? 0
          : interaction.velocity.current;
    }
  );

  return (
    <points
      geometry={geometry}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uScroll;
          uniform float uVelocity;

          attribute float aRandom;
          attribute float aSize;

          varying float vRandom;

          void main() {
            vec3 p = position;

            float rotation =
              uTime * (
                0.012 +
                aRandom * 0.018
              );

            float c = cos(rotation);
            float s = sin(rotation);

            p.xz =
              mat2(c, -s, s, c) *
              p.xz;

            p.y +=
              sin(
                uTime * 0.3 +
                aRandom * 20.0
              ) * 0.08;

            p *=
              1.0 +
              uScroll * 0.38 +
              uVelocity * 0.12;

            vec4 mv =
              modelViewMatrix *
              vec4(p, 1.0);

            float depth =
              clamp(
                2.0 / max(-mv.z, 0.1),
                0.1,
                2.5
              );

            gl_PointSize =
              aSize *
              depth;

            gl_Position =
              projectionMatrix *
              mv;

            vRandom =
              aRandom;
          }
        `}
        fragmentShader={`
          varying float vRandom;

          void main() {
            float d =
              distance(
                gl_PointCoord,
                vec2(0.5)
              );

            float alpha =
              smoothstep(
                0.5,
                0.0,
                d
              );

            vec3 lime =
              vec3(
                0.705,
                1.0,
                0.223
              );

            vec3 white =
              vec3(1.0);

            vec3 color =
              mix(
                lime,
                white,
                vRandom
              );

            gl_FragColor =
              vec4(
                color,
                alpha * 0.16
              );
          }
        `}
        uniforms={{
          uTime: {
            value: 0,
          },
          uScroll: {
            value: 0,
          },
          uVelocity: {
            value: 0,
          },
        }}
      />
    </points>
  );
}

/* =========================================================
   GALAXY FILAMENTS
========================================================= */

function GalaxyFilaments({
  interaction,
  reducedMotion,
}: {
  interaction: SceneInteraction;
  reducedMotion: boolean;
}) {
  const filaments =
    useMemo(() => {
      return Array.from(
        {
          length: 5,
        },
        (_, arm) => {
          const points: THREE.Vector3[] =
            [];

          for (
            let i = 0;
            i <= 120;
            i++
          ) {
            const t =
              i / 120;

            const radius =
              0.4 +
              t * 4.8;

            const angle =
              radius * 1.7 +
              arm *
                (
                  Math.PI *
                  2 /
                  5
                );

            const wave =
              Math.sin(
                t * Math.PI * 8 +
                arm
              ) * 0.12;

            points.push(
              new THREE.Vector3(
                Math.cos(angle) *
                    radius +
                  wave,
                Math.sin(
                  t *
                    Math.PI *
                    5
                ) *
                  0.18,
                Math.sin(angle) *
                    radius *
                    0.76
              )
            );
          }

          return points;
        }
      );
    }, []);

  const groupRef =
    useRef<THREE.Group>(null);

  useFrame(
    (state) => {
      if (!groupRef.current) {
        return;
      }

      if (!reducedMotion) {
        groupRef.current.rotation.y =
          state.clock.elapsedTime *
          0.025;

        groupRef.current.rotation.x =
          THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            interaction.pointer.current.y *
              0.08,
            0.02
          );

        groupRef.current.rotation.z =
          THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            interaction.pointer.current.x *
              0.06,
            0.02
          );

        const scale =
          1 +
          interaction.scroll.current *
            0.6;

        groupRef.current.scale.lerp(
          new THREE.Vector3(
            scale,
            scale,
            scale
          ),
          0.025
        );
      }
    }
  );

  return (
    <group ref={groupRef}>
      {filaments.map(
        (points, index) => (
          <Line
            key={index}
            points={points}
            color="#B4FF39"
            transparent
            opacity={
              reducedMotion
                ? 0.06
                : 0.08
            }
            lineWidth={
              index === 2
                ? 1.25
                : 0.7
            }
          />
        )
      )}
    </group>
  );
}

/* =========================================================
   HOLOGRAPHIC RINGS
========================================================= */

function HolographicRings({
  interaction,
  reducedMotion,
}: {
  interaction: SceneInteraction;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame(
    (state) => {
      if (!groupRef.current) {
        return;
      }

      const scroll =
        reducedMotion
          ? 0
          : interaction.scroll.current;

      const velocity =
        reducedMotion
          ? 0
          : interaction.velocity.current;

      groupRef.current.rotation.y =
        state.clock.elapsedTime *
          0.06 +
        scroll * 0.8;

      groupRef.current.rotation.x =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          interaction.pointer.current.y *
            0.18,
          0.025
        );

      groupRef.current.rotation.z =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          interaction.pointer.current.x *
            0.16,
          0.025
        );

      const scale =
        1 +
        scroll * 0.85 +
        velocity * 0.3;

      groupRef.current.scale.lerp(
        new THREE.Vector3(
          scale,
          scale,
          scale
        ),
        0.035
      );
    }
  );

  return (
    <group ref={groupRef}>
      <mesh rotation={[0.7, 0.2, 0]}>
        <torusGeometry
          args={[
            2.1,
            0.009,
            8,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#B4FF39"
          transparent
          opacity={0.23}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[1.1, 0.4, 0.8]}>
        <torusGeometry
          args={[
            3.15,
            0.006,
            8,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#B4FF39"
          transparent
          opacity={0.11}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[0.25, 1.2, 0.3]}>
        <torusGeometry
          args={[
            4.3,
            0.004,
            8,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.055}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CORE AURA
   No sphere: pure holographic energy field.
========================================================= */

function NebulaAura({
  interaction,
  reducedMotion,
}: {
  interaction: SceneInteraction;
  reducedMotion: boolean;
}) {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const meshRef =
    useRef<THREE.Mesh>(null);

  useFrame(
    (state) => {
      if (
        !materialRef.current ||
        !meshRef.current
      ) {
        return;
      }

      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime;

      materialRef.current.uniforms.uScroll.value =
        reducedMotion
          ? 0
          : interaction.scroll.current;

      materialRef.current.uniforms.uVelocity.value =
        reducedMotion
          ? 0
          : interaction.velocity.current;

      meshRef.current.rotation.z =
        state.clock.elapsedTime *
        0.015;

      const scale =
        1.0 +
        (
          reducedMotion
            ? 0
            : interaction.scroll.current
        ) *
          0.5;

      meshRef.current.scale.lerp(
        new THREE.Vector3(
          scale,
          scale,
          scale
        ),
        0.03
      );
    }
  );

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -0.7]}
    >
      <planeGeometry
        args={[11, 11]}
      />

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(
                position,
                1.0
              );
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uScroll;
          uniform float uVelocity;

          varying vec2 vUv;

          void main() {
            vec2 centered =
              vUv -
              vec2(0.5);

            centered.x *= 1.05;

            float distanceFromCenter =
              length(centered);

            float glow =
              smoothstep(
                0.72,
                0.0,
                distanceFromCenter
              );

            float innerGlow =
              smoothstep(
                0.34,
                0.0,
                distanceFromCenter
              );

            float waves =
              sin(
                distanceFromCenter *
                  38.0 -
                uTime * 0.65
              ) *
              0.5 +
              0.5;

            float energy =
              0.18 +
              uScroll * 0.18 +
              uVelocity * 0.3;

            vec3 lime =
              vec3(
                0.705,
                1.0,
                0.223
              );

            vec3 white =
              vec3(1.0);

            vec3 color =
              mix(
                lime,
                white,
                innerGlow * 0.72
              );

            float alpha =
              glow *
              (
                energy +
                waves *
                0.025
              );

            gl_FragColor =
              vec4(
                color,
                alpha
              );
          }
        `}
        uniforms={{
          uTime: {
            value: 0,
          },
          uScroll: {
            value: 0,
          },
          uVelocity: {
            value: 0,
          },
        }}
      />
    </mesh>
  );
}

/* =========================================================
   GALAXY SCENE
========================================================= */

function GalaxyScene({
  interaction,
  reducedMotion,
}: GalaxySceneProps) {
  const sceneRef =
    useRef<THREE.Group>(null);

  useFrame(
    (state) => {
      if (!sceneRef.current) {
        return;
      }

      const scroll =
        reducedMotion
          ? 0
          : interaction.scroll.current;

      const velocity =
        reducedMotion
          ? 0
          : interaction.velocity.current;

      /*
       * Cinematic global galaxy movement.
       */

      sceneRef.current.rotation.y =
        THREE.MathUtils.lerp(
          sceneRef.current.rotation.y,
          interaction.pointer.current.x *
              0.16 +
            scroll * 0.35,
          0.025
        );

      sceneRef.current.rotation.x =
        THREE.MathUtils.lerp(
          sceneRef.current.rotation.x,
          interaction.pointer.current.y *
              0.1 -
            scroll * 0.08,
          0.025
        );

      sceneRef.current.rotation.z =
        THREE.MathUtils.lerp(
          sceneRef.current.rotation.z,
          scroll * 0.12,
          0.025
        );

      /*
       * Galaxy expands toward the viewer
       * while scrolling.
       */

      const targetScale =
        1 +
        scroll * 0.7 +
        velocity * 0.18;

      const target =
        new THREE.Vector3(
          targetScale,
          targetScale,
          targetScale
        );

      sceneRef.current.scale.lerp(
        target,
        0.025
      );
    }
  );

  return (
    <group ref={sceneRef}>
      <NebulaAura
        interaction={interaction}
        reducedMotion={reducedMotion}
      />

      <Nebula
        count={
          reducedMotion
            ? 2200
            : 5200
        }
        radius={5.2}
        interaction={interaction}
        reducedMotion={reducedMotion}
      />

      <DustCloud
        count={
          reducedMotion
            ? 900
            : 2400
        }
        interaction={interaction}
        reducedMotion={reducedMotion}
      />

      <GalaxyFilaments
        interaction={interaction}
        reducedMotion={reducedMotion}
      />

      <HolographicRings
        interaction={interaction}
        reducedMotion={reducedMotion}
      />

      <Sparkles
        count={
          reducedMotion
            ? 90
            : 320
        }
        scale={[11, 7, 11]}
        size={
          reducedMotion
            ? 0.7
            : 1.25
        }
        speed={
          reducedMotion
            ? 0
            : 0.16
        }
        opacity={0.48}
        color="#B4FF39"
        noise={1.3}
      />

      <Sparkles
        count={
          reducedMotion
            ? 45
            : 140
        }
        scale={[7, 4, 7]}
        size={0.75}
        speed={
          reducedMotion
            ? 0
            : 0.1
        }
        opacity={0.7}
        color="#ffffff"
        noise={0.8}
      />
    </group>
  );
}

/* =========================================================
   HUD CORNER
========================================================= */

function HUDCorner({
  position,
}: {
  position:
    | 'tl'
    | 'tr'
    | 'bl'
    | 'br';
}) {
  const positions = {
    tl: 'left-5 top-5',
    tr: 'right-5 top-5',
    bl: 'bottom-5 left-5',
    br: 'bottom-5 right-5',
  };

  const borders = {
    tl: 'border-l border-t',
    tr: 'border-r border-t',
    bl: 'border-b border-l',
    br: 'border-b border-r',
  };

  return (
    <div
      className={`pointer-events-none absolute z-20 h-10 w-10 ${positions[position]} ${borders[position]} border-[#B4FF39]/35`}
    >
      <span className="absolute h-[2px] w-1.5 bg-[#B4FF39]" />
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const reducedMotion =
    useReducedMotion();

  const heroRef =
    useRef<HTMLElement>(null);

  const introRef =
    useRef<HTMLDivElement>(null);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const subtitleRef =
    useRef<HTMLDivElement>(null);

  const ctaRef =
    useRef<HTMLAnchorElement>(null);

  const pointerRef =
    useRef(
      new THREE.Vector2(0, 0)
    );

  const scrollRef =
    useRef(0);

  const velocityRef =
    useRef(0);

  const previousScroll =
    useRef(0);

  const interaction =
    useMemo<SceneInteraction>(
      () => ({
        pointer: pointerRef,
        scroll: scrollRef,
        velocity: velocityRef,
      }),
      []
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: heroRef,
    offset: [
      'start start',
      'end start',
    ],
  });

  /* =======================================================
     SCROLL INTERACTION
  ======================================================= */

  useMotionValueEvent(
    scrollYProgress,
    'change',
    (latest) => {
      const delta =
        latest -
        previousScroll.current;

      scrollRef.current =
        latest;

      if (!reducedMotion) {
        velocityRef.current =
          Math.min(
            Math.abs(delta) * 150,
            1
          );
      }

      previousScroll.current =
        latest;
    }
  );

  /* =======================================================
     POINTER INTERACTION
  ======================================================= */

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const x =
        (
          event.clientX /
            window.innerWidth -
          0.5
        ) * 2;

      const y =
        (
          0.5 -
          event.clientY /
            window.innerHeight
        ) * 2;

      pointerRef.current.set(
        x,
        y
      );
    };

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );
    };
  }, []);

  /* =======================================================
     VELOCITY DECAY
  ======================================================= */

  useEffect(() => {
    let frame = 0;

    const decay = () => {
      velocityRef.current *=
        0.92;

      frame =
        requestAnimationFrame(
          decay
        );
    };

    frame =
      requestAnimationFrame(
        decay
      );

    return () => {
      cancelAnimationFrame(
        frame
      );
    };
  }, []);

  /* =======================================================
     CINEMATIC INTRO
  ======================================================= */

  useEffect(() => {
    if (
      reducedMotion ||
      !introRef.current
    ) {
      return;
    }

    const context =
      gsap.context(() => {
        gsap.set(
          introRef.current,
          {
            opacity: 0,
            scale: 1.035,
          }
        );

        if (titleRef.current) {
          gsap.set(
            titleRef.current,
            {
              opacity: 0,
              y: 35,
              filter:
                'blur(14px)',
            }
          );
        }

        if (subtitleRef.current) {
          gsap.set(
            subtitleRef.current,
            {
              opacity: 0,
              y: 24,
            }
          );
        }

        if (ctaRef.current) {
          gsap.set(
            ctaRef.current,
            {
              opacity: 0,
              y: 18,
            }
          );
        }

        const timeline =
          gsap.timeline();

        timeline.to(
          introRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "jetonEase",
          }
        );

        if (titleRef.current) {
          timeline.to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              filter:
                'blur(0px)',
              duration: 1.4,
              ease: "jetonEase",
            },
            '-=1.15'
          );
        }

        if (subtitleRef.current) {
          timeline.to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            '-=0.75'
          );
        }

        if (ctaRef.current) {
          timeline.to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
            },
            '-=0.55'
          );
        }
      });

    return () =>
      context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* ===================================================
          ATMOSPHERIC BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[42%]
            h-[55vw]
            w-[55vw]
            max-h-[850px]
            max-w-[850px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#B4FF39]/[0.045]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[35vw]
            w-[35vw]
            max-h-[520px]
            max-w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.025]
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_62%,#000_100%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#B4FF39]/50
            to-transparent
          "
        />
      </div>

      {/* ===================================================
          3D GALAXY
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 42,
          }}
          dpr={[1, 1.6]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              'high-performance',
          }}
        >
          <ambientLight
            intensity={0.18}
          />

          <pointLight
            position={[0, 0, 2]}
            color="#B4FF39"
            intensity={8}
            distance={8}
            decay={2}
          />

          <GalaxyScene
            interaction={
              interaction
            }
            reducedMotion={
              Boolean(
                reducedMotion
              )
            }
          />
        </Canvas>
      </div>

      {/* ===================================================
          SCANLINES
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[4]
          opacity-[0.035]
          [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:100%_4px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[4]
          bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]
        "
      />

      {/* ===================================================
          HUD FRAME
      =================================================== */}

      <HUDCorner position="tl" />
      <HUDCorner position="tr" />
      <HUDCorner position="bl" />
      <HUDCorner position="br" />

      <div className="pointer-events-none absolute inset-5 z-10 border border-white/[0.035]" />

      {/* ===================================================
          TOP HUD
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-7
          z-20
          flex
          -translate-x-1/2
          items-center
          gap-3
          font-mono
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/40
        "
      >
        <span className="h-px w-8 bg-[#B4FF39]/50" />

        <span>
          COFIWORK // SYSTEM ONLINE
        </span>

        <span className="h-px w-8 bg-[#B4FF39]/50" />
      </div>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        ref={introRef}
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-5
          pb-16
          pt-24
        "
      >
        {/* -----------------------------------------------
            MICRO TELEMETRY
        ------------------------------------------------ */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-4
            font-mono
            text-[8px]
            uppercase
            tracking-[0.32em]
            text-white/35
          "
        >
          <span>
            SYSTEM // 001
          </span>

          <span className="h-px w-8 bg-white/20" />

          <span className="text-[#B4FF39]/70">
            SIGNAL STABLE
          </span>

          <span className="h-px w-8 bg-white/20" />

          <span>
            CUSTOM BUILD
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1
          ref={titleRef}
          className="
            relative
            max-w-[1100px]
            text-center
            font-black
            uppercase
            leading-[0.83]
            tracking-[-0.055em]
          "
        >
          <span className="relative block text-[clamp(4rem,11vw,9.5rem)]">
            <span className="relative z-10">
              TU WEB
            </span>

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                translate-y-[2px]
                text-[#B4FF39]/10
                blur-[18px]
              "
            >
              TU WEB
            </span>
          </span>

          <span className="relative block text-[clamp(4rem,11vw,9.5rem)]">
            <span className="relative z-10">
              TAL COMO
            </span>

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                translate-y-[2px]
                text-[#B4FF39]/10
                blur-[18px]
              "
            >
              TAL COMO
            </span>
          </span>

          <span className="relative block text-[clamp(4rem,11vw,9.5rem)]">
            <span className="relative z-10 text-white">
              NECESITÁS.
            </span>

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                text-[#B4FF39]/20
                blur-[24px]
              "
            >
              NECESITÁS.
            </span>

            <span
              className="
                absolute
                -bottom-3
                left-1/2
                h-px
                w-[70%]
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#B4FF39]
                to-transparent
                opacity-60
              "
            />
          </span>
        </h1>

        {/* =================================================
            TITLE METADATA
        ================================================= */}

        <div
          className="
            mt-7
            flex
            items-center
            gap-3
            font-mono
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/30
          "
        >
          <span>
            COFIWORK
          </span>

          <span className="h-px w-7 bg-[#B4FF39]/50" />

          <span>
            IDENTITY SYSTEM
          </span>

          <span className="h-px w-7 bg-[#B4FF39]/50" />

          <span className="text-[#B4FF39]/65">
            001
          </span>
        </div>

        {/* =================================================
            SUBTITLE HUD
        ================================================= */}

        <motion.div
          ref={subtitleRef}
          className="
            relative
            mt-10
            w-full
            max-w-[700px]
          "
        >
          <div
            className="
              absolute
              -inset-3
              rounded-full
              bg-[#B4FF39]/[0.035]
              blur-3xl
            "
          />

          <div
            className="
              relative
              overflow-hidden
              border
              border-white/[0.09]
              bg-black/45
              px-6
              py-5
              backdrop-blur-md
            "
          >
            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#B4FF39]/60
                to-transparent
              "
            />

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                font-mono
                text-[7px]
                uppercase
                tracking-[0.3em]
              "
            >
              <span className="text-[#B4FF39]/75">
                COFIWORK // CORE MESSAGE
              </span>

              <span className="text-white/30">
                SIGNAL // STABLE
              </span>
            </div>

            <p
              className="
                text-center
                text-[15px]
                font-medium
                leading-relaxed
                tracking-[-0.01em]
                text-white/75
                md:text-[17px]
              "
            >
              Sin plantillas. Sin copias.
              <br className="sm:hidden" />{' '}
              Hecha desde cero tal cual
              la imaginás.
            </p>

            <div
              className="
                mt-5
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
              "
            />

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2
                font-mono
                text-[7px]
                uppercase
                tracking-[0.28em]
                text-white/30
              "
            >
              <span>
                DESIGN // CUSTOM
              </span>

              <span className="text-[#B4FF39]/55">
                NO TEMPLATES
              </span>

              <span>
                BUILD // 001
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SYSTEMS
        ================================================= */}

        <div
          className="
            mt-8
            grid
            w-full
            max-w-[850px]
            grid-cols-1
            gap-2
            sm:grid-cols-3
          "
        >
          {[
            {
              title: 'ÚNICA',
              desc: 'Nadie más tiene una igual',
              code: 'SYSTEM // UNIQUE',
            },
            {
              title: 'RÁPIDA',
              desc: 'Carga al instante',
              code: 'SYSTEM // SPEED',
            },
            {
              title: 'TUYA',
              desc: 'Construida para vos',
              code: 'SYSTEM // CUSTOM',
            },
          ].map(
            (item, index) => (
              <div
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-white/[0.07]
                  bg-black/35
                  px-4
                  py-4
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  hover:border-[#B4FF39]/25
                  hover:bg-[#B4FF39]/[0.025]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-px
                    w-0
                    bg-[#B4FF39]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  <span>
                    0{index + 1}
                  </span>

                  <span>
                    {item.code}
                  </span>
                </div>

                <div className="text-sm font-bold tracking-[0.15em]">
                  {item.title}
                </div>

                <div className="mt-1 text-[10px] text-white/40">
                  {item.desc}
                </div>
              </div>
            )
          )}
        </div>

        {/* =================================================
            CTA
        ================================================= */}

        <motion.a
          ref={ctaRef}
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.025,
                }
          }
          whileTap={
            reducedMotion
              ? undefined
              : {
                  scale: 0.98,
                }
          }
          className="
            group
            relative
            mt-9
            inline-flex
            items-center
            gap-4
            overflow-hidden
            border
            border-[#B4FF39]/50
            bg-[#B4FF39]
            px-7
            py-4
            font-mono
            text-[10px]
            font-black
            uppercase
            tracking-[0.22em]
            text-black
            shadow-[0_0_45px_rgba(180,255,57,0.13)]
            transition-shadow
            duration-500
            hover:shadow-[0_0_70px_rgba(180,255,57,0.24)]
          "
        >
          <span
            className="
              absolute
              inset-y-0
              -left-full
              w-1/2
              skew-x-[-20deg]
              bg-white/45
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />

          <span className="relative z-10">
            HABLEMOS DE TU PROYECTO
          </span>

          <span className="relative z-10 text-base">
            →
          </span>
        </motion.a>

        {/* =================================================
            BOTTOM TELEMETRY
        ================================================= */}

        <div
          className="
            absolute
            bottom-7
            left-1/2
            flex
            w-[calc(100%-40px)]
            max-w-[1100px]
            -translate-x-1/2
            items-center
            justify-between
            font-mono
            text-[7px]
            uppercase
            tracking-[0.3em]
            text-white/25
          "
        >
          <span>
            COFIWORK // DIGITAL
            ARCHITECTURE
          </span>

          <span className="hidden sm:block">
            LATENCY // 0.01
          </span>

          <span>
            STATUS //{' '}
            <span className="text-[#B4FF39]/70">
              ONLINE
            </span>
          </span>
        </div>
      </div>

      {/* ===================================================
          SIDE MARKERS
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-1/2
          z-20
          hidden
          -translate-y-1/2
          flex-col
          gap-8
          font-mono
          text-[7px]
          uppercase
          tracking-[0.3em]
          text-white/20
          lg:flex
        "
      >
        <span className="[writing-mode:vertical-rl]">
          DIGITAL SYSTEM
        </span>

        <span className="h-16 w-px bg-gradient-to-b from-transparent via-[#B4FF39]/40 to-transparent" />

        <span className="[writing-mode:vertical-rl] text-[#B4FF39]/45">
          001 // CORE
        </span>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          z-20
          hidden
          -translate-y-1/2
          flex-col
          gap-8
          font-mono
          text-[7px]
          uppercase
          tracking-[0.3em]
          text-white/20
          lg:flex
        "
      >
        <span className="[writing-mode:vertical-rl]">
          CUSTOM EXPERIENCE
        </span>

        <span className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        <span className="[writing-mode:vertical-rl]">
          BUILD // ONLINE
        </span>
      </div>

      {/* ===================================================
          BOTTOM FADE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-32
          bg-gradient-to-t
          from-black
          to-transparent
        "
      />
    </section>
  );
}