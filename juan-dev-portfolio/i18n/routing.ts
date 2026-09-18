import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "pt", "de"],
  defaultLocale: "es",
});

export type AppLocale = (typeof routing.locales)[number];
