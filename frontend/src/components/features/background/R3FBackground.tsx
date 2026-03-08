import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useThemeStore } from "../../../store/useThemeStore";

// ─── Sphere Config ────────────────────────────────────────────────────────────

/**
 * Definition for each floating sphere in the depth scene.
 * Placing them at different Z positions creates a real sense of depth.
 */
const SPHERE_CONFIGS = [
  { position: [-2,    1,  -3] as [number, number, number], scale: 1.8, colorKey: "primary"   as const, distort: 0.3, phaseOffset: 0    },
  { position: [ 2.5, -1,   0] as [number, number, number], scale: 1.2, colorKey: "accent"    as const, distort: 0.5, phaseOffset: 2.1  },
  { position: [-0.5,  2,   3] as [number, number, number], scale: 0.8, colorKey: "secondary" as const, distort: 0.4, phaseOffset: 4.2  },
];

// ─── Camera Rig ───────────────────────────────────────────────────────────────

/**
 * CameraRig — subtly shifts the camera based on mouse position each frame,
 * creating a parallax effect that emphasizes the depth between spheres.
 * Movement is lerped for a smooth, lag-behind feel.
 */
function CameraRig({
  mousePos,
  speed,
}: {
  mousePos: React.RefObject<{ x: number; y: number }>;
  speed: number;
}) {
  useFrame((state) => {
    // Normalize mouse coordinates to -1..1 range
    const mx = (mousePos.current.x / window.innerWidth  - 0.5) * 2;
    const my = (mousePos.current.y / window.innerHeight - 0.5) * 2;

    // Gently lerp the camera toward the target offset — max ±0.5 units
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mx * 0.5,
      0.02 * speed
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      -my * 0.3,
      0.02 * speed
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Floating Sphere ─────────────────────────────────────────────────────────

/**
 * FloatingSphere — a single animated 3D sphere with distortion material.
 * Each sphere has a phase offset so they move independently, avoiding sync.
 */
function FloatingSphere({
  position,
  scale,
  color,
  distort,
  phaseOffset,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  distort: number;
  phaseOffset: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phaseOffset;
    if (meshRef.current) {
      // Each sphere bobs and rotates on its own independent phase
      meshRef.current.rotation.x = Math.sin(t / 4) * 0.6;
      meshRef.current.rotation.y = Math.cos(t / 3) * 0.6;
      meshRef.current.position.y = position[1] + Math.sin(t / 2) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed * 1.5}
        roughness={0.4}
        metalness={0.7}
      />
    </Sphere>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

/**
 * DepthScene — the inner Three.js scene with lights, spheres, and camera rig.
 * Separated from the Canvas wrapper to keep the outer component clean.
 */
function DepthScene({
  mousePos,
}: {
  mousePos: React.RefObject<{ x: number; y: number }>;
}) {
  const { performance, primaryColor, secondaryColor, accentColor } = useThemeStore();

  // Resolve OKLCH colors to CSS strings — memoized so they only recalculate on theme change
  const colors = useMemo(() => ({
    primary:   `oklch(${primaryColor.l}   ${primaryColor.c}   ${primaryColor.h})`,
    secondary: `oklch(${secondaryColor.l} ${secondaryColor.c} ${secondaryColor.h})`,
    accent:    `oklch(${accentColor.l}    ${accentColor.c}    ${accentColor.h})`,
  }), [primaryColor, secondaryColor, accentColor]);

  return (
    <>
      {/* Three-point lighting for color variation across sphere surfaces */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[5, 5, 5]} color={colors.accent} intensity={0.3} />

      {/* Render each sphere — different Z depths create the parallax effect */}
      {SPHERE_CONFIGS.map((cfg) => (
        <FloatingSphere
          key={cfg.colorKey}
          position={cfg.position}
          scale={cfg.scale}
          color={colors[cfg.colorKey]}
          distort={cfg.distort}
          phaseOffset={cfg.phaseOffset}
          speed={performance.speed}
        />
      ))}

      {/* Camera rig — applies mouse parallax to the camera each frame */}
      <CameraRig mousePos={mousePos} speed={performance.speed} />
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * R3FBackground — the "Depth" background mode.
 *
 * Three floating 3D spheres positioned at different depths (Z positions)
 * create a genuine sense of spatial depth. The camera subtly shifts based on
 * mouse position (parallax), making the depth feel tangible.
 *
 * Performance: heaviest of the 4 modes — requires WebGL via Three.js.
 * Animation speed scales with performance.speed from the global store.
 */
export function R3FBackground() {
  const { performance } = useThemeStore();

  // Track mouse position in a ref — shared down to CameraRig via prop
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (!performance.enabled) return null;

  return (
    <div className="R3FBackground fixed inset-0 -z-10 pointer-events-none opacity-25">
      {/* Suspense wrapper for forward compatibility with future useLoader calls */}
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 6], fov: 70 }}>
          <DepthScene mousePos={mousePos} />
        </Canvas>
      </Suspense>
    </div>
  );
}
