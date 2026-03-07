import React from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../../../store/useThemeStore";

export function SVGBackground() {
  const { performance } = useThemeStore();

  if (!performance.enabled) return null;

  return (
    <div className="SVGBackground fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000">
        <motion.circle
          cx="200"
          cy="200"
          r="300"
          fill="var(--color-primary)"
          animate={{
            x: [0, 400, 0],
            y: [0, 300, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 / performance.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ filter: "blur(100px)" }}
        />
        <motion.circle
          cx="800"
          cy="700"
          r="250"
          fill="var(--color-accent)"
          animate={{
            x: [0, -300, 0],
            y: [0, -400, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25 / performance.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ filter: "blur(120px)" }}
        />
        <motion.circle
          cx="500"
          cy="500"
          r="350"
          fill="var(--color-secondary)"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 / performance.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(150px)" }}
        />
      </svg>
    </div>
  );
}
