import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stack")({
  component: Stack,
});

function Stack() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Stack Visualizer</h1>
      <p className="mt-4">Placeholder for 3D stack visualization.</p>
    </div>
  );
}
