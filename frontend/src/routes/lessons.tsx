import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SplitView } from "../components/features/rosetta/SplitView";
import { DeepDiveModal } from "../components/features/rosetta/DeepDiveModal";
import { CustomPaletteCreator } from "../components/features/theme/CustomPaletteCreator";
import { PerformanceController } from "../components/features/background/PerformanceController";
import { BackgroundController } from "../components/features/background/BackgroundController";
import { Info, BookOpen, Settings2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/lessons")({
  component: Lessons,
});

const MOCK_LESSON = {
  title: "Zustand State Engine",
  code: `export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "dark",
      primaryColor: { l: 0.6, c: 0.15, h: 250 },
      
      toggleMode: () => {
        const next = get().mode === "light" ? "dark" : "light";
        set({ mode: next });
        get().injectCSSVariables();
      }
    })
  )
);`,
  explanation: `Define the store structure and initial 'dark' state.
Enable persistence to local storage via middleware.
Implement the toggle function with reactive updates.
Trigger the side-effect to inject CSS variables into DOM.`,
  highlights: [
    { line: 4, color: "#3B82F6" },
    { line: 7, color: "#F59E0B" },
    { line: 9, color: "#10B981" },
  ],
};

function Lessons() {
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);

  return (
    <div className="LessonsPage p-8 lg:p-12 space-y-16">
      <header className="PageHeader space-y-4">
        <h1 className="Title text-4xl font-black flex items-center gap-4 text-foreground">
          <BookOpen className="h-10 w-10 text-primary" />
          Interactive Lessons
        </h1>
        <p className="Subtitle text-lg text-foreground/60 max-w-xl">
          Learn how the engine works by dissecting its core logic. Every concept
          is mapped from Code to English.
        </p>
      </header>

      <section className="RosettaSection space-y-8">
        <div className="SectionHeader flex items-center justify-between">
          <h2 className="SectionTitle text-2xl font-bold flex items-center gap-3 text-foreground">
            <Sparkles className="h-6 w-6 text-primary" />
            The Rosetta Engine
          </h2>
          <button
            onClick={() => setIsDeepDiveOpen(true)}
            className="text-sm font-bold text-primary hover:underline flex items-center gap-2 cursor-pointer"
          >
            <Info className="h-4 w-4" />
            Deep Dive Logic
          </button>
        </div>

        <SplitView
          code={MOCK_LESSON.code}
          explanation={MOCK_LESSON.explanation}
          highlights={MOCK_LESSON.highlights}
        />
      </section>

      <section className="EngineGrid grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="LeftCol space-y-8">
          <div className="SectionHeader">
            <h2 className="SectionTitle text-2xl font-bold flex items-center gap-3 text-foreground">
              <Settings2 className="h-6 w-6 text-primary" />
              Theme Engine
            </h2>
          </div>
          <CustomPaletteCreator />
        </div>

        <div className="RightCol space-y-8">
          <div className="SectionHeader">
            <h2 className="SectionTitle text-2xl font-bold flex items-center gap-3 text-foreground">
              <Sparkles className="h-6 w-6 text-primary" />
              Environment Engine
            </h2>
          </div>
          <BackgroundController />
          <PerformanceController />
        </div>
      </section>

      <DeepDiveModal
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
        title="Granular Logic: Zustand Reactivity"
      >
        <div className="ModalContent space-y-6">
          <div className="Block space-y-2">
            <h4 className="font-bold text-lg text-primary">State Proxying</h4>
            <p className="text-foreground/70 leading-relaxed">
              Zustand uses a slim version of the Observer pattern. When
              \`set()\` is called, it triggers a shallow comparison of the new
              state. If changes are detected, it notifies all subscribed
              components (listeners).
            </p>
          </div>
          <div className="Block space-y-2">
            <h4 className="font-bold text-lg text-primary">
              CSS Variable Injection
            </h4>
            <p className="text-foreground/70 leading-relaxed">
              Instead of using standard CSS-in-JS which can cause heavy runtime
              overhead, we inject values directly into CSS Variables at the
              \`:root\` level. This allows Tailwind's OKLCH utilities to react
              instantly with native browser performance.
            </p>
          </div>
          <div className="Block space-y-2">
            <h4 className="font-bold text-lg text-primary">
              Persistence Architecture
            </h4>
            <p className="text-foreground/70 leading-relaxed">
              By using the \`persist\` middleware, we serialize the current
              theme state to \`localStorage\`. On page reload, the engine
              "rehydrates", ensuring your custom palette remains consistent.
            </p>
          </div>
        </div>
      </DeepDiveModal>
    </div>
  );
}
