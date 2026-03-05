import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lessons")({
  component: Lessons,
});

function Lessons() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Lessons Page</h1>
      <p className="mt-4">Placeholder for the curriculum.</p>
    </div>
  );
}
