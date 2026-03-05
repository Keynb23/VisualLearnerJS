# Technical Specification & Project Mission

## Core Tech Stack
- **Framework:** React, TypeScript (Strict), Vite.
- **Styling:** Tailwind CSS, CVA (Class Variance Authority).
- **State:** Zustand (Global/Theme), Atoms by Jotai (Lesson Progress).
- **Routing/Data:** Tanstack Router, Tanstack Query.
- **Forms/Validation:** React Hook Form, Zod.
- **Components:** React Aria (Accessibility), Sandpack (Live Playground).
- **Animation/3D:** GSAP, Framer Motion, Three.js, React Three Fiber, Drei.

## The "Visual Textbook" & Stack Visualizer
- **Concept Encyclopedia:** Every JS/TS feature must have a visual analogy and an interactive component.
- **The Library Map:** A dedicated section explaining the "Professional Context" of this tech stack. It must link to official docs and explain how these tools interact in a production codebase.
- **The Playground:** A live-code environment supporting React, TS, and Tailwind CSS.

## Development Rules
- **Naming:** `className="Prefix tailwind-classes"` is mandatory.
- **Files:** Strictly `.ts` and `.tsx`.
- **Performance:** Implement a "Performance Controller" logic—all animations and 3D scenes must listen to a global `performance_mode` state (Speed/Off/On).