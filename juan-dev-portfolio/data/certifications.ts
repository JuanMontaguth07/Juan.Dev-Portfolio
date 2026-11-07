import {
  AppWindow,
  Cog,
  Hand,
  MessagesSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type Certification = {
  slug: string;
  /** Official course name, kept in English in every locale. */
  name: string;
  issuer: string;
  /** ISO date (YYYY-MM-DD), formatted per locale at render time. */
  issued: string;
  icon: LucideIcon;
  tone: "sage" | "peach";
};

/** Anthropic Academy certificates, all issued 2026-09-23 (from the user's account). */
export const certifications: Certification[] = [
  {
    slug: "claude-code-in-action",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    issued: "2026-09-23",
    icon: Cog,
    tone: "sage",
  },
  {
    slug: "claude-platform-101",
    name: "Claude Platform 101",
    issuer: "Anthropic",
    issued: "2026-09-23",
    icon: Settings,
    tone: "peach",
  },
  {
    slug: "claude-code-101",
    name: "Claude Code 101",
    issuer: "Anthropic",
    issued: "2026-09-23",
    icon: AppWindow,
    tone: "peach",
  },
  {
    slug: "claude-cowork",
    name: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    issued: "2026-09-23",
    icon: Hand,
    tone: "sage",
  },
  {
    slug: "claude-101",
    name: "Claude 101",
    issuer: "Anthropic",
    issued: "2026-09-23",
    icon: MessagesSquare,
    tone: "peach",
  },
];
