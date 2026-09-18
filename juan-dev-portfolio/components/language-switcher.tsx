"use client";

import { ChevronDown, Globe, Loader } from "lucide-react";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_META: Record<AppLocale, { label: string; flag: string }> = {
  es: { label: "Español", flag: "🇪🇸" },
  en: { label: "English", flag: "🇬🇧" },
  pt: { label: "Português", flag: "🇵🇹" },
  de: { label: "Deutsch", flag: "🇩🇪" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSelect(nextLocale: AppLocale) {
    setOpen(false);
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
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
            "h-3.5 w-3.5 text-slate-400 transition-transform dark:text-zinc-500",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-black/10 bg-white/95 py-1 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95">
            {routing.locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10",
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
          </ul>
        </>
      )}
    </div>
  );
}
