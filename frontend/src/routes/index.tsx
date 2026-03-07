import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in feature cards on scroll
      gsap.from(".FeatureCard", {
        scrollTrigger: {
          trigger: ".FeatureGrid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Simple parallax for Hero
      gsap.to(".HeroSection", {
        scrollTrigger: {
          trigger: ".HeroSection",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="PageContainer flex flex-col p-8 lg:p-12">
      <div className="HeroSection max-w-2xl">
        <h1 className="Title text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground">
          The <span className="TextHighlight text-primary">Visual</span>{" "}
          Textbook
        </h1>
        <p className="Description mt-6 text-xl text-foreground/70 leading-relaxed">
          An interactive, visual encyclopedia for the JavaScript and React
          ecosystem. Bridge the gap between code and concept with real-time 3D
          visualizers.
        </p>
        <div className="ActionButtons mt-10 flex flex-wrap gap-4">
          <Link to="/lessons">
            <button className="PrimaryActionButton bg-primary text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              Start Learning
            </button>
          </Link>
          <Link to="/playground">
            <button className="SecondaryActionButton border border-border px-8 py-4 rounded-full font-bold hover:bg-muted transition-colors backdrop-blur-sm">
              View Playground
            </button>
          </Link>
        </div>
      </div>

      <div className="FeatureGrid mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Atomic State",
            description:
              "Understand Jotai and the power of atomic state management with real-time dependency graphs.",
            tag: "State Management",
          },
          {
            title: "Concurrent Rendering",
            description:
              "Visualize how React 19 handles multiple tasks at once with the new Transition API and fiber architecture.",
            tag: "Performance",
          },
          {
            title: "Color Logic",
            description:
              "Experience the precision of the OKLCH color space and master harmonious palette generation.",
            tag: "Design Systems",
          },
          {
            title: "TanStack Ecosystem",
            description:
              "Master enterprise-grade routing and data fetching with TanStack Router and Query.",
            tag: "Architecture",
          },
          {
            title: "GSAP Timelines",
            description:
              "Build movie-grade animations by mastering high-performance GSAP timeline sequences.",
            tag: "Animation",
          },
          {
            title: "3D Context",
            description:
              "Bridge the 2D/3D gap with React Three Fiber and bring code concepts into physical space.",
            tag: "3D Rendering",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="FeatureCard p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-colors group"
          >
            <div className="FeatureTag text-[10px] font-bold uppercase tracking-widest text-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
              {feature.tag}
            </div>
            <h3 className="FeatureTitle text-xl font-bold mb-3">
              {feature.title}
            </h3>
            <p className="FeatureDescription text-foreground/60 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="MissionSection mt-40 max-w-3xl">
        <h2 className="SectionTitle text-4xl font-bold tracking-tight mb-8">
          Bridging the gap between{" "}
          <span className="GradientText text-primary italic">Syntax</span> and{" "}
          <span className="GradientText text-primary italic">
            Mental Models
          </span>
          .
        </h2>
        <div className="ContentGrid grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="ContentBlock">
            <h4 className="BlockTitle font-bold text-lg mb-2">The Problem</h4>
            <p className="BlockText text-foreground/70 leading-relaxed">
              Most documentation focuses on what code does, but rarely how it
              feels in the engine. Beginners often struggle with invisible
              concepts like closures or the call stack.
            </p>
          </div>
          <div className="ContentBlock">
            <h4 className="BlockTitle font-bold text-lg mb-2">The Solution</h4>
            <p className="BlockText text-foreground/70 leading-relaxed">
              The Visual Textbook makes the invisible visible. Through
              interactive 3D analogies, we map complex logic to physical
              behavior, making it impossible to forget.
            </p>
          </div>
        </div>
      </div>

      <div className="FooterCTA mt-40 mb-20 text-center p-16 rounded-[3rem] bg-linear-to-b from-primary/5 to-transparent border border-primary/10">
        <h2 className="CTATitle text-3xl font-bold mb-6">
          Ready to see code in a new light?
        </h2>
        <button className="CTALink bg-foreground text-background px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform">
          Join the Educational Revolution
        </button>
      </div>
    </div>
  );
}
