export type ProjectCategory =
  | "web"
  | "tools"
  | "design"
  | "fullstack"
  | "research";

export type ProjectStatus = "mvp" | "finished" | "inDevelopment" | "proposal";

export type LanguageStat = {
  name: string;
  percent: number;
  color: string;
};

export type Project = {
  slug: string;
  messageKey: string;
  href: string;
  categories: ProjectCategory[];
  tags: string[];
  gradient: string;
  status: ProjectStatus;
  /** Real screenshot, when there is one. Falls back to the gradient when absent. */
  image?: string;
  /**
   * Which part of the screenshot the card's short crop keeps (a Tailwind
   * object-position class). Defaults to "object-top".
   */
  imagePosition?: "object-top" | "object-center";
  /**
   * Language breakdown copied from the project's GitHub repository (the
   * "Languages" API, share of bytes per language), snapshot taken 2026-09.
   * Only set for projects that have a public repo — omitted rather than
   * guessed for the rest. Re-run the API call to refresh it.
   */
  languages?: LanguageStat[];
  collaboration?: "solo" | "team";
  /** Only set when a specific headcount was confirmed. */
  teamSize?: number;
  /** Public links, shown on the detail page only when real ones exist. */
  links?: { repo?: string; demo?: string };
  /**
   * A project built for the owner's own use rather than as a portfolio
   * showcase — shown with a "personal project" badge instead of repo/demo
   * links, even if a private repo exists.
   */
  personal?: boolean;
};

/**
 * This portfolio site itself — the only project with real, measured
 * language stats (from its own source), so it's both the hero's featured
 * card and an entry in the filterable grid below.
 */
export const featuredProject: Project = {
  slug: "portfolio",
  messageKey: "portfolio",
  href: "/projects/portfolio",
  categories: ["web", "design", "fullstack"],
  tags: ["Next.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
  gradient: "from-cyan-400/50 via-indigo-500/30 to-slate-950",
  status: "finished",
  image: "/images/projects/portfolio.png",
  languages: [
    { name: "TypeScript", percent: 94.3, color: "#3178c6" },
    { name: "CSS", percent: 5.4, color: "#663399" },
    { name: "JavaScript", percent: 0.3, color: "#f1e05a" },
  ],
  collaboration: "solo",
  links: {
    repo: "https://github.com/JuanMontaguth07/Juan.Dev-Portfolio",
    demo: "https://juandevportfolio.vercel.app",
  },
};

const sayfer: Project = {
  slug: "sayfer",
  messageKey: "sayfer",
  href: "/projects/sayfer",
  categories: ["web", "fullstack"],
  // React + TypeScript come from the dashboard frontend, kept in its own repo
  // (JuanMontaguth07/FrontEndSayfer); the language bar below is the main repo's.
  tags: ["Java", "JavaScript", "React", "TypeScript", "HTML5", "CSS3"],
  gradient: "from-amber-400/50 via-yellow-500/25 to-slate-950",
  status: "finished",
  image: "/images/projects/sayfer.svg",
  collaboration: "team",
  // Confirmed: the user plus 4 other people.
  teamSize: 5,
  links: { repo: "https://github.com/angel-DSM/Sayfer" },
  languages: [
    { name: "Java", percent: 39.6, color: "#b07219" },
    { name: "JavaScript", percent: 32.8, color: "#f1e05a" },
    { name: "HTML", percent: 18.8, color: "#e34c26" },
    { name: "CSS", percent: 8.8, color: "#663399" },
  ],
};

/**
 * Kova Studio — the hardware store, now live. It absorbed the old "Hardware
 * Marketplace" entry (same project); /projects/hardware-marketplace redirects
 * here (see next.config.ts). Slug kept as "hardware-store" so links shared
 * before the rename keep working.
 */
const hardwareStore: Project = {
  slug: "hardware-store",
  messageKey: "hardwareStore",
  href: "/projects/hardware-store",
  categories: ["web", "fullstack"],
  tags: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
  ],
  gradient: "from-blue-500/40 via-cyan-500/25 to-slate-950",
  status: "finished",
  image: "/images/projects/kova-studio.png",
  // Confirmed: a 3-person team on paper, but all development was the user's alone.
  collaboration: "solo",
  links: {
    repo: "https://github.com/JuanMontaguth07/WebEcomerce",
    demo: "https://kovastudio-sigma.vercel.app",
  },
  // Snapshot 2026-11 (JavaScript at 0.03% omitted).
  languages: [
    { name: "TypeScript", percent: 89.8, color: "#3178c6" },
    { name: "PLpgSQL", percent: 8.0, color: "#336790" },
    { name: "CSS", percent: 2.2, color: "#663399" },
  ],
};

const weatherApp: Project = {
  slug: "weather-app",
  messageKey: "weatherApp",
  href: "/projects/weather-app",
  categories: ["web", "tools"],
  tags: ["JavaScript", "HTML5", "CSS3"],
  gradient: "from-sky-400/45 via-blue-500/25 to-slate-950",
  status: "finished",
  image: "/images/projects/weather-app.png",
  collaboration: "solo",
  links: { repo: "https://github.com/JuanMontaguth07/weather-app-test" },
  languages: [
    { name: "CSS", percent: 49.1, color: "#663399" },
    { name: "JavaScript", percent: 35.2, color: "#f1e05a" },
    { name: "HTML", percent: 15.7, color: "#e34c26" },
  ],
};

const personalFinance: Project = {
  slug: "personal-finance",
  messageKey: "personalFinance",
  href: "/projects/personal-finance",
  categories: ["tools", "web"],
  tags: ["HTML5", "CSS3", "JavaScript"],
  gradient: "from-emerald-500/45 via-green-600/25 to-slate-950",
  status: "finished",
  // The PIN lock screen; centered so the crop keeps the card, not the ceiling.
  image: "/images/projects/personal-finance.png",
  imagePosition: "object-center",
  collaboration: "solo",
  personal: true,
  // Repo made public later; the badge stays, the links now show too.
  links: { repo: "https://github.com/JuanMontaguth07/Finanzas" },
  // Snapshot 2026-11.
  languages: [
    { name: "JavaScript", percent: 93.4, color: "#f1e05a" },
    { name: "CSS", percent: 5.2, color: "#663399" },
    { name: "HTML", percent: 1.4, color: "#e34c26" },
  ],
};

const legalResearch: Project = {
  slug: "legal-software-research",
  messageKey: "legalResearch",
  href: "/projects/legal-software-research",
  categories: ["research"],
  tags: [],
  gradient: "from-violet-500/35 via-slate-600/25 to-slate-950",
  status: "proposal",
};

export const projects: Project[] = [
  featuredProject,
  hardwareStore,
  sayfer,
  weatherApp,
  personalFinance,
  legalResearch,
];
