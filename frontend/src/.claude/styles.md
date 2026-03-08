# 🎨 Visual & Interaction Design System

## 🍏 Aesthetic Guidelines
- **Philosophy:** Apple-inspired minimalism. High-fidelity, sleek, and elegant.
- **Vibe:** "Living" UI. Subtle glassmorphism, backdrop blurs, and neumorphic depth.
- **Default:** Dark Mode (Light Mode via toggle).

## 🎬 Animation & Custom CSS
- **Modular Animations:** Do NOT force complex animations into Tailwind classes. 
- **Separation of Concerns:** Create individual `.css` files in `/src/styles/animations/` (e.g., `ShimmerEffect.css`, `HeroEntrance.css`).
- **Tooling:** Use **GSAP** for timelines and **Anime.js v4** for lightweight physics. Use vanilla CSS for transitions that don't require JS-orchestration.
- **Logic:** Animations should feel "tactile"—physics-based (springs/overshoots) rather than linear.

## 🌈 The OKLCH Theme Engine
- **The Core:** All color variables must be defined using `oklch()`.
- **Presets:** 20 curated OKLCH themes (e.g., "Midnight Neon", "Chiefs Red", "Lakers Purple").
- **Customization Logic:** - User picks Primary, Secondary, and Accent.
    - **Dynamic Harmony:** Auto-calculate Grayscale (Blacks/Whites/Grays) by shifting the Primary color's Lightness (L) while locking the Hue (H).
- **Visual Feedback:** The Light/Dark toggle must trigger a tooltip showing the specific React `useState` / `setTheme` code.

## 🕹️ Motion & Performance
- **Backgrounds:** 4 selectable modes (SVG Path, Canvas, R3F Gradient, Gif Mask).
- **Performance Controller:** - **Toggle:** Master switch to disable animations for low-end hardware.
    - **Speed Slider:** Global `timeScale` variable that GSAP/Anime.js instances must subscribe to.

## 📖 Educational Layout
- **Organization:** Clean, zero-clutter, intuitive navigation.
- **Rosetta Interaction:** Every element should feel tactile. Hovering code should "pulse" the corresponding English explanation.