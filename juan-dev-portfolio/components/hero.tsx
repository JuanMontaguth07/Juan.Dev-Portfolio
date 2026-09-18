"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300"
          >
            {t("badge")}
          </motion.span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {t("greeting")} <br />
            {t("firstName")}{" "}
            <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
              {t("lastName")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg dark:text-zinc-300">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
            >
              {t("ctaProjects")}
            </motion.a>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <FeaturedProjectCard />
        </motion.div>
      </div>
    </section>
  );
}
