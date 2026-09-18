import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import { ContactForm } from "@/components/contact-form";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";
import { cn, glassCard } from "@/lib/utils";

type ContactLink = {
  key: "email" | "github" | "linkedin" | "whatsapp";
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const LINKS: ContactLink[] = [
  {
    key: "email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    key: "github",
    value: "GitHub",
    href: siteConfig.github,
    icon: GithubIcon,
  },
  {
    key: "linkedin",
    value: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinIcon,
  },
  {
    key: "whatsapp",
    value: "WhatsApp",
    href: siteConfig.whatsapp,
    icon: WhatsappIcon,
  },
];

export function ContactSection() {
  const t = useTranslations("Contact");
  const td = useTranslations("Contact.direct");
  const tf = useTranslations("Contact.form");

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="max-w-2xl">
        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
          {t("eyebrow")}
        </span>
        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <div className={cn(glassCard, "flex h-full flex-col p-7")}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {td("heading")}
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300">
              {td("description")}
            </p>

            <ul className="mt-6 space-y-3">
              {LINKS.map(({ key, value, href, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={cn(
                      glassCard,
                      "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-md hover:shadow-cyan-500/10 dark:hover:border-cyan-400/30 dark:hover:shadow-cyan-400/10",
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500 dark:text-zinc-500">
                        {td(`${key}Label`)}
                      </span>
                      <span className="block truncate text-sm font-medium text-slate-800 dark:text-zinc-200">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:outline-none dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
            >
              <Mail className="h-4 w-4" />
              {td("cta")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={cn(glassCard, "p-7")}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {tf("heading")}
            </h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
