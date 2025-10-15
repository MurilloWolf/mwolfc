"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui";

type ProjectCategory = "projects" | "prompts" | "articles" | "code-examples";

interface Project {
  category: ProjectCategory;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  tags: string[];
}

const PROJECT_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  projects: "Projetos",
  prompts: "Prompts",
  articles: "Artigos",
  "code-examples": "Exemplos de codigo",
};

const CATEGORY_ORDER: ProjectCategory[] = [
  "projects",
  "prompts",
  "articles",
  "code-examples",
];

const PROJECTS: Project[] = [
  {
    category: "projects",
    title: "MWolf Portfolio",
    description:
      "Uma vitrine pessoal com foco em acessibilidade, microinteracoes e performance avancada.",
    href: "https://mwolf.dev",
    linkLabel: "Ver projeto",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    category: "projects",
    title: "Plataforma de Mentoria",
    description:
      "Aplicacao white-label para conectar mentores e mentorados, com fluxos automatizados e analytics.",
    href: "https://github.com/murillowolf/mentorship-platform",
    linkLabel: "Acessar repositorio",
    tags: ["TypeScript", "Design System", "DX"],
  },
  {
    category: "prompts",
    title: "Prompt Library",
    description:
      "Colecao curada de prompts para IA focados em discovery de produto e brainstorming tecnico.",
    href: "https://github.com/murillowolf/prompt-library",
    linkLabel: "Abrir colecao",
    tags: ["IA", "Product", "Pesquisa"],
  },
  {
    category: "articles",
    title: "Por tras de um Design System flexivel",
    description:
      "Artigo sobre estrategias para componentizar experimentos e manter consistencia em escala.",
    href: "https://murillowolf.medium.com/design-system-flexivel",
    linkLabel: "Ler artigo",
    tags: ["Design System", "Leadership", "Processos"],
  },
  {
    category: "code-examples",
    title: "Streaming de logs em tempo real",
    description:
      "Exemplo de implementacao de Server-Sent Events com React Server Components e Node.",
    href: "https://github.com/murillowolf/realtime-logs",
    linkLabel: "Ver codigo",
    tags: ["Node.js", "RSC", "Observability"],
  },
];

export default function ProjectList() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("projects");

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {CATEGORY_ORDER.map((category) => {
          const isActive = activeFilter === category;

          return (
            <Badge
              key={category}
              role="button"
              tabIndex={0}
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveFilter(category);
                }
              }}
              className={`ring-0 focus:ring-0 focus:ring-offset-0 ring-offset-0 cursor-pointer rounded-full border transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              {PROJECT_CATEGORY_LABEL[category]}
            </Badge>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <article
            key={project.title}
            className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-secondary/80"
                >
                  {PROJECT_CATEGORY_LABEL[project.category]}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={`${project.title}-${tag}`}
                    variant="outline"
                    className="rounded-full border-dashed text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Link
              href={project.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
