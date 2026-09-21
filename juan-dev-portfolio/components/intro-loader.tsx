"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  "compiling components",
  "optimizing animations",
  "starting portfolio",
];
const PROGRESS = [4, 38, 72, 100];
const STEP_START = [300, 800, 1300];
const STEP_DURATION = 450;
const LEAVE_AT = 2150;
const REMOVE_AT = 2750;

type Phase = "playing" | "leaving" | "done";

/**
 * A short "build log" splash shown once per browser session. A tiny inline
 * script in the layout sets data-intro-seen before first paint for repeat
 * visits (and reduced-motion users), and globals.css hides the overlay then,
 * so there is no flash of it on later pages.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("playing");
  const [started, setStarted] = useState(0);
  const [finished, setFinished] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.introSeen) return;

    root.style.overflow = "hidden";
    const timers: number[] = [];

    STEP_START.forEach((start, i) => {
      timers.push(window.setTimeout(() => setStarted(i + 1), start));
      timers.push(
        window.setTimeout(() => setFinished(i + 1), start + STEP_DURATION),
      );
    });
    timers.push(window.setTimeout(() => setPhase("leaving"), LEAVE_AT));
    timers.push(
      window.setTimeout(() => {
        root.style.overflow = "";
        root.dataset.introSeen = "1";
        try {
          sessionStorage.setItem("introSeen", "1");
        } catch {}
        setPhase("done");
      }, REMOVE_AT),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      root.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "intro-overlay fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-[600ms] ease-out",
        "bg-[linear-gradient(180deg,#bfe3ff_0%,#eef7ff_100%)] dark:bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#04060c_65%)]",
        leaving && "pointer-events-none opacity-0",
      )}
    >
      <div
        className={cn(
          "w-[min(92vw,26rem)] rounded-2xl border border-slate-900/10 bg-white/70 p-5 font-mono text-sm shadow-xl backdrop-blur-xl transition-transform duration-[600ms] ease-out dark:border-white/10 dark:bg-white/5",
          leaving && "scale-[0.97]",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-xs text-slate-500 dark:text-zinc-500">
            juan.dev — build
          </span>
        </div>

        <p className="mt-4 text-slate-700 dark:text-zinc-200">
          <span className="text-cyan-600 dark:text-cyan-400">$</span> npm run
          build<span className="intro-caret">_</span>
        </p>

        <ul className="mt-3 space-y-1.5">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2 text-slate-600 transition-opacity duration-300 dark:text-zinc-400",
                started > i ? "opacity-100" : "opacity-0",
              )}
            >
              {finished > i ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-500" />
              )}
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-600 transition-[width] duration-500 ease-out"
            style={{ width: `${PROGRESS[started]}%` }}
          />
        </div>
      </div>
    </div>
  );
}
