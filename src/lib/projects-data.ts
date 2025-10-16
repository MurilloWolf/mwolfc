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
    tags: ["IA", "GPT", "Prompt Engineering", "Education"],
    publishedAt: "2025-10-15",
    readingTime: "6 min",
    externalUrl:
      "https://chatgpt.com/g/g-68d6adedac3c8191a5d42b4dfd442f8c-parrot",
    bodyFile: "parrot-gpt.mdx",
  },
  {
    slug: "curriculum-gpt",
    category: "prompts",
    title: "Performance Curriculum",
    description:
      "A agent that personalizes my curriculum for job applications.",
    linkLabel: "View More",
    tags: ["IA", "GPT", "Prompt Engineering", "Curriculum"],
    publishedAt: "2025-10-10",
    readingTime: "4 min",
    bodyFile: "curriculum-gpt.mdx",
  },
  {
    slug: "chatbot-gpt",
    category: "prompts",
    title: "The better prompt for Chatbots",
    description:
      "A carefully engineered prompt architecture for a chatbot that provides accurate answers",
    linkLabel: "View More",
    tags: ["IA", "GPT", "Prompt Engineering", "Chatbot", "TypeScript", "API"],
    publishedAt: "2025-10-01",
    readingTime: "10 min",
    bodyFile: "chatbot-gpt.mdx",
  },
];

export function getProjectsByCategory(category: ProjectCategory) {
  return PROJECTS.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
