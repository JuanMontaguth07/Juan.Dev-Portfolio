import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { GalaxyBackground } from "@/components/galaxy-background";
import { IntroLoader } from "@/components/intro-loader";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: "Juan.Dev", template: "%s · Juan.Dev" },
    description: t("description"),
    authors: [{ name: "Juan Diego Montaguth Rodríguez" }],
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var d=document.documentElement;if(sessionStorage.getItem("introSeen")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.introSeen="1"}}catch(e){}',
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NextIntlClientProvider>
            <IntroLoader />
            <GalaxyBackground />
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <BackToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
