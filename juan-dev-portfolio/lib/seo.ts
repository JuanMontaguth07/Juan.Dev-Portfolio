import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const OG_LOCALE: Record<string, string> = {
  es: "es_CO",
  en: "en_US",
  pt: "pt_BR",
  de: "de_DE",
};

/**
 * Canonical URL, hreflang alternates and Open Graph for one page. Every page
 * builds its own because Next replaces (not merges) these objects per level.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string;
  path?: string;
  title?: string;
  description?: string;
}): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}${path}`]),
  );
  languages["x-default"] = `/${routing.defaultLocale}${path}`;

  // Set explicitly: a page's openGraph replaces the parent's, which would
  // drop the image the [locale] segment provides.
  const image = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Juan.Dev — Juan Diego Montaguth Rodríguez",
  };

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: "Juan.Dev",
      title: title ? `${title} · Juan.Dev` : "Juan.Dev",
      ...(description ? { description } : {}),
      url: `/${locale}${path}`,
      locale: OG_LOCALE[locale] ?? locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · Juan.Dev` : "Juan.Dev",
      ...(description ? { description } : {}),
      images: [image.url],
    },
  };
}
