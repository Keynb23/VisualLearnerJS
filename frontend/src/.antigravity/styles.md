# 🎨 Visual & Interaction Design System

## 🍏 Aesthetic Guidelines
- **Philosophy:** Apple-inspired minimalism. High-fidelity, sleek, and elegant.
- **Vibe:** "Living" UI. Subtle glassmorphism, backdrop blurs, and neumorphic depth.
- **Default:** Dark Mode (Light Mode via toggle).

## 🌈 The OKLCH Theme Engine
- **The Core:** All color variables must be defined using `oklch()`.
- **Presets:** 20 curated OKLCH themes (e.g., "Midnight Neon", "Nordic Forest").
- **Customization Logic:** - User picks Primary, Secondary, and Accent hues.
    - System **must** auto-calculate Grayscale (Blacks, Whites, Grays) by shifting the Primary color's Lightness while maintaining its Hue for visual harmony.
- **Visual Feedback:** The Light/Dark toggle MUST trigger a tooltip showing the specific React state code used for the switch.

## 🕹️ Motion & Performance
- **Backgrounds:** 3 selectable modes:
    1. **SVG Path:** Lightweight vector motion.
    2. **Canvas:** High-performance particle system.
    3. **R3F Gradient:** Interactive 3D noise/gradient meshes.
- **Performance Controller:** UI slider for animation speed and a master toggle to disable heavy visuals for low-performance machines.
- **Standard:** Use GSAP for high-precision logic visualizers; Framer Motion for standard UI state changes.

## 📖 Educational Layout
- **Organization:** Clean, zero-clutter, intuitive navigation.
- **Interaction:** Every element should feel tactile and responsive to user input.