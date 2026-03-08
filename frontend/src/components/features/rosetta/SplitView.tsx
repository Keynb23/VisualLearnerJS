import React from "react";
import { motion } from "framer-motion";

interface SplitViewProps {
  code: string;
  explanation: string;
  highlights?: { line: number; color: string }[];
}

export function SplitView({
  code,
  explanation,
  highlights = [],
}: SplitViewProps) {
  const codeLines = code.split("\n");
  const explanationLines = explanation.split("\n");

  return (
    <div className="SplitView grid grid-cols-1 lg:grid-cols-2 gap-8 border border-border rounded-3xl overflow-hidden bg-card/10 backdrop-blur-sm">
      {/* Code Side */}
      <div className="CodePanel p-6 bg-slate-950/90 font-mono text-sm overflow-x-auto border-r border-border shadow-2xl">
        <div className="PanelHeader text-slate-500 mb-4 flex items-center justify-between">
          <span className="Label uppercase tracking-widest text-[10px] font-bold">
            Source Code
          </span>
          <div className="Controls flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
          </div>
        </div>
        <pre className="CodeContent text-slate-300">
          {codeLines.map((line, i) => {
            const h = highlights.find((h) => h.line === i + 1);
            return (
              <div
                key={i}
                className={`Line flex gap-4 px-2 -mx-2 transition-colors duration-300 ${
                  h ? "bg-opacity-20" : ""
                }`}
                style={{ backgroundColor: h ? h.color + "33" : undefined }}
              >
                <span className="LineNumber text-slate-700 w-8 select-none text-right">
                  {i + 1}
                </span>
                <span className="LineText">{line || " "}</span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Explanation Side */}
      <div className="ExplanationPanel p-8 flex flex-col justify-center">
        <div className="PanelHeader text-primary mb-6">
          <span className="Label uppercase tracking-widest text-xl underline decoration-primary decoration-2 font-bold">
            English Translation
          </span>
        </div>
        <div className="ExplanationContent text-foreground/90 font-semibold leading-relaxed space-y-6">
          {explanationLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="TextLine text-md text-foreground/90 leading-relaxed font-semibold"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
