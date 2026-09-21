"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Loader } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { useDismiss } from "@/lib/use-dismiss";
import { cn } from "@/lib/utils";

const LOCALE_META: Record<AppLocale, { label: string; flag: string }> = {
  es: { label: "Español", flag: "🇪🇸" },
  en: { label: "English", flag: "🇬🇧" },
  pt: { label: "Português", flag: "🇵🇹" },
  de: { label: "Deutsch", flag: "🇩🇪" },
};

// globals.css fades <main>/<footer> while this attribute is on, so the
// language swap reads as a soft fade instead of a hard text pop.
function setSwitching(on: boolean) {
  const root = document.documentElement;
  if (on) root.setAttribute("data-switching", "true");
  else root.removeAttribute("data-switching");
}

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, open, close);

  useEffect(() => {
    if (!isPending) setSwitching(false);
  }, [isPending, locale]);

  function handleSelect(nextLocale: AppLocale) {
    setOpen(false);
    if (nextLocale === locale) return;
    setSwitching(true);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-70 sm:gap-1.5 sm:px-3 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:shadow-none dark:hover:bg-white/10"
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin text-cyan-500 dark:text-cyan-400" />
        ) : (
          <Globe className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        )}
        <span className="font-medium uppercase">{locale}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-zinc-500",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-black/10 bg-white/95 py-1 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95"
          >
            {routing.locales.map((code) => (
              <li key={code} role="option" aria-selected={code === locale}>
                <button
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10",
                    code === locale && "text-cyan-600 dark:text-cyan-400",
                  )}
                >
                  <span className="text-base leading-none">
                    {LOCALE_META[code].flag}
                  </span>
                  {LOCALE_META[code].label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
