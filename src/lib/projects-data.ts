export type ProjectCategory =
  | "projects"
  | "prompts"
  | "articles"
  | "code-examples";

export interface ProjectEntry {
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string;
  linkLabel: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  externalUrl?: string;
  bodyFile: string;
}

export const PROJECT_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  projects: "Projects",
  prompts: "Prompts",
  articles: "Articles",
  "code-examples": "Code Examples",
};

export const CATEGORY_ORDER: ProjectCategory[] = [
  "projects",
  "prompts",
  "articles",
  "code-examples",
];

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "parrot-gpt",
    category: "prompts",
    title: "Parrot GPT",
    description:
      "A model that explains complex topics in a way that is simple, structured, and easy to understand for people without prior knowledge of the subject.",
    linkLabel: "View More",
    tags: ["IA", "GPT", "Prompt Engineering"],
    publishedAt: "2025-10-15",
    readingTime: "6 min",
    externalUrl:
      "https://chatgpt.com/g/g-68d6adedac3c8191a5d42b4dfd442f8c-parrot",
    bodyFile: "parrot-gpt.mdx",
  },
];

export function getProjectsByCategory(category: ProjectCategory) {
  return PROJECTS.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
