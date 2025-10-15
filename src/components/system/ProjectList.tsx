"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import Image from "next/image";
import meImage from "../../../public/me.png";

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
    linkLabel: "View more",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    category: "projects",
    title: "Plataforma de Mentoria",
    description:
      "Aplicacao white-label para conectar mentores e mentorados, com fluxos automatizados e analytics.",
    href: "https://github.com/murillowolf/mentorship-platform",
    linkLabel: "View more",
    tags: ["TypeScript", "Design System", "DX"],
  },
  {
    category: "prompts",
    title: "Prompt Library",
    description:
      "Colecao curada de prompts para IA focados em discovery de produto e brainstorming tecnico.",
    href: "https://github.com/murillowolf/prompt-library",
    linkLabel: "View collection",
    tags: ["IA", "Product", "Pesquisa"],
  },
  {
    category: "articles",
    title: "Por tras de um Design System flexivel",
    description:
      "Artigo sobre estrategias para componentizar experimentos e manter consistencia em escala.",
    href: "https://murillowolf.medium.com/design-system-flexivel",
    linkLabel: "Read article",
    tags: ["Design System", "Leadership", "Processos"],
  },
  {
    category: "code-examples",
    title: "Streaming de logs em tempo real",
    description:
      "Exemplo de implementacao de Server-Sent Events com React Server Components e Node.",
    href: "https://github.com/murillowolf/realtime-logs",
    linkLabel: "View code",
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

      <div className="flex flex-col gap-6 bg-white/60 rounded-lg p-2">
        <Table>
          <TableBody className="w-full">
            {filteredProjects.map((project, index) => (
              <TableRow key={index} className="hover:bg-accent">
                <TableCell className="min-w-xl max-w-2xl">
                  <div className="flex flex-col">
                    <span className="font-semibold text-md">
                      {project.title}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs w-full py-4 md:hidden inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      {project.linkLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <div className="hidden md:flex mt-2  flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="rounded-full border-muted-foreground/50 bg-transparent text-xs text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-right md:w-28 lg:w-32">
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {project.linkLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
