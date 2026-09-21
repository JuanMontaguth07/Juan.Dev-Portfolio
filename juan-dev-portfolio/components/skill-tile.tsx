"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import type { TechSkill } from "@/data/skills";
import { cn, glassCard } from "@/lib/utils";

export function PrimarySkillTile({
  skill,
  icon,
  description,
  levelLabel,
}: {
  skill: Omit<TechSkill, "icon">;
  icon?: ReactNode;
  description?: string;
  levelLabel?: string;
}) {
  // A full bar is the one thing here worth calling out: it gets a glow,
  // a warm border and a sweeping highlight so it reads as "mastered".
  const isMaxed = skill.level === 100;

  return (
    <div
      className={cn(
        glassCard,
        "group relative p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10",
        isMaxed &&
          "border-amber-400/60 shadow-lg shadow-orange-500/20 dark:border-amber-300/40 dark:shadow-orange-400/20",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${skill.accent} text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
        >
          {skill.logo ? (
            <Image
              src={skill.logo}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          ) : (
            (icon ?? skill.monogram)
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {skill.name}
            </span>
            {typeof skill.level === "number" && (
              <span
                className={cn(
                  "shrink-0 text-xs font-medium tabular-nums text-slate-400 dark:text-zinc-500",
                  isMaxed &&
                    "text-sm font-bold text-orange-500 dark:text-amber-300",
                )}
              >
                {skill.level}%
              </span>
            )}
          </div>

          {typeof skill.level === "number" && (
            <div className="relative mt-2">
              {isMaxed && (
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full bg-linear-to-r ${skill.accent} opacity-60 blur-md`}
                />
              )}
              <div
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={
                  levelLabel ? `${levelLabel}: ${skill.name}` : skill.name
                }
                className={cn(
                  "relative w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10",
                  isMaxed ? "h-2.5" : "h-1.5",
                )}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className={`relative h-full overflow-hidden rounded-full bg-linear-to-r ${skill.accent} transition-[filter] duration-300 group-hover:brightness-110`}
                >
                  {isMaxed && (
                    <span
                      aria-hidden="true"
                      className="bar-shimmer absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/70 to-transparent"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      {description && (
        <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-2 pl-13 text-xs leading-snug text-slate-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
