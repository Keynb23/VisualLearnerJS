import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useThemeStore } from "../../../store/useThemeStore";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { performance, primaryColor, accentColor } = useThemeStore();

  const primaryOklch = useMemo(
    () => `oklch(${primaryColor.l} ${primaryColor.c} ${primaryColor.h})`,
    [primaryColor]
  );

  const accentOklch = useMemo(
    () => `oklch(${accentColor.l} ${accentColor.c} ${accentColor.h})`,
    [accentColor]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * performance.speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 4);
      meshRef.current.rotation.y = Math.cos(t / 4);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color={primaryOklch}
        attach="material"
        distort={0.4}
        speed={performance.speed * 2}
        roughness={0.5}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function R3FBackground() {
  const { performance } = useThemeStore();

  if (!performance.enabled) return null;

  return (
    <div className="R3FBackground fixed inset-0 -z-10 pointer-events-none opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
