"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useHasMounted } from "@/lib/use-has-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const isDark = hasMounted && resolvedTheme === "dark";

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    const apply = () => {
      flushSync(() => setTheme(next));
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    // View Transitions cross-fade the whole page (galaxy <-> sky included)
    // instead of snapping. Unsupported browsers just switch instantly.
    const start = (
      document as Document & {
        startViewTransition?: (callback: () => void) => unknown;
      }
    ).startViewTransition;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (start && !reduceMotion) start.call(document, apply);
    else apply();
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex h-7 w-14 items-center rounded-full border border-black/10 bg-white/70 px-1 shadow-sm backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-white/5 dark:shadow-none"
    >
      <Sun className="absolute left-1.5 h-3.5 w-3.5 text-amber-500/40" />
      <Moon className="absolute right-1.5 h-3.5 w-3.5 text-cyan-500/40 dark:text-cyan-300/40" />
      <motion.span
        className="z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white shadow dark:bg-slate-950"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.6 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <Moon className="h-3 w-3 text-cyan-500" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <Sun className="h-3 w-3 text-amber-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
