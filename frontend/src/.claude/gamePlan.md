# 🗺️ Project Game Plan: The Visual Textbook
Status Key: > 🔲 To Do | 🏗️ In Progress | ✅ Completed

## Phase 1: The Foundation (Skeleton)
- [ ] **Dependency Injection:** Install and verify all packages listed in @techStack.md.
- [ ] **Architecture Setup:**
    - [ ] Initialize TanStack Router (File-based).
    - [ ] Setup Zustand store (Theme, Performance, App State).
    - [ ] Configure Tailwind with OKLCH CSS variable support.
- [ ] **The "Logic" Shell:**
    - [ ] Build `MainLayout` with glassmorphic sidebar and Apple-style minimalism.
    - [ ] Implement Light/Dark toggle with "Code Explanation" tooltip (hover to see code).
    - [ ] Enforce `className="Prefix tailwind..."` across all base components.

## Phase 2: Environment & Performance (The Rosetta Core)
- [ ] **Explanation Engine Implementation:**
    - [ ] Build the side-by-side split view (Code on Left / English on Right).
    - [ ] Color-code lines to match the tooltip highlighting.
    - [ ] Build the "Deep Dive" Modal (React Aria) for granular logic explanations.
- [ ] **The Background Engine:**
    - [ ] Build 3 Background options (SVG, Canvas, R3F Gradient).
    - [ ] Build the Performance Controller (Speed slider + On/Off toggle).
- [ ] **The Theme Engine:**
    - [ ] Implement the 20 curated OKLCH presets.
    - [ ] Build the Custom Palette Creator (Color wheel for Primary/Secondary/Accent).
    - [ ] Implement auto-generation logic for contrast-safe Grayscale based on Primary color.

## Phase 3: The Educational Core
- [ ] **The Stack Visualizer:**
    - [ ] "Library Map": Interactive nodes for the tech stack (Zustand, Jotai, etc.).
    - [ ] Add Professional Context: Explain how these scale in production.
- [ ] **The Syntax Encyclopedia:**
    - [ ] Checklist of JS/TS concepts (Closures, Hoisting, Generics, etc.).
    - [ ] Build interactive "Visual Analogies" for each syntax concept.

## Phase 4: The Playground
- [ ] **Sandpack Integration:**
    - [ ] Live-code environment supporting React, TS, and Tailwind.
    - [ ] Add "Copy to Clipboard" for snippets.