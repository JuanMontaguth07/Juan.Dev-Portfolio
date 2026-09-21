import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { featuredProject } from "@/data/projects";
import { cn, glassCard } from "@/lib/utils";

export function FeaturedProjectCard() {
  const t = useTranslations("FeaturedProject");
  const tp = useTranslations("ProjectData");
  const title = tp(`${featuredProject.messageKey}.title`);
  const description = tp(`${featuredProject.messageKey}.description`);

  return (
    <div
      className={cn(
        glassCard,
        "group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10",
      )}
    >
      <span className="text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-300">
        · {t("badge")}
      </span>

      <div
        className={cn(
          "relative mt-4 flex h-52 items-end overflow-hidden rounded-xl p-5",
          !featuredProject.image &&
            `bg-linear-to-br ${featuredProject.gradient}`,
        )}
      >
        {featuredProject.image && (
          <>
            <Image
              src={featuredProject.image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          </>
        )}
        <span className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 text-sm font-bold text-white backdrop-blur-sm">
          01
        </span>
        {!featuredProject.image && (
          <span className="text-2xl font-semibold text-white/90 transition-transform duration-500 group-hover:scale-105">
            {title}
          </span>
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {featuredProject.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={featuredProject.href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        {t("cta")}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
