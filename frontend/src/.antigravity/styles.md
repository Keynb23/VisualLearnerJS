# Visual & Interaction Design System

## Design Philosophy
- **Aesthetic:** Apple-inspired minimalism fused with "alive" interactive elements.
- **Atmosphere:** Deep glassmorphism and soft neumorphic depth. Clean, organized, and hyper-legible.

## Theme Engine (OKLCH)
- **Default:** Dark Mode.
- **Presets:** 20 curated OKLCH themes (e.g., Midnight, Forest, Cyberpunk).
- **Customization:** A color wheel for Primary, Secondary, and Accent.
- **Auto-Logic:** Grayscale (Whites/Blacks/Grays) must be dynamically generated based on the Primary OKLCH hue to ensure perfect color harmony.
- **Logic Toggle:** The Light/Dark mode button must feature a tooltip explaining the React/JS logic behind the theme shift.

## Backgrounds & Animation
- **Animated Backgrounds:** 3 selectable options (Minimal, Interactive, and 3D).
- **Performance Control:** Include a UI slider for animation speed and a toggle to disable backgrounds for low-end hardware.
- **Motion:** GSAP for complex timelines (concept visualizations) and Framer Motion for UI micro-interactions.

## User Experience
- **Clarity:** Avoid "Visual Noise." Every animation must serve an educational or navigational purpose.
- **Interactive Textbook:** The site must feel like a physical object that reacts to the user's touch and code input.