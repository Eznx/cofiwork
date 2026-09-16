'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  useReducedMotion,
} from 'framer-motion';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import * as THREE from 'three';
import gsap from 'gsap';

/* =========================================================
   TYPES
========================================================= */

type Point = {
  x: number;
  y: number;
};

type Velocity = {
  x: number;
  y: number;
  value: number;
};

type CursorState = {
  position: React.MutableRefObject<Point>;
  velocity: React.MutableRefObject<Velocity>;
  hovering: React.MutableRefObject<boolean>;
  pressed: React.MutableRefObject<boolean>;
  trail: React.MutableRefObject<Point[]>;
};

/* =========================================================
   CONSTANTS
========================================================= */

const LIME = new THREE.Color('#B4FF39');
const LIME_BRIGHT = new THREE.Color('#E9FFC4');
const LIME_DARK = new THREE.Color('#62A51A');

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
   HEXAGON / METATRON GEOMETRY
========================================================= */

function createHexagonPoints(
  radius: number,
  rotation = 0
) {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= 6; i++) {
    const angle =
      rotation +
      (i / 6) *
        Math.PI *
        2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) *
          radius,
        Math.sin(angle) *
          radius,
        0
      )
    );
  }

  return points;
}

function createMetatronGeometry() {
  const points: THREE.Vector3[] =
    [];

  /*
   * Outer hexagon.
   */

  points.push(
    ...createHexagonPoints(
      0.115,
      Math.PI / 6
    )
  );

  /*
   * Inner hexagon.
   */

  points.push(
    ...createHexagonPoints(
      0.065,
      Math.PI / 6
    )
  );

  /*
   * Six radial lines.
   */

  for (let i = 0; i < 6; i++) {
    const angle =
      Math.PI / 6 +
      (i / 6) *
        Math.PI *
        2;

    points.push(
      new THREE.Vector3(
        0,
        0,
        0
      )
    );

    points.push(
      new THREE.Vector3(
        Math.cos(angle) *
          0.115,
        Math.sin(angle) *
          0.115,
        0
      )
    );
  }

  /*
   * Inner triangular geometry.
   */

  const innerRadius = 0.065;

  for (let i = 0; i < 6; i++) {
    const a =
      Math.PI / 6 +
      (i / 6) *
        Math.PI *
        2;

    const b =
      Math.PI / 6 +
      (
        (i + 2) /
        6
      ) *
        Math.PI *
        2;

    points.push(
      new THREE.Vector3(
        Math.cos(a) *
          innerRadius,
        Math.sin(a) *
          innerRadius,
        0
      )
    );

    points.push(
      new THREE.Vector3(
        Math.cos(b) *
          innerRadius,
        Math.sin(b) *
          innerRadius,
        0
      )
    );
  }

  return points;
}

/* =========================================================
   METATRON CURSOR
========================================================= */

function MetatronCursor({
  state,
  reducedMotion,
}: {
  state: CursorState;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const glowRef =
    useRef<THREE.Mesh>(null);

  const geometry =
    useMemo(
      () =>
        createMetatronGeometry(),
      []
    );

  useFrame(
    (frame, delta) => {
      if (!groupRef.current) {
        return;
      }

      const speed =
        Math.min(
          state.velocity.current.value /
            65,
          1
        );

      /*
       * Rotation becomes more energetic
       * with cursor velocity.
       */

      if (!reducedMotion) {
        groupRef.current.rotation.z +=
          delta *
          (
            0.3 +
            speed * 2.4
          );

        groupRef.current.rotation.x =
          THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            state.velocity.current.y *
              0.0008,
            0.08
          );

        groupRef.current.rotation.y =
          THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            state.velocity.current.x *
              0.0008,
            0.08
          );
      }

      /*
       * Very small cursor.
       */

      const targetScale =
        0.82 +
        speed * 0.32 +
        (
          state.hovering.current
            ? 0.12
            : 0
        ) +
        (
          state.pressed.current
            ? 0.2
            : 0
        );

      groupRef.current.scale.lerp(
        new THREE.Vector3(
          targetScale,
          targetScale,
          targetScale
        ),
        0.12
      );

      /*
       * Glow breathing.
       */

      if (glowRef.current) {
        const material =
          glowRef.current
            .material as THREE.MeshBasicMaterial;

        material.opacity =
          0.12 +
          Math.sin(
            frame.clock.elapsedTime *
              4
          ) *
            0.025 +
          speed * 0.12 +
          (
            state.pressed.current
              ? 0.2
              : 0
          );
      }
    }
  );

  return (
    <group ref={groupRef}>
      {/* ---------------------------------------------
          OUTER HEXAGON
      --------------------------------------------- */}

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={7}
            array={
              new Float32Array(
                createHexagonPoints(
                  0.115,
                  Math.PI / 6
                ).flatMap(
                  (p) => [
                    p.x,
                    p.y,
                    p.z,
                  ]
                )
              )
            }
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#B4FF39"
          transparent
          opacity={0.95}
        />
      </line>

      {/* ---------------------------------------------
          INNER HEXAGON
      --------------------------------------------- */}

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={7}
            array={
              new Float32Array(
                createHexagonPoints(
                  0.065,
                  Math.PI / 6
                ).flatMap(
                  (p) => [
                    p.x,
                    p.y,
                    p.z,
                  ]
                )
              )
            }
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#E9FFC4"
          transparent
          opacity={0.72}
        />
      </line>

      {/* ---------------------------------------------
          METATRON NETWORK
      --------------------------------------------- */}

      {Array.from(
        { length: 6 },
        (_, index) => {
          const angle =
            Math.PI / 6 +
            (index / 6) *
              Math.PI *
              2;

          return (
            <line key={index}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={
                    new Float32Array([
                      0,
                      0,
                      0,

                      Math.cos(angle) *
                        0.115,
                      Math.sin(angle) *
                        0.115,
                      0,
                    ])
                  }
                  itemSize={3}
                />
              </bufferGeometry>

              <lineBasicMaterial
                color="#B4FF39"
                transparent
                opacity={0.55}
              />
            </line>
          );
        }
      )}

      {/* ---------------------------------------------
          CENTRAL ENERGY POINT
      --------------------------------------------- */}

      <mesh>
        <circleGeometry
          args={[
            0.018,
            16,
          ]}
        />

        <meshBasicMaterial
          color="#F5FFD9"
          transparent
          opacity={1}
        />
      </mesh>

      {/* ---------------------------------------------
          MICRO GLOW
      --------------------------------------------- */}

      <mesh ref={glowRef}>
        <circleGeometry
          args={[
            0.055,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#B4FF39"
          transparent
          opacity={0.14}
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
   ENERGY TRAIL SHADER
========================================================= */

const energyTrailVertex = `
  uniform float uTime;
  uniform float uSpeed;

  attribute float aSize;
  attribute float aLife;
  attribute float aRandom;
  attribute float aLayer;

  varying float vLife;
  varying float vRandom;
  varying float vLayer;

  void main() {
    vec3 p = position;

    /*
     * Organic microscopic vibration.
     */

    float wave =
      sin(
        uTime * (
          2.0 +
          aRandom * 3.0
        ) +
        aRandom * 40.0
      );

    float vibration =
      0.0025 +
      aLife * 0.006;

    p.x +=
      wave *
      vibration;

    p.y +=
      cos(
        uTime * 2.5 +
        aRandom * 31.0
      ) *
      vibration;

    vec4 mv =
      modelViewMatrix *
      vec4(p, 1.0);

    float depth =
      clamp(
        4.0 /
        max(
          -mv.z,
          0.1
        ),
        0.35,
        4.0
      );

    gl_PointSize =
      aSize *
      depth *
      (
        0.5 +
        aLife * 1.15
      ) *
      (
        1.0 +
        uSpeed * 1.7
      );

    gl_Position =
      projectionMatrix *
      mv;

    vLife = aLife;
    vRandom = aRandom;
    vLayer = aLayer;
  }
`;

const energyTrailFragment = `
  varying float vLife;
  varying float vRandom;
  varying float vLayer;

  void main() {
    vec2 uv =
      gl_PointCoord -
      vec2(0.5);

    float d =
      length(uv);

    float soft =
      smoothstep(
        0.5,
        0.0,
        d
      );

    float core =
      smoothstep(
        0.13,
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
      vec3(
        0.95,
        1.0,
        0.82
      );

    vec3 dark =
      vec3(
        0.24,
        0.48,
        0.08
      );

    vec3 color;

    if (vLayer < 0.35) {
      color =
        mix(
          dark,
          lime,
          vLife
        );
    } else if (vLayer < 0.7) {
      color =
        mix(
          lime,
          white,
          vRandom * 0.55
        );
    } else {
      color =
        mix(
          lime,
          white,
          0.5 +
          vRandom * 0.5
        );
    }

    float alpha =
      soft *
      (
        0.05 +
        vLife * 0.72 +
        core * 0.75
      );

    gl_FragColor =
      vec4(
        color,
        alpha
      );
  }
`;

/* =========================================================
   ENERGY TRAIL
========================================================= */

function EnergyTrail({
  state,
  reducedMotion,
}: {
  state: CursorState;
  reducedMotion: boolean;
}) {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const geometryRef =
    useRef<THREE.BufferGeometry>(null);

  const { viewport, size } =
    useThree();

  const count =
    reducedMotion
      ? 110
      : 420;

  const attributes =
    useMemo(() => {
      const sizes =
        new Float32Array(count);

      const life =
        new Float32Array(count);

      const random =
        new Float32Array(count);

      const layer =
        new Float32Array(count);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const progress =
          i / count;

        /*
         * More particles close to the cursor,
         * but enough survive far behind it.
         */

        sizes[i] =
          0.35 +
          seededRandom(
            i * 11
          ) *
            1.8;

        life[i] =
          Math.pow(
            1 -
              progress,
            0.72
          );

        random[i] =
          seededRandom(
            i * 23
          );

        layer[i] =
          seededRandom(
            i * 37
          );
      }

      return {
        sizes,
        life,
        random,
        layer,
      };
    }, [count]);

  const positions =
    useMemo(
      () =>
        new Float32Array(
          count * 3
        ),
      [count]
    );

  useFrame(
    (frame) => {
      if (
        !geometryRef.current ||
        !materialRef.current
      ) {
        return;
      }

      const positionAttribute =
        geometryRef.current
          .attributes
          .position as THREE.BufferAttribute;

      const array =
        positionAttribute.array as Float32Array;

      const trail =
        state.trail.current;

      const speed =
        Math.min(
          state.velocity.current.value /
            60,
          1
        );

      const velocityX =
        state.velocity.current.x;

      const velocityY =
        state.velocity.current.y;

      /*
       * Direction vector.
       */

      const velocityLength =
        Math.sqrt(
          velocityX *
            velocityX +
          velocityY *
            velocityY
        );

      let directionX = 0;
      let directionY = 0;

      if (
        velocityLength > 0.1
      ) {
        directionX =
          velocityX /
          velocityLength;

        directionY =
          velocityY /
          velocityLength;
      }

      /*
       * Create multiple fine energy layers.
       */

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const progress =
          i / count;

        const trailIndex =
          Math.min(
            Math.floor(
              progress *
                Math.max(
                  trail.length - 1,
                  1
                )
            ),
            Math.max(
              trail.length - 1,
              0
            )
          );

        const point =
          trail[
            trailIndex
          ] ??
          state.position.current;

        const normalizedX =
          point.x /
          size.width;

        const normalizedY =
          point.y /
          size.height;

        const baseX =
          (
            normalizedX -
            0.5
          ) *
          viewport.width;

        const baseY =
          (
            0.5 -
            normalizedY
          ) *
          viewport.height;

        const random =
          attributes.random[i];

        /*
         * Very thin energy dispersion.
         */

        const side =
          random > 0.5
            ? 1
            : -1;

        const sideAmount =
          (
            random *
            2 -
            1
          ) *
          (
            0.012 +
            speed * 0.065
          ) *
          (
            0.25 +
            progress
          );

        /*
         * Spread increases toward
         * the older part of the trail.
         */

        const spread =
          sideAmount;

        const perpendicularX =
          -directionY *
          spread;

        const perpendicularY =
          directionX *
          spread;

        /*
         * Directional wake.
         */

        const wake =
          progress *
          speed *
          0.55;

        const x =
          baseX +
          perpendicularX -
          directionX *
            wake *
            side;

        const y =
          baseY +
          perpendicularY -
          directionY *
            wake *
            side;

        /*
         * Micro drifting.
         */

        const drift =
          (
            Math.sin(
              frame.clock.elapsedTime *
                (
                  1.2 +
                  random * 2
                ) +
                i
            ) *
            0.0015
          ) *
          progress;

        array[i * 3] +=
          (
            x +
            drift -
            array[i * 3]
          ) *
          0.25;

        array[i * 3 + 1] +=
          (
            y +
            drift -
            array[i * 3 + 1]
          ) *
          0.25;

        array[i * 3 + 2] +=
          (
            -0.2 -
            progress * 0.4 -
            attributes.layer[i] *
              0.1 -
            array[i * 3 + 2]
          ) *
          0.12;
      }

      positionAttribute.needsUpdate =
        true;

      materialRef.current.uniforms.uTime.value =
        frame.clock.elapsedTime;

      materialRef.current.uniforms.uSpeed.value =
        reducedMotion
          ? 0
          : speed;
    }
  );

  return (
    <points
      geometry={(() => {
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
            attributes.sizes,
            1
          )
        );

        geo.setAttribute(
          'aLife',
          new THREE.BufferAttribute(
            attributes.life,
            1
          )
        );

        geo.setAttribute(
          'aRandom',
          new THREE.BufferAttribute(
            attributes.random,
            1
          )
        );

        geo.setAttribute(
          'aLayer',
          new THREE.BufferAttribute(
            attributes.layer,
            1
          )
        );

        return geo;
      })()}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
        vertexShader={
          energyTrailVertex
        }
        fragmentShader={
          energyTrailFragment
        }
        uniforms={{
          uTime: {
            value: 0,
          },
          uSpeed: {
            value: 0,
          },
        }}
      />
    </points>
  );
}

/* =========================================================
   FADING ENERGY FILAMENTS
========================================================= */

function EnergyFilaments({
  state,
  reducedMotion,
}: {
  state: CursorState;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const filamentCount =
    reducedMotion
      ? 5
      : 14;

  const data =
    useMemo(() => {
      return Array.from(
        {
          length:
            filamentCount,
        },
        (_, index) => ({
          offset:
            seededRandom(
              index * 71
            ),

          width:
            0.001 +
            seededRandom(
              index * 89
            ) *
              0.003,

          speed:
            0.4 +
            seededRandom(
              index * 101
            ) *
              1.5,
        })
      );
    }, [filamentCount]);

  useFrame(
    (frame) => {
      if (!groupRef.current) {
        return;
      }

      const speed =
        Math.min(
          state.velocity.current.value /
            70,
          1
        );

      groupRef.current.rotation.z =
        Math.sin(
          frame.clock.elapsedTime *
            0.6
        ) *
        0.012 *
        (
          1 +
          speed
        );
    }
  );

  return (
    <group ref={groupRef}>
      {data.map(
        (
          filament,
          index
        ) => {
          const angle =
            filament.offset *
            Math.PI *
            2;

          const length =
            0.08 +
            Math.min(
              state.velocity.current.value /
                70,
              1
            ) *
              0.35;

          const x =
            Math.cos(angle);

          const y =
            Math.sin(angle);

          const points = [
            new THREE.Vector3(
              0,
              0,
              -0.3
            ),
            new THREE.Vector3(
              x * length,
              y * length,
              -0.3
            ),
          ];

          return (
            <line key={index}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={
                    new Float32Array(
                      points.flatMap(
                        (p) => [
                          p.x,
                          p.y,
                          p.z,
                        ]
                      )
                    )
                  }
                  itemSize={3}
                />
              </bufferGeometry>

              <lineBasicMaterial
                color={
                  index % 4 === 0
                    ? '#E9FFC4'
                    : '#B4FF39'
                }
                transparent
                opacity={
                  0.04 +
                  filament.speed *
                    0.025
                }
                linewidth={
                  filament.width
                }
              />
            </line>
          );
        }
      )}
    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function CursorScene({
  state,
  reducedMotion,
}: {
  state: CursorState;
  reducedMotion: boolean;
}) {
  const rootRef =
    useRef<THREE.Group>(null);

  const { viewport, size } =
    useThree();

  useFrame(() => {
    if (!rootRef.current) {
      return;
    }

    /*
     * Screen -> world.
     */

    const normalizedX =
      state.position.current.x /
      size.width;

    const normalizedY =
      state.position.current.y /
      size.height;

    const targetX =
      (
        normalizedX -
        0.5
      ) *
      viewport.width;

    const targetY =
      (
        0.5 -
        normalizedY
      ) *
      viewport.height;

    rootRef.current.position.x =
      THREE.MathUtils.lerp(
        rootRef.current.position.x,
        targetX,
        0.35
      );

    rootRef.current.position.y =
      THREE.MathUtils.lerp(
        rootRef.current.position.y,
        targetY,
        0.35
      );
  });

  return (
    <group ref={rootRef}>
      <EnergyTrail
        state={state}
        reducedMotion={
          reducedMotion
        }
      />

      <EnergyFilaments
        state={state}
        reducedMotion={
          reducedMotion
        }
      />

      <MetatronCursor
        state={state}
        reducedMotion={
          reducedMotion
        }
      />
    </group>
  );
}

/* =========================================================
   MAIN CURSOR
========================================================= */

export default function CursorFollower() {
  const reducedMotion =
    useReducedMotion();

  const rootRef =
    useRef<HTMLDivElement>(null);

  const impactRef =
    useRef<HTMLDivElement>(null);

  const glowRef =
    useRef<HTMLDivElement>(null);

  const mouseRef =
    useRef<Point>({
      x: -200,
      y: -200,
    });

  const positionRef =
    useRef<Point>({
      x: -200,
      y: -200,
    });

  const previousMouseRef =
    useRef<Point>({
      x: -200,
      y: -200,
    });

  const velocityRef =
    useRef<Velocity>({
      x: 0,
      y: 0,
      value: 0,
    });

  const hoveringRef =
    useRef(false);

  const pressedRef =
    useRef(false);

  const trailRef =
    useRef<Point[]>([]);

  const cursorState =
    useMemo<CursorState>(
      () => ({
        position:
          positionRef,
        velocity:
          velocityRef,
        hovering:
          hoveringRef,
        pressed:
          pressedRef,
        trail:
          trailRef,
      }),
      []
    );

  /* =======================================================
     INTERACTIVE DETECTION
  ======================================================= */

  const detectInteractive =
    useCallback(
      (target: EventTarget | null) => {
        if (
          !(target instanceof Element)
        ) {
          return false;
        }

        return Boolean(
          target.closest(
            `
              a,
              button,
              [role="button"],
              input,
              textarea,
              select,
              [data-cursor="interactive"]
            `
          )
        );
      },
      []
    );

  /* =======================================================
     EVENTS
  ======================================================= */

  useEffect(() => {
    const coarse =
      window.matchMedia(
        '(pointer: coarse)'
      ).matches;

    if (coarse) {
      return;
    }

    /*
     * Completely remove browser cursor
     * while this system is active.
     */

    const cursorStyle =
      document.createElement(
        'style'
      );

    cursorStyle.setAttribute(
      'data-cofiwork-cursor',
      'true'
    );

    cursorStyle.textContent = `
      html,
      body,
      body * {
        cursor: none !important;
      }
    `;

    document.head.appendChild(
      cursorStyle
    );

    /* -----------------------------------------------------
       MOUSE
    ----------------------------------------------------- */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      mouseRef.current.x =
        event.clientX;

      mouseRef.current.y =
        event.clientY;

      hoveringRef.current =
        detectInteractive(
          event.target
        );
    };

    /* -----------------------------------------------------
       CLICK
    ----------------------------------------------------- */

    const handlePointerDown = () => {
      pressedRef.current =
        true;

      /*
       * Small geometric impact.
       */

      if (impactRef.current) {
        gsap.killTweensOf(
          impactRef.current
        );

        gsap.fromTo(
          impactRef.current,
          {
            opacity: 0.85,
            scale: 0.4,
            rotate: 0,
          },
          {
            opacity: 0,
            scale: 2.2,
            rotate: 60,
            duration: 0.46,
            ease: 'power3.out',
          }
        );
      }

      /*
       * Brief energy flash.
       */

      if (glowRef.current) {
        gsap.killTweensOf(
          glowRef.current
        );

        gsap.fromTo(
          glowRef.current,
          {
            opacity: 0.5,
            scale: 0.4,
          },
          {
            opacity: 0,
            scale: 2.5,
            duration: 0.38,
            ease: 'power3.out',
          }
        );
      }
    };

    const handlePointerUp = () => {
      pressedRef.current =
        false;
    };

    /* -----------------------------------------------------
       LOOP
    ----------------------------------------------------- */

    let animationId = 0;

    const animate = () => {
      const mouse =
        mouseRef.current;

      const position =
        positionRef.current;

      /*
       * Velocity.
       */

      const dx =
        mouse.x -
        previousMouseRef.current.x;

      const dy =
        mouse.y -
        previousMouseRef.current.y;

      const velocity =
        Math.min(
          Math.sqrt(
            dx * dx +
            dy * dy
          ),
          120
        );

      velocityRef.current.x =
        dx;

      velocityRef.current.y =
        dy;

      velocityRef.current.value +=
        (
          velocity -
          velocityRef.current.value
        ) *
        0.18;

      /*
       * Cursor follow.
       */

      position.x +=
        (
          mouse.x -
          position.x
        ) *
        (
          hoveringRef.current
            ? 0.34
            : 0.27
        );

      position.y +=
        (
          mouse.y -
          position.y
        ) *
        (
          hoveringRef.current
            ? 0.34
            : 0.27
        );

      /*
       * Trail history.
       */

      if (
        trailRef.current.length ===
        0
      ) {
        trailRef.current.push({
          x: position.x,
          y: position.y,
        });
      }

      const distance =
        Math.hypot(
          position.x -
            trailRef.current[0].x,
          position.y -
            trailRef.current[0].y
        );

      if (
        distance > 0.8
      ) {
        trailRef.current.unshift({
          x: position.x,
          y: position.y,
        });
      }

      const maxTrail =
        reducedMotion
          ? 18
          : 100;

      if (
        trailRef.current.length >
        maxTrail
      ) {
        trailRef.current.length =
          maxTrail;
      }

      previousMouseRef.current.x =
        mouse.x;

      previousMouseRef.current.y =
        mouse.y;

      /*
       * DOM root follows the pointer.
       */

      if (rootRef.current) {
        rootRef.current.style.transform = `
          translate3d(
            ${position.x}px,
            ${position.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      animationId =
        requestAnimationFrame(
          animate
        );
    };

    animationId =
      requestAnimationFrame(
        animate
      );

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'pointerdown',
      handlePointerDown,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'pointerup',
      handlePointerUp,
      {
        passive: true,
      }
    );

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'pointerdown',
        handlePointerDown
      );

      window.removeEventListener(
        'pointerup',
        handlePointerUp
      );

      cursorStyle.remove();
    };
  }, [
    detectInteractive,
    reducedMotion,
  ]);

  if (
    typeof window !==
      'undefined' &&
    window.matchMedia(
      '(pointer: coarse)'
    ).matches
  ) {
    return null;
  }

  return (
    <>
      {/* ===================================================
          THREE.JS ENERGY SYSTEM
      =================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[9997]
          hidden
          md:block
        "
      >
        <Canvas
          orthographic
          camera={{
            position: [
              0,
              0,
              10,
            ],
            zoom: 100,
          }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference:
              'high-performance',
          }}
        >
          <CursorScene
            state={cursorState}
            reducedMotion={
              Boolean(
                reducedMotion
              )
            }
          />
        </Canvas>
      </div>

      {/* ===================================================
          MINIMAL DOM IMPACT
      =================================================== */}

      <div
        ref={rootRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          md:block
        "
        style={{
          width: 0,
          height: 0,
          willChange:
            'transform',
        }}
      >
        {/* -----------------------------------------------
            CLICK ENERGY
        ------------------------------------------------ */}

        <div
          ref={glowRef}
          className="
            absolute
            left-0
            top-0
            h-8
            w-8
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            opacity-0
          "
          style={{
            background:
              `
                radial-gradient(
                  circle,
                  rgba(233,255,196,0.9)
                  0%,
                  rgba(180,255,57,0.45)
                  18%,
                  transparent
                  70%
                )
              `,
            filter:
              'blur(2px)',
          }}
        />

        {/* -----------------------------------------------
            GEOMETRIC CLICK IMPACT
        ------------------------------------------------ */}

        <div
          ref={impactRef}
          className="
            absolute
            left-0
            top-0
            h-7
            w-7
            -translate-x-1/2
            -translate-y-1/2
            border
            border-[#B4FF39]
            opacity-0
          "
          style={{
            clipPath:
              `
                polygon(
                  50% 0%,
                  100% 50%,
                  50% 100%,
                  0% 50%
                )
              `,
          }}
        />
      </div>
    </>
  );
}