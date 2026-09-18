import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { PrimarySkillTile } from "@/components/skill-tile";
import { cn, glassCard } from "@/lib/utils";
import {
  approachSkills,
  dataSkills,
  developmentSkills,
  environmentSkills,
} from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("Skills");
  const learningItems = t.raw("learningItems") as string[];

  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl border-b border-black/10 px-6 py-20 dark:border-white/10"
    >
      <Reveal className="max-w-2xl">
        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
          {t("eyebrow")}
        </span>
        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-zinc-300">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mt-12 space-y-12">
        <div>
          <Reveal>
            <SectionLabel>{t("groupDevelopment")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {developmentSkills.map((skill, i) => {
              const { icon: Icon, ...serializableSkill } = skill;
              return (
                <Reveal key={skill.slug} delay={i * 0.05}>
                  <PrimarySkillTile
                    skill={serializableSkill}
                    icon={
                      Icon && <Icon className="h-5 w-5" aria-hidden="true" />
                    }
                    description={t(`descriptions.${skill.descriptionKey}`)}
                    levelLabel={t("levelLabel")}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionLabel>{t("groupData")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataSkills.map((skill, i) => {
              const { icon: Icon, ...serializableSkill } = skill;
              return (
                <Reveal key={skill.slug} delay={i * 0.05}>
                  <PrimarySkillTile
                    skill={serializableSkill}
                    icon={
                      Icon && <Icon className="h-5 w-5" aria-hidden="true" />
                    }
                    description={t(`descriptions.${skill.descriptionKey}`)}
                    levelLabel={t("levelLabel")}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionLabel>{t("groupEnvironment")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {environmentSkills.map((skill, i) => {
              const { icon: Icon, ...serializableSkill } = skill;
              return (
                <Reveal key={skill.slug} delay={i * 0.05}>
                  <PrimarySkillTile
                    skill={serializableSkill}
                    icon={
                      Icon && <Icon className="h-5 w-5" aria-hidden="true" />
                    }
                    description={t(`descriptions.${skill.descriptionKey}`)}
                    levelLabel={t("levelLabel")}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionLabel>{t("groupApproaches")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approachSkills.map(({ slug, icon: Icon }, i) => (
              <Reveal key={slug} delay={i * 0.05}>
                <div
                  className={cn(
                    glassCard,
                    "group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10",
                  )}
                >
                  <Icon className="h-5 w-5 text-cyan-600 transition-transform duration-300 group-hover:scale-110 dark:text-cyan-400" />
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                    {t(`approaches.${slug}.title`)}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {t(`approaches.${slug}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14 max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
          {t("learningLabel")}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base dark:text-zinc-200">
          {learningItems.join(" · ")}
        </p>
        <blockquote className="mt-4 border-l-2 border-cyan-500/40 pl-5 text-sm leading-relaxed text-slate-600 italic dark:border-cyan-400/40 dark:text-zinc-400">
          {t("learningQuote")}
        </blockquote>
      </Reveal>
    </section>
  );
}
