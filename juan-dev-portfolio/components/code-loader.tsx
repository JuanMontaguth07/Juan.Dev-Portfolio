import { cn, glassCard } from "@/lib/utils";

/**
 * Loading state for routes that render on the server. Pure CSS, and it only
 * fades in after a short delay so quick navigations never flash it.
 */
export function CodeLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="loader-delay flex min-h-[60vh] w-full items-center justify-center px-6"
    >
      <span className="sr-only">Loading</span>
      <div className={cn(glassCard, "w-full max-w-xs p-5 font-mono text-sm")}>
        <p className="text-slate-700 dark:text-zinc-200">
          <span className="text-cyan-600 dark:text-cyan-400">$</span> compiling
          <span className="intro-caret">_</span>
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="loader-bar h-full w-2/5 rounded-full bg-linear-to-r from-cyan-400 to-blue-600" />
        </div>
      </div>
    </div>
  );
}
