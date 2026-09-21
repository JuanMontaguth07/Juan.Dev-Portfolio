import { ArrowLeft } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";

export default async function AllProjectsPage(
  props: PageProps<"/[locale]/projects">,
) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("Projects");
  const tn = await getTranslations("Nav");

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {tn("home")}
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {t("allTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </Reveal>

      <ProjectsGrid showFilters />
    </div>
  );
}
