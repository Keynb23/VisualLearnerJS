import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitView } from "../components/features/rosetta/SplitView";
import { DeepDiveModal } from "../components/features/rosetta/DeepDiveModal";
import { BookOpen, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/examples")({
  component: Examples,
});

interface ExampleData {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  explanation: string;
  deepDive?: {
    title: string;
    content: React.ReactNode;
  };
}

function Examples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [learningStates, setLearningStates] = useState<Record<string, boolean>>(
    {}
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleLearning = (id: string) => {
    setLearningStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const examples: ExampleData[] = useMemo(
    () => [
      {
        id: "glassmorphism",
        title: "Glassmorphic Surfaces",
        description:
          "Frosty, translucent surfaces with vibrant borders and deep shadows.",
        code: `/* The Magic of Glass */
.GlassCard {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
        explanation:
          "Uses partial opacity background with backdrop-filter blur.\nAdds a subtle semi-transparent border to define the edge.\nApplies a deep shadow for physical separation in 3D space.",
        component: (
          <div className="flex gap-6 relative">
            <div className="h-48 w-48 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-transform hover:scale-110 duration-500" />
            <div className="h-48 w-48 rounded-3xl bg-primary/20 backdrop-blur-xl border border-primary/30 shadow-2xl transition-transform hover:scale-110 duration-500" />
          </div>
        ),
        deepDive: {
          title: "The Physics of Translucency",
          content: (
            <div className="space-y-4">
              <p className="text-foreground/90 font-semibold">
                Backdrop-filter works by taking the pixels behind the element
                and applying a Gaussian blur algorithm.
              </p>
              <p className="text-foreground/90 font-semibold">
                Combining this with an 8-bit alpha channel (RGBA) creates the
                illusion of frosted glass, which reduces visual noise while
                maintaining light continuity.
              </p>
            </div>
          ),
        },
      },
      {
        id: "typography",
        title: "Interactive Typography",
        description: "Bold headings with kinetic feedback and fluid tracking.",
        code: `/* Kinetic Type */
<h2 className="tracking-tighter hover:tracking-normal transition-all duration-700">
  FLOW
</h2>`,
        explanation:
          "Applies extreme negative letter-spacing for high-fashion impact.\nUses the 'group' utilities for parent-child interaction synchronization.\nSmoothly animates tracking values to create a 'breathing' effect.",
        component: (
          <div className="space-y-4 group">
            <h2 className="text-8xl font-black italic tracking-tighter text-primary transition-all duration-700 group-hover:tracking-normal group-hover:-skew-x-12">
              FLOW
            </h2>
          </div>
        ),
        deepDive: {
          title: "Typography as Interface",
          content: (
            <div className="space-y-4">
              <p className="text-foreground/90 font-semibold">
                Kinetic typography leverages human sensitivity to movement to
                draw attention to hierarchy.
              </p>
              <p className="text-foreground/90 font-semibold">
                By using 'tracking-tighter' as a base, we create a tension that
                releases upon interaction, making the text feel alive and
                responsive.
              </p>
            </div>
          ),
        },
      },
      {
        id: "gradients",
        title: "Organic Mesh Gradients",
        description:
          "Fluid, non-linear color transitions using multi-layered blurs.",
        code: `.MeshGradient {
  background: linear-gradient(to top right, var(--primary), var(--accent));
  filter: blur(64px);
  opacity: 0.6;
  animation: pulse 4s infinite alternate;
}`,
        explanation:
          "Layers multiple high-blur circles with different primary color tokens.\nUses 'animate-pulse' to simulate shifting light sources.\nCombines 'from/via/to' utilities for harmonious color bleeding.",
        component: (
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary via-accent to-secondary blur-3xl opacity-60 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-linear-to-bl from-secondary via-primary to-accent blur-3xl opacity-40 animate-bounce" />
          </div>
        ),
        deepDive: {
          title: "The Color Science of Mesh",
          content: (
            <div className="space-y-4">
              <p className="text-foreground/90 font-semibold">
                Traditional gradients follow a strict linear path. Mesh
                gradients simulate 3D light by overlapping radial blurs at
                different depths.
              </p>
              <p className="text-foreground/90 font-semibold">
                Using OKLCH color space ensures that as colors blend, they
                maintain consistent perceived brightness (luminance).
              </p>
            </div>
          ),
        },
      },
    ],
    []
  );

  useEffect(() => {
    // Force ScrollTrigger to refresh after a delay to ensure elements are in place
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".ExampleSection");

      sections.forEach((section) => {
        const content = section.querySelector(".ExampleContent");
        const bg = section.querySelector(".SectionBg");

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 100, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (bg) {
          gsap.fromTo(
            bg,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 0.1,
              scale: 1.5,
              duration: 2,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [examples]); // Re-run if examples change (though they are memoized)

  return (
    <div
      ref={containerRef}
      className="ExamplesPage min-h-screen py-24 px-8 lg:px-32 bg-background"
    >
      <header className="mb-48 max-w-3xl">
        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          INTERACTIVE LEARNING
        </div>
        <h1 className="text-7xl font-black tracking-tight mb-8 leading-tight">
          Component <span className="text-primary italic">Showcase</span>
        </h1>
        <p className="text-2xl text-foreground/90 font-semibold leading-relaxed">
          Master the tech stack by dissecting professional building blocks.
          Click "Learn about me" to reveal the engine's inner logic.
        </p>
      </header>

      <div className="space-y-[40vh] pb-64">
        {examples.map((example) => (
          <section
            key={example.id}
            className="ExampleSection relative min-h-[70vh] flex flex-col justify-center"
          >
            <div className="SectionBg absolute inset-0 -z-10 bg-primary/20 rounded-[5rem] blur-[150px] pointer-events-none" />

            <div className="ExampleContent w-full space-y-12">
              <div className="Header flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border/20 pb-12">
                <div className="Info">
                  <h3 className="text-6xl font-black mb-4 tracking-tighter">
                    {example.title}
                  </h3>
                  <p className="text-xl text-foreground/90 font-semibold max-w-xl">
                    {example.description}
                  </p>
                </div>
                <div className="Actions flex flex-wrap gap-4">
                  <button
                    onClick={() => toggleLearning(example.id)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-background font-black hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                  >
                    {learningStates[example.id] ? (
                      <Sparkles className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                    {learningStates[example.id]
                      ? "Back to Showcase"
                      : "Learn about me"}
                  </button>
                  <button
                    onClick={() => setActiveModal(example.id)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-black hover:bg-primary/5 transition-colors backdrop-blur-sm"
                  >
                    <Info className="h-5 w-5" />
                    How I work
                  </button>
                </div>
              </div>

              <div className="DisplayArea relative min-h-[500px] w-full">
                <AnimatePresence mode="wait">
                  {learningStates[example.id] ? (
                    <motion.div
                      key="learning"
                      initial={{ opacity: 0, scale: 0.98, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full"
                    >
                      <SplitView
                        code={example.code}
                        explanation={example.explanation}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="showcase"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="VisualContent flex justify-center items-center py-32 bg-card/10 rounded-4xl border border-border/10 backdrop-blur-md shadow-2xl"
                    >
                      {example.component}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {example.deepDive && (
              <DeepDiveModal
                isOpen={activeModal === example.id}
                onClose={() => setActiveModal(null)}
                title={example.deepDive.title}
              >
                {example.deepDive.content}
              </DeepDiveModal>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
