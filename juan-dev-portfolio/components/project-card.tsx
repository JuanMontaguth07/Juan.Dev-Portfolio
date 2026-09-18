import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { ProjectStatusBadge } from "@/components/project-status-badge";
import { cn, glassCard } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const tp = useTranslations("ProjectData");
  const title = tp(`${project.messageKey}.title`);
  const description = tp(`${project.messageKey}.description`);
  const tags = tp.has(`${project.messageKey}.tags`)
    ? (tp.raw(`${project.messageKey}.tags`) as string[])
    : project.tags;

  return (
    <div
      className={cn(
        glassCard,
        "group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10",
      )}
    >
      <div
        className={cn(
          "relative flex h-36 items-end overflow-hidden p-4",
          !project.image && `bg-linear-to-br ${project.gradient}`,
        )}
      >
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <span className="absolute inset-0 scale-105 bg-linear-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        <span className="relative rounded-md bg-black/40 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
          {title}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <ProjectStatusBadge status={project.status} className="shrink-0" />
        </div>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-zinc-400">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={project.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          {t("cta")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
