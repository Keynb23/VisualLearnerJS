import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: Playground,
});

function Playground() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Playground</h1>
      <p className="mt-4">Interactive code playground.</p>
    </div>
  );
}
