import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-4 w-1 rounded-full bg-linear-to-b from-cyan-400 to-blue-600" />
      <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
        {children}
      </p>
    </div>
  );
}
