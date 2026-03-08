import { motion } from "framer-motion";
import { useThemeStore } from "../../../store/useThemeStore";

/**
 * SVGBackground — the "Static" background mode.
 *
 * Renders three large blurred SVG circles that slowly drift and breathe,
 * using the active theme's primary, secondary, and accent OKLCH colors.
 * Each circle has a unique animation duration and path for organic movement.
 *
 * Performance: the lightest of the 4 modes — only CSS + Framer Motion.
 * Animation speed scales with performance.speed from the global store.
 */
export function SVGBackground() {
  const { performance } = useThemeStore();

  // Hide entirely when performance mode is disabled
  if (!performance.enabled) return null;

  return (
    <div className="SVGBackground fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000">

        {/* Primary blob — drifts diagonally across the viewport */}
        <motion.circle
          cx="200"
          cy="200"
          r="300"
          fill="var(--color-primary)"
          animate={{ x: [0, 400, 0], y: [0, 300, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20 / performance.speed, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(100px)", willChange: "transform" }}
        />

        {/* Accent blob — moves in the opposite direction for contrast */}
        <motion.circle
          cx="800"
          cy="700"
          r="250"
          fill="var(--color-accent)"
          animate={{ x: [0, -300, 0], y: [0, -400, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25 / performance.speed, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(120px)", willChange: "transform" }}
        />

        {/* Secondary blob — pulses in place at the center for ambient glow */}
        <motion.circle
          cx="500"
          cy="500"
          r="350"
          fill="var(--color-secondary)"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15 / performance.speed, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(150px)", willChange: "transform" }}
        />
      </svg>
    </div>
  );
}
