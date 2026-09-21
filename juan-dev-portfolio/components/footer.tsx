import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"] as const;

const socialLinkClasses =
  "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-600 shadow-sm transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-none dark:hover:text-white";

export function Footer() {
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
                J
              </span>
              <span className="text-base font-semibold text-slate-900 dark:text-white">
                Juan<span className="text-cyan-500 dark:text-cyan-400">.</span>
                Dev
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-zinc-400">
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
              {tFooter("navLabel")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item}`}
                    className="text-sm text-slate-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
                  >
                    {tNav(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-zinc-500">
              {tFooter("connectLabel")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.email}
                className={socialLinkClasses}
              >
                <Mail className="h-4 w-4" />
              </a>
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
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-slate-500 sm:flex-row dark:border-white/10 dark:text-zinc-500">
          <p>
            © {year} Juan Diego. {tFooter("rights")}
          </p>
          <p>{tFooter("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
