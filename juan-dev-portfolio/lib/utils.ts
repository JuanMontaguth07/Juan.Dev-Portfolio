import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The site's one glass-card recipe. Pass it into `cn()` alongside
 * layout/spacing/hover classes rather than restating border/bg/blur/shadow
 * per component — that drift (bg-white/50 vs /60 vs /70, blur-md vs -xl...)
 * is what made sections feel visually inconsistent.
 */
export const glassCard =
  "rounded-2xl border border-slate-900/12 bg-white/70 shadow-[var(--card-highlight),0_1px_2px_rgba(15,23,42,0.05),0_18px_40px_-26px_rgba(56,189,248,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[var(--card-highlight),0_1px_2px_rgba(0,0,0,0.3)]";
