import { useEffect, useRef } from "react";
import { useThemeStore } from "../../../store/useThemeStore";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Maximum number of particles in the constellation */
const PARTICLE_COUNT = 80;

/** Distance threshold in pixels at which two particles draw a connecting line */
const CONNECTION_DISTANCE = 120;

/** Strength of the mouse gravity well pulling particles toward the cursor */
const GRAVITY_STRENGTH = 0.4;

/** Maximum speed a particle can reach in either axis (pixels per frame) */
const MAX_SPEED = 2.5;

/** Velocity damping applied each frame to prevent runaway acceleration */
const DAMPING = 0.98;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CanvasBackground — the "Interactive" background mode.
 *
 * Renders a constellation of particles connected by fading lines.
 * The mouse cursor acts as a gravity well — particles gently drift toward it,
 * creating an organic, reactive feel without being distracting.
 *
 * Performance: medium weight — canvas 2D, ~80 particles, O(n²) line checks.
 * Animation speed scales with performance.speed from the global store.
 */
export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { performance, primaryColor } = useThemeStore();

  // Mouse position tracked as a ref to avoid triggering re-renders each frame
  const mousePos = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!performance.enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // ── Helpers ─────────────────────────────────────────────────────────────

    /** Resize the canvas to fill the viewport */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    /** Clamp a value between min and max */
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    // ── Initialization ───────────────────────────────────────────────────────

    /** Spawn all particles at random positions with small random velocities */
    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        vx:     (Math.random() - 0.5) * performance.speed,
        vy:     (Math.random() - 0.5) * performance.speed,
        radius: Math.random() * 1.5 + 1,
      }));
    };

    // ── Frame Loop ───────────────────────────────────────────────────────────

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { l, c, h } = primaryColor;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Update each particle's position
      for (const p of particles) {
        // Vector from particle to mouse
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Apply gravity force — strength falls off with distance, scaled by speed
        const force = (GRAVITY_STRENGTH * performance.speed) / dist;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;

        // Damp velocity and cap at max speed
        p.vx = clamp(p.vx * DAMPING, -MAX_SPEED, MAX_SPEED);
        p.vy = clamp(p.vy * DAMPING, -MAX_SPEED, MAX_SPEED);

        // Move particle and wrap at canvas edges
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > canvas.width)  p.x = 0;
        if (p.x < 0)             p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0)             p.y = canvas.height;
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            // Line fades out as particles move apart
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `oklch(${l} ${c} ${h} / ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw each particle as a small filled circle
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${l} ${c} ${h} / 0.6)`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // ── Event Listeners ──────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performance.enabled, performance.speed, primaryColor]);

  if (!performance.enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="CanvasBackground fixed inset-0 -z-10 pointer-events-none opacity-40"
    />
  );
}
