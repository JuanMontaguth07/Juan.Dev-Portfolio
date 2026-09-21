import { CircleCheckBig, Gem, Heart, Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { cn, glassCard } from "@/lib/utils";

export function StatsRow() {
  const t = useTranslations("Stats");

  const stats = [
    { icon: Package, value: `+${projects.length}`, label: t("projects") },
    { icon: Gem, value: "1", label: t("experience") },
    { icon: CircleCheckBig, value: "100%", label: t("commitment") },
    { icon: Heart, value: "∞", label: t("passion") },
  ];

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div
              className={cn(
                glassCard,
                "flex items-center gap-3 px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5",
              )}
            >
              <Icon className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {value}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  {label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
