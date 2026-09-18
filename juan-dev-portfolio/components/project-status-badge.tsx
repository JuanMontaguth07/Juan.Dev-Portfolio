import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  mvp: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300",
  finished:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300",
  inDevelopment:
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300",
  proposal:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300",
};

export function ProjectStatusBadge({
  status,
  className,
  children,
}: {
  status: ProjectStatus;
  className?: string;
  children?: ReactNode;
}) {
  const t = useTranslations("Projects");
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
        STATUS_STYLES[status],
        className,
      )}
    >
      {children ?? t(`status.${status}`)}
    </span>
  );
}
