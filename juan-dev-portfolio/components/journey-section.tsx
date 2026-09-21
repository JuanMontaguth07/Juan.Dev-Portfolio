import { Briefcase, GraduationCap, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { cn, glassCard } from "@/lib/utils";

type Experience = {
  period: string;
  title: string;
  org: string;
  description: string;
};

type Language = { name: string; level: string };

const iconBadge =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-md";

export function JourneySection() {
  const t = useTranslations("Journey");
  const experience = t.raw("experience") as Experience[];
  const languages = t.raw("languages") as Language[];
  const professional = t.raw("professional") as string[];

  return (
    <section
      id="journey"
      className="mx-auto max-w-7xl border-b border-black/10 px-6 py-20 dark:border-white/10"
    >
      <Reveal className="max-w-2xl">
        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
          {t("eyebrow")}
        </span>
        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-zinc-300">
          {t("subtitle")}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <div>
            <Reveal>
              <SectionLabel>{t("educationLabel")}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} className="mt-5">
              <div className={cn(glassCard, "flex items-start gap-4 p-5")}>
                <span className={iconBadge}>
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {t("education.title")}
                    </h3>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-700 uppercase dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                      {t("education.tag")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-zinc-300">
                    {t("education.org")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                    {t("education.period")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionLabel>{t("experienceLabel")}</SectionLabel>
            </Reveal>
            <ol className="relative mt-5 space-y-5 border-l border-black/10 pl-6 dark:border-white/10">
              {experience.map((item, i) => (
                <li key={item.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[30px] h-3 w-3 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 ring-4 ring-white/70 dark:ring-slate-950/70"
                  />
                  <Reveal delay={i * 0.05}>
                    <div className={cn(glassCard, "p-5")}>
                      <div className="flex items-start gap-3">
                        <span className={cn(iconBadge, "hidden sm:flex")}>
                          <Briefcase className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold tracking-wide text-cyan-700 uppercase dark:text-cyan-300">
                            {item.period}
                          </p>
                          <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-zinc-400">
                            {item.org}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <Reveal>
              <SectionLabel>{t("languagesLabel")}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} className="mt-5">
              <div className={cn(glassCard, "p-5")}>
                <div className="flex items-center gap-3">
                  <span className={iconBadge}>
                    <Languages className="h-5 w-5" />
                  </span>
                </div>
                <ul className="mt-4 divide-y divide-black/10 dark:divide-white/10">
                  {languages.map((lang) => (
                    <li
                      key={lang.name}
                      className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-slate-800 dark:text-zinc-200">
                        {lang.name}
                      </span>
                      <span className="rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionLabel>{t("professionalLabel")}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} className="mt-5 flex flex-wrap gap-2">
              {professional.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
