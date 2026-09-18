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
   * GitHub-style language breakdown, only set when measured from real
   * source (lines of code per file type) — omitted rather than guessed
   * for projects whose code isn't in this repo.
   */
  languages?: LanguageStat[];
  collaboration?: "solo" | "team";
  /** Only set when a specific headcount was confirmed. */
  teamSize?: number;
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
    { name: "TypeScript", percent: 91, color: "#3178c6" },
    { name: "CSS", percent: 8, color: "#563d7c" },
    { name: "JavaScript", percent: 1, color: "#f1e05a" },
  ],
  collaboration: "solo",
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
  hardwareMarketplace,
  hardwareStore,
  weatherApp,
  legalResearch,
];
