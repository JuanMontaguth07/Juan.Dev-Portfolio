import type { Metadata } from "next";
import { ArrowLeft, Check, ExternalLink, User, Users } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { GithubIcon } from "@/components/icons/brand-icons";
import { ProjectLanguageBar } from "@/components/project-language-bar";
import { ProjectStatusBadge } from "@/components/project-status-badge";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { cn, glassCard } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!hasLocale(routing.locales, locale) || !project) return {};

  const t = await getTranslations({ locale, namespace: "ProjectData" });
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: t(`${project.messageKey}.title`),
    description: t(`${project.messageKey}.description`),
  });
}

export default async function ProjectDetailPage(
  props: PageProps<"/[locale]/projects/[slug]">,
) {
  const { locale, slug } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations("ProjectData");
  const td = await getTranslations("ProjectDetail");
  const key = project.messageKey;

  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const tagline = t.has(`${key}.tagline`) ? t(`${key}.tagline`) : description;
  const tags = t.has(`${key}.tags`)
    ? (t.raw(`${key}.tags`) as string[])
    : project.tags;

  const hasWhatIBuilt = t.has(`${key}.whatIBuilt`);
  const whatIBuilt = hasWhatIBuilt
    ? (t.raw(`${key}.whatIBuilt`) as string[])
    : [];
  const hasParticipation = t.has(`${key}.participation`);
  const hasDemonstrates = t.has(`${key}.demonstrates`);
  const hasCustomStatus = t.has(`${key}.status`);

  const CollaborationIcon = project.collaboration === "solo" ? User : Users;
  const collaborationLabel =
    project.collaboration === "team" && project.teamSize
      ? td("teamOf", { count: project.teamSize })
      : project.collaboration
        ? td(project.collaboration)
        : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <Reveal>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {td("back")}
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6">
        <ProjectStatusBadge status={project.status}>
          {hasCustomStatus ? t(`${key}.status`) : undefined}
        </ProjectStatusBadge>
        <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-zinc-300">
          {tagline}
        </p>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      {project.languages && project.languages.length > 0 && (
        <Reveal delay={0.1} className="mt-12">
          <SectionLabel>{td("languagesLabel")}</SectionLabel>
          <div className={cn(glassCard, "mt-5 p-6")}>
            <ProjectLanguageBar languages={project.languages} />
          </div>
        </Reveal>
      )}

      {collaborationLabel && (
        <Reveal delay={0.15} className="mt-12">
          <SectionLabel>{td("howLabel")}</SectionLabel>
          <div className={cn(glassCard, "mt-5 p-6")}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
              <CollaborationIcon className="h-3.5 w-3.5" />
              {collaborationLabel}
            </span>
            {hasParticipation && (
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-zinc-300">
                {t(`${key}.participation`)}
              </p>
            )}
          </div>
        </Reveal>
      )}

      {hasWhatIBuilt && (
        <Reveal delay={0.2} className="mt-12">
          <SectionLabel>{td("whatBuiltLabel")}</SectionLabel>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {whatIBuilt.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-300"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {hasDemonstrates && (
        <Reveal delay={0.25} className="mt-12">
          <SectionLabel>{td("demonstratesLabel")}</SectionLabel>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-zinc-300">
            {t(`${key}.demonstrates`)}
          </p>
        </Reveal>
      )}

      {project.links && (
        <Reveal delay={0.28} className="mt-12 flex flex-wrap gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-[1.03] dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
            >
              <ExternalLink className="h-4 w-4" />
              {td("viewDemo")}
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
            >
              <GithubIcon className="h-4 w-4" />
              {td("viewCode")}
            </a>
          )}
        </Reveal>
      )}

      <Reveal delay={0.3} className="mt-14">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
          {td("back")}
        </Link>
      </Reveal>
    </div>
  );
}
