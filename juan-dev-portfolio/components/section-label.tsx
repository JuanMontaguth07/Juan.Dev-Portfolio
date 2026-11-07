import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Claude Code's asterisk in place of the old accent bar. */}
      <span aria-hidden="true" className="text-base leading-none text-claude">
        ✻
      </span>
      <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
        {children}
      </p>
    </div>
  );
}
