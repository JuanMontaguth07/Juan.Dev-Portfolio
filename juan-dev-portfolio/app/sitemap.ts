import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
