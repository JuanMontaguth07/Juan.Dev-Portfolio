"use client";

import { motion } from "framer-motion";
import type { LanguageStat } from "@/data/projects";

export function ProjectLanguageBar({
  languages,
}: {
  languages: LanguageStat[];
}) {
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percent}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ backgroundColor: lang.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((lang) => (
          <li
            key={lang.name}
            className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-zinc-300"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            {lang.name}
            <span className="tabular-nums text-slate-400 dark:text-zinc-500">
              {lang.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
