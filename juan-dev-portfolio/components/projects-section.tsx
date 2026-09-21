import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";

const FEATURED_COUNT = 3;

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          <span className="text-cyan-600 dark:text-cyan-400">·</span>{" "}
          {t("title")}{" "}
          <span className="text-cyan-600 dark:text-cyan-400">·</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </Reveal>

      <ProjectsGrid limit={FEATURED_COUNT} />

      <Reveal delay={0.15} className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
