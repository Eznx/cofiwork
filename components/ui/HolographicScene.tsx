'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const poseStops = [0, 0.16, 0.29, 0.43, 0.57, 0.71, 0.85, 1];
const xStops = [1.25, 1.4, -1.1, 1.15, -1.25, 1.2, -1.15, 0.2];
const yStops = [0.05, -0.25, 0.38, 0.12, -0.28, 0.22, -0.12, -0.32];
const scaleStops = [1, 0.88, 0.72, 0.92, 0.75, 0.95, 0.76, 0.62];
const tau = Math.PI * 2;

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function Artifact() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Points>(null);
  const { pointer, size } = useThree();
  const particleGeometry = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const depths = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const seed = seeded(i + 17);
      const seed2 = seeded(i * 1.731 + 9);
      const seed3 = seeded(i * 3.113 + 41);
      const radius = 1.8 + seed * 7.5;
      const angle = seed2 * tau;
      const spiral = angle + radius * 0.75;
      positions[i * 3] = Math.cos(spiral) * radius * (0.72 + seed3 * 0.5);
      positions[i * 3 + 1] = (seed3 - 0.5) * (2.8 + radius * 0.42);
      positions[i * 3 + 2] = Math.sin(spiral) * radius * (0.72 + seed2 * 0.5);
      seeds[i] = seed;
      sizes[i] = 0.5 + seed2 * 2.2;
      depths[i] = THREE.MathUtils.clamp((radius - 1.8) / 7.5, 0, 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
    return geometry;
  }, []);
  const particleMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uBase: { value: new THREE.Color('#0c403c') },
      uAccent: { value: new THREE.Color('#a6f5dd') },
      uGold: { value: new THREE.Color('#b4ff39') },
    },
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      attribute float aDepth;
      uniform float uTime;
      uniform float uScroll;
      uniform vec2 uPointer;
      varying float vDepth;
      varying float vSeed;
      void main() {
        vec3 p = position;
        float t = uTime * 0.14;
        float rotation = t * (0.25 + aSeed * 0.2);
        float c = cos(rotation);
        float s = sin(rotation);
        p.xz = mat2(c, -s, s, c) * p.xz;
        float wave = sin(p.y * 0.8 + aSeed * 8.0 + uTime * 0.65);
        p += normalize(p + vec3(0.001)) * wave * (0.025 + aDepth * 0.06);
        float spiral = sin(atan(p.z, p.x) * 3.0 + length(p.xz) * 1.7 - uTime * 0.35);
        p.y += spiral * 0.08 * aDepth;
        float cursorDistance = distance(vec2(p.x, p.z) * 0.12, uPointer);
        float cursorInfluence = exp(-cursorDistance * 4.0);
        p.x += uPointer.x * cursorInfluence * 0.7;
        p.z += uPointer.y * cursorInfluence * 0.7;
        p.y += uScroll * (0.55 + aDepth * 0.7);
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        float perspective = 250.0 / max(1.0, -mvPosition.z);
        gl_PointSize = aSize * perspective * (0.75 + aDepth * 0.75);
        gl_Position = projectionMatrix * mvPosition;
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
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float core = 1.0 - smoothstep(0.02, 0.22, d);
        float halo = 1.0 - smoothstep(0.12, 0.5, d);
        vec3 color = mix(uBase, uAccent, vDepth);
        color = mix(color, uGold, pow(vSeed, 5.0) * 0.65);
        float alpha = halo * (0.14 + core * 0.72) * (0.25 + vDepth * 0.75);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    const pageProgress = typeof window === 'undefined'
      ? 0
      : window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let segment = poseStops.findIndex((stop, index) => index < poseStops.length - 1 && pageProgress >= stop && pageProgress <= poseStops[index + 1]);
    if (segment < 0) segment = poseStops.length - 2;
    const mix = THREE.MathUtils.clamp((pageProgress - poseStops[segment]) / (poseStops[segment + 1] - poseStops[segment]), 0, 1);
    const mobileScale = size.width < 640 ? 0.62 : 1;
    const targetX = THREE.MathUtils.lerp(xStops[segment], xStops[segment + 1], mix) * (size.width < 640 ? 0.48 : 1);
    const targetY = THREE.MathUtils.lerp(yStops[segment], yStops[segment + 1], mix);
    const targetScale = THREE.MathUtils.lerp(scaleStops[segment], scaleStops[segment + 1], mix) * mobileScale;
    particleMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    particleMaterial.uniforms.uScroll.value = pageProgress;
    particleMaterial.uniforms.uPointer.value.lerp(pointer, 0.08);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 2.2, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 2.2, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 2.2, delta));
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.34 + state.clock.elapsedTime * 0.055 + pageProgress * Math.PI * 0.6, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.22, 3, delta);
    core.current.rotation.y += delta * 0.14;
    if (cloud.current) {
      cloud.current.rotation.y -= delta * 0.025;
      cloud.current.rotation.z += delta * 0.008;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.14} floatIntensity={0.24}>
      <group ref={group}>
        <points ref={cloud} geometry={particleGeometry} material={particleMaterial} frustumCulled={false} />
        <mesh ref={core}>
          <icosahedronGeometry args={[1.08, 18]} />
          <MeshDistortMaterial color="#b9ffe8" emissive="#176653" emissiveIntensity={0.58} roughness={0.14} metalness={0.42} distort={0.22} speed={1.4} />
        </mesh>
        <mesh scale={1.16}>
          <icosahedronGeometry args={[1.08, 3]} />
          <meshBasicMaterial color="#bdffe9" wireframe transparent opacity={0.18} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0.85, 0.2, 0.3]}>
          <torusGeometry args={[1.75, 0.008, 8, 220]} />
          <meshBasicMaterial color="#c8fff1" transparent opacity={0.72} />
        </mesh>
        <mesh rotation={[1.18, -0.5, -0.28]}>
          <torusGeometry args={[2.05, 0.006, 8, 220]} />
          <meshBasicMaterial color="#b4ff39" transparent opacity={0.58} />
        </mesh>
        <mesh rotation={[0.25, 0.35, 1.1]}>
          <torusGeometry args={[1.48, 0.005, 8, 220]} />
          <meshBasicMaterial color="#c3a9ff" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[1.3, 0.5, 1.1]}>
          <torusGeometry args={[2.75, 0.006, 8, 220]} />
          <meshBasicMaterial color="#9fbcff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0.4, 1.2, 0.2]}>
          <torusGeometry args={[3.3, 0.004, 8, 220]} />
          <meshBasicMaterial color="#d4b8ff" transparent opacity={0.23} />
        </mesh>
        <mesh rotation={[1.1, 0.2, 0.8]}>
          <torusGeometry args={[4.1, 0.003, 8, 220]} />
          <meshBasicMaterial color="#b4ff39" transparent opacity={0.15} />
        </mesh>
        <Sparkles count={110} scale={5.2} size={2.2} speed={0.22} opacity={0.8} color="#c6fff0" />
        <Sparkles count={36} scale={3.5} size={4} speed={0.12} opacity={0.5} color="#b4ff39" />
      </group>
    </Float>
  );
}

export default function HolographicScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9.5], fov: 42, near: 0.1, far: 100 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 4]} intensity={4} distance={10} color="#a6f5dd" />
      <pointLight position={[-4, 2, 2]} intensity={2} distance={12} color="#b4ff39" />
      <pointLight position={[2, -3, -2]} intensity={1.5} distance={12} color="#9b7cff" />
      <Artifact />
    </Canvas>
  );
}
