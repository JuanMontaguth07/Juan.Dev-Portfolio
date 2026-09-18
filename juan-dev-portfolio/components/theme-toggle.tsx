"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/use-has-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const isDark = hasMounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
