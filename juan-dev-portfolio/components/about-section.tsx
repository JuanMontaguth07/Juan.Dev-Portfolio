import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { cn, glassCard } from "@/lib/utils";

type ProcessStep = { number: string; title: string; description: string };

const richValues = {
  b: (chunks: ReactNode) => (
    <strong className="font-semibold text-slate-900 dark:text-white">
      {chunks}
    </strong>
  ),
  i: (chunks: ReactNode) => (
    <em className="text-slate-500 italic dark:text-zinc-400">{chunks}</em>
  ),
  hl: (chunks: ReactNode) => (
    <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
      {chunks}
    </span>
  ),
  code: (chunks: ReactNode) => (
    <code className="rounded-md bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-700 dark:bg-white/10 dark:text-cyan-300">
      {chunks}
    </code>
  ),
};

export function AboutSection() {
  const t = useTranslations("About");
  const process = t.raw("process") as ProcessStep[];
  const chips = t.raw("chips") as string[];

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl border-b border-black/10 px-6 py-20 dark:border-white/10"
    >
      <Reveal className="max-w-2xl">
        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
          {t("eyebrow")}
        </span>
      </Reveal>
      <Reveal delay={0.05} className="mt-5 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t.rich("hook", richValues)}
        </h2>
      </Reveal>

      <div className="mt-8 max-w-3xl space-y-4">
        {([1, 2, 3, 4, 5] as const).map((n, i) => (
          <Reveal key={n} delay={0.1 + i * 0.06}>
            <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-300">
              {t.rich(`intro${n}`, richValues)}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <SectionLabel>{t("processLabel")}</SectionLabel>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <div
                className={cn(
                  glassCard,
                  "group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10",
                )}
              >
                <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105 dark:from-cyan-400 dark:to-blue-500">
                  {step.number}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1} className="mt-12 max-w-3xl">
        <blockquote className="border-l-2 border-cyan-500/40 pl-5 text-lg font-medium text-slate-700 dark:border-cyan-400/40 dark:text-zinc-200">
          {t.rich("closingQuote", richValues)}
        </blockquote>
      </Reveal>

      <Reveal className="my-14 h-px max-w-3xl bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

      <div className="max-w-3xl">
        <Reveal>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("beyondTitle")}
          </h3>
          <p className="mt-3 text-base font-medium text-slate-700 dark:text-zinc-200">
            {t("beyondIntro")}
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-300">
            {t.rich("beyondParagraph", richValues)}
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-300">
            {t("beyondClosing")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-base font-semibold text-slate-800 dark:border-cyan-400/20 dark:bg-cyan-400/5 dark:text-zinc-100">
            {t("beyondPullQuote")}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className="mt-10 text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
          {t("focusLabel")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              {chip}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
