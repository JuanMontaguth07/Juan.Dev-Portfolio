"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollPast } from "@/lib/use-scroll-past";
import { siteConfig } from "@/lib/site-config";
import { cn, glassCard } from "@/lib/utils";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"] as const;

const socialLinkClasses =
  "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-none dark:hover:text-white";

export function Navbar() {
  const t = useTranslations("Nav");
  const bubble = useScrollPast(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-2 z-50 mx-2 sm:mx-4">
      <motion.div
        animate={{ y: bubble ? 0 : -8, scale: bubble ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 45, mass: 0.3 }}
        className={cn(
          // backdrop-filter is intentionally left out of this transition:
          // animating blur radius forces the browser to resample the
          // (constantly repainting) canvas background every frame of the
          // transition, which is what made this feel laggy. The blur only
          // ever needs to flip on/off, never animate.
          "relative rounded-[22px] transition-[background-color,box-shadow] duration-300 ease-out",
          bubble &&
            "bg-white/80 shadow-md shadow-cyan-900/10 backdrop-blur-lg dark:bg-slate-950/70 dark:shadow-black/25",
        )}
      >
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
              J
            </span>
            <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
              Juan<span className="text-cyan-500 dark:text-cyan-400">.</span>
              Dev
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-zinc-300 dark:hover:text-cyan-400"
                >
                  {t(item)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={siteConfig.github}
              aria-label="GitHub"
              className={cn(socialLinkClasses, "hidden sm:flex")}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              aria-label="LinkedIn"
              className={cn(socialLinkClasses, "hidden sm:flex")}
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.whatsapp}
              aria-label="WhatsApp"
              className={cn(socialLinkClasses, "hidden sm:flex")}
            >
              <WhatsappIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              className={cn(socialLinkClasses, "md:hidden")}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(glassCard, "mt-2 overflow-hidden p-2 md:hidden")}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-black/5 hover:text-cyan-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-cyan-400"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
              <li className="mt-1 flex items-center gap-2 border-t border-black/10 pt-2 sm:hidden dark:border-white/10">
                <a
                  href={siteConfig.github}
                  aria-label="GitHub"
                  className={socialLinkClasses}
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  aria-label="LinkedIn"
                  className={socialLinkClasses}
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.whatsapp}
                  aria-label="WhatsApp"
                  className={socialLinkClasses}
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
