import { createFileRoute } from "@tanstack/react-router";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { autocompletion } from "@codemirror/autocomplete";

export const Route = createFileRoute("/playground")({
  component: Playground,
});

const DEFAULT_CODE = `export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white p-8">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-5xl font-black tracking-tighter text-blue-500">
          PLAYGROUND
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Experiment with React and Tailwind CSS in real-time. 
          Edit this code to see the changes on the right!
        </p>
        <div className="flex justify-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-500/20 animate-pulse" />
          <div className="h-12 w-12 rounded-full bg-purple-500/20 animate-pulse delay-75" />
          <div className="h-12 w-12 rounded-full bg-pink-500/20 animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
}`;

function Playground() {
  return (
    <div className="PlaygroundPage h-screen w-full flex flex-col overflow-hidden bg-zinc-950">
      <header className="px-8 py-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Interactive Playground
          </h1>
          <p className="text-xs text-zinc-500">
            Live-code concepts and share snippets instantly.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Live Sync Active
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <SandpackProvider
          template="react"
          theme="dark"
          files={{
            "/App.js": DEFAULT_CODE,
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout className="h-full border-none! rounded-none! flex">
            <SandpackCodeEditor
              className="h-full flex-1 min-w-[40%] text-base!"
              showTabs
              showLineNumbers
              showInlineErrors
              closableTabs
              extensions={[autocompletion()]}
            />
            <SandpackPreview
              className="h-full flex-1 min-w-[40%] bg-zinc-950"
              showOpenInCodeSandbox={false}
              showRefreshButton
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
