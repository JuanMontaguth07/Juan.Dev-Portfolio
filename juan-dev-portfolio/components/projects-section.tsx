"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { projects, type ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "web", label: t("filterWeb") },
    { key: "tools", label: t("filterTools") },
    { key: "design", label: t("filterDesign") },
    { key: "fullstack", label: t("filterFullstack") },
    { key: "research", label: t("filterResearch") },
  ];

  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

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

      <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === key
                ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-700 dark:border-cyan-400/40 dark:bg-cyan-400/15 dark:text-cyan-300"
                : "border-black/10 bg-black/5 text-slate-600 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10",
            )}
          >
            {label}
          </button>
        ))}
      </Reveal>

      {visibleProjects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center text-sm text-slate-500 dark:text-zinc-400"
        >
          {t("noResults")}
        </motion.p>
      )}

      <Reveal delay={0.15} className="mt-10 flex justify-center">
        <a
          href="#"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
        >
          {t("viewAll")} →
        </a>
      </Reveal>
    </section>
  );
}
