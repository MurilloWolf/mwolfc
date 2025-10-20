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
    slug: "velox-project",
    category: "projects",
    title: "VELOX",
    description: "A easy way to find street racing events happening near you.",
    linkLabel: "View Project",
    tags: ["Express", "TypeScript", "Node.js", "React", "Full Stack"],
    publishedAt: "2025-10-20",
    readingTime: "12 min",
    bodyFile: "velox-project.mdx",
    externalUrl: "http://www.veloxrunning.com",
  },
  {
    slug: "there-is-no-good-software",
    category: "articles",
    title: "There Is No Good Software",
    description:
      "A reflection on perfectionism in software development and why the pursuit of perfect code prevents us from building functional solutions that can change our lives.",
    linkLabel: "Read Article",
    tags: [
      "Software Development",
      "Career",
      "Personal Growth",
      "Entrepreneurship",
    ],
    publishedAt: "2025-10-16",
    readingTime: "7 min",
    bodyFile: "there-is-no-good-software.mdx",
  },
  {
    slug: "the-art-of-talking-to-machines",
    category: "articles",
    title: "The Art of Talking to Machines",
    description:
      "A beginner-friendly guide to understanding AI and prompt engineering, with practical tips and a real-world resume optimization prompt.",
    linkLabel: "Read Article",
    tags: ["AI", "Prompt Engineering", "Education", "Tutorial"],
    publishedAt: "2025-10-05",
    readingTime: "8 min",
    bodyFile: "the-art-of-talking-to-machines.mdx",
  },
  {
    slug: "parrot-gpt",
    category: "prompts",
    title: "Parrot GPT",
    description:
      "A model that explains complex topics in a simple, structured way so stakeholders without technical backgrounds can follow along.",
    linkLabel: "View More",
    tags: ["AI", "GPT", "Prompt Engineering", "Education"],
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
      "An agent that personalizes my resume for product and engineering job applications.",
    linkLabel: "View More",
    tags: ["AI", "GPT", "Prompt Engineering", "Curriculum"],
    publishedAt: "2025-10-10",
    readingTime: "4 min",
    bodyFile: "curriculum-gpt.mdx",
  },
  {
    slug: "chatbot-gpt",
    category: "prompts",
    title: "The better prompt for Chatbots",
    description:
      "A carefully engineered prompt architecture for a chatbot that provides accurate, on-brand answers at scale.",
    linkLabel: "View More",
    tags: ["AI", "GPT", "Prompt Engineering", "Chatbot", "TypeScript", "API"],
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
