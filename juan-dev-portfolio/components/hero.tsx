import { Briefcase, Download, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-black/10 dark:border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.3),transparent),radial-gradient(ellipse_60%_50%_at_85%_10%,rgba(139,92,246,0.16),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.18),transparent)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="rise-in">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
            {t("badge")}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t("greeting")} <br />
            {t("firstName")} <br />
            <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
              {t("lastName")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg dark:text-zinc-300">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-[1.04] active:scale-[0.98] dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
            >
              {t("ctaProjects")}
            </a>
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
            >
              <Download className="h-4 w-4" />
              {t("ctaCv")}
            </a>
            <a
              href={siteConfig.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ctaEmailLabel")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {(siteConfig.availability.freelance ||
            siteConfig.availability.contract) && (
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {siteConfig.availability.freelance && (
                <li className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping dark:bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </span>
                  {t("availableFreelance")}
                </li>
              )}
              {siteConfig.availability.contract && (
                <li className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
                  <Briefcase className="h-3.5 w-3.5" />
                  {t("workingContract")}
                </li>
              )}
            </ul>
          )}
        </div>

        <div
          className="rise-in"
          style={{ "--rise-delay": "0.15s" } as CSSProperties}
        >
          <FeaturedProjectCard />
        </div>
      </div>
    </section>
  );
}
