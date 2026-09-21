import {
  Database,
  FileText,
  Layers,
  Puzzle,
  Rocket,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon } from "@/components/icons/brand-icons";
import {
  Css3Icon,
  ExcelIcon,
  GitIcon,
  Html5Icon,
  JavascriptIcon,
  MongodbIcon,
  MysqlIcon,
  PhpIcon,
  PythonIcon,
  VscodeIcon,
  WordpressIcon,
} from "@/components/icons/tech-icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type TechSkill = {
  slug: string;
  name: string;
  monogram: string;
  accent: string;
  descriptionKey: string;
  /** Single-colour glyph drawn on the gradient badge. */
  icon?: IconComponent;
  /**
   * White logo image (public/), for brands whose mark is not in the open
   * icon set. Drawn on the gradient badge like the glyph icons.
   */
  logo?: string;
  /**
   * Approximate familiarity, shown as a progress bar (0-100). Not a claim
   * of mastery — a rough sense of how comfortable I am with each tool, for
   * visual consistency across every skill tile.
   */
  level?: number;
};

export const developmentSkills: TechSkill[] = [
  {
    slug: "html5",
    name: "HTML5",
    monogram: "5",
    accent: "from-orange-500 to-red-500",
    descriptionKey: "html5",
    icon: Html5Icon,
    level: 100,
  },
  {
    slug: "css3",
    name: "CSS3",
    monogram: "3",
    accent: "from-blue-500 to-indigo-500",
    descriptionKey: "css3",
    icon: Css3Icon,
    level: 70,
  },
  {
    slug: "javascript",
    name: "JavaScript",
    monogram: "JS",
    accent: "from-amber-400 to-yellow-500",
    descriptionKey: "javascript",
    icon: JavascriptIcon,
    level: 75,
  },
  {
    slug: "python",
    name: "Python",
    monogram: "Py",
    accent: "from-blue-600 to-cyan-500",
    descriptionKey: "python",
    icon: PythonIcon,
    level: 60,
  },
  {
    slug: "php",
    name: "PHP",
    monogram: "PHP",
    accent: "from-violet-500 to-indigo-600",
    descriptionKey: "php",
    icon: PhpIcon,
    level: 55,
  },
  {
    slug: "java",
    name: "Java",
    monogram: "Ja",
    accent: "from-blue-600 to-red-500",
    descriptionKey: "java",
    logo: "/images/tech/java.svg",
    level: 40,
  },
];

export const dataSkills: TechSkill[] = [
  {
    slug: "sql",
    name: "SQL",
    monogram: "SQL",
    accent: "from-cyan-600 to-sky-500",
    descriptionKey: "sql",
    icon: Database,
    level: 65,
  },
  {
    slug: "mysql",
    name: "MySQL",
    monogram: "My",
    accent: "from-sky-700 to-orange-500",
    descriptionKey: "mysql",
    icon: MysqlIcon,
    level: 65,
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    monogram: "Mo",
    accent: "from-green-600 to-emerald-500",
    descriptionKey: "mongodb",
    icon: MongodbIcon,
    level: 20,
  },
  {
    slug: "firebird",
    name: "Firebird",
    monogram: "FB",
    accent: "from-red-600 to-orange-500",
    descriptionKey: "firebird",
    logo: "/images/tech/firebird.svg",
    level: 50,
  },
  {
    slug: "git",
    name: "Git",
    monogram: "Git",
    accent: "from-orange-600 to-red-600",
    descriptionKey: "git",
    icon: GitIcon,
    level: 80,
  },
  {
    slug: "github",
    name: "GitHub",
    monogram: "",
    accent: "from-slate-700 to-slate-900",
    descriptionKey: "github",
    icon: GithubIcon,
    level: 85,
  },
];

export const environmentSkills: TechSkill[] = [
  {
    slug: "vscode",
    name: "Visual Studio Code",
    monogram: "VS",
    accent: "from-blue-600 to-sky-400",
    descriptionKey: "vscode",
    icon: VscodeIcon,
    level: 100,
  },
  {
    slug: "wordpress",
    name: "WordPress",
    monogram: "WP",
    accent: "from-slate-700 to-blue-700",
    descriptionKey: "wordpress",
    icon: WordpressIcon,
    level: 45,
  },
  {
    slug: "excel",
    name: "Excel",
    monogram: "XL",
    accent: "from-emerald-600 to-green-500",
    descriptionKey: "excel",
    icon: ExcelIcon,
    level: 60,
  },
  {
    slug: "tns",
    name: "TNS",
    monogram: "TNS",
    accent: "from-cyan-600 to-teal-600",
    descriptionKey: "tns",
    logo: "/images/tech/tns.png",
    level: 50,
  },
];

export type ApproachSkill = {
  slug: string;
  icon: LucideIcon;
};

export const approachSkills: ApproachSkill[] = [
  { slug: "mvp", icon: Rocket },
  { slug: "requirements", icon: Search },
  { slug: "databaseDesign", icon: Database },
  { slug: "automation", icon: Workflow },
  { slug: "problemSolving", icon: Puzzle },
  { slug: "architecture", icon: Layers },
  { slug: "documentation", icon: FileText },
];
