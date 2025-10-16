"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui";
import {
  CATEGORY_ORDER,
  PROJECTS,
  PROJECT_CATEGORY_LABEL,
  type ProjectCategory,
} from "@/lib/projects-data";

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
                      href={`/projects/${project.slug}`}
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
                    href={`/projects/${project.slug}`}
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
