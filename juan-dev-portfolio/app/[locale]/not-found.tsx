import { ArrowLeft, FolderGit2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn, glassCard } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-6 py-20">
      <div className={cn(glassCard, "rise-in w-full p-6 font-mono sm:p-8")}>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-xs text-slate-500 dark:text-zinc-500">
            juan.dev — 404
          </span>
        </div>

        <p className="mt-6 text-sm text-slate-700 dark:text-zinc-200">
          <span className="text-cyan-600 dark:text-cyan-400">$</span> open
          requested-page
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          error: 404 — route not found
        </p>

        <p className="mt-8 bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text font-sans text-7xl font-bold tracking-tight text-transparent sm:text-8xl dark:from-cyan-400 dark:to-blue-500">
          404
        </p>
        <h1 className="mt-2 font-sans text-2xl font-bold text-slate-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="mt-2 font-sans text-sm text-slate-600 dark:text-zinc-300">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 font-sans">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-[1.03] dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("home")}
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            <FolderGit2 className="h-4 w-4" />
            {t("projects")}
          </Link>
        </div>
      </div>
    </div>
  );
}
