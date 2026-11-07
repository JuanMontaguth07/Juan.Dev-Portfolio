"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * A nod to Claude Code's "working" line — spinner glyph + rotating gerund +
 * dim hint — cycling through the four steps of "Mi forma de construir".
 */
export function ClaudeStatus() {
  const t = useTranslations("Hero");
  const verbs = t.raw("statusVerbs") as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % verbs.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [verbs.length]);

  return (
    <p
      className="mt-6 flex items-center gap-2 font-mono text-sm"
      aria-live="off"
    >
      <span
        aria-hidden="true"
        className="claude-spinner inline-block w-4 text-center text-base text-claude"
      />
      <span className="text-claude">{verbs[index]}…</span>
      <span className="text-slate-500 dark:text-zinc-500">
        ({t("statusHint")})
      </span>
    </p>
  );
}
