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
  tags: ["Java", "JavaScript", "HTML5", "CSS3"],
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

const hardwareMarketplace: Project = {
  slug: "hardware-marketplace",
  messageKey: "hardwareMarketplace",
  href: "/projects/hardware-marketplace",
  categories: ["web", "fullstack"],
  tags: ["HTML5", "CSS3", "JavaScript", "SQL"],
  gradient: "from-amber-500/45 via-orange-600/25 to-slate-950",
  status: "mvp",
  collaboration: "team",
  teamSize: 3,
};

const hardwareStore: Project = {
  slug: "hardware-store",
  messageKey: "hardwareStore",
  href: "/projects/hardware-store",
  categories: ["web", "fullstack"],
  // Same stack as this portfolio, per confirmation.
  tags: featuredProject.tags,
  gradient: "from-blue-500/40 via-cyan-500/25 to-slate-950",
  status: "inDevelopment",
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
  sayfer,
  hardwareMarketplace,
  hardwareStore,
  weatherApp,
  legalResearch,
];
