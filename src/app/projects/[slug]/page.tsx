import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui";
import { PROJECTS, getProjectBySlug } from "@/lib/projects-data";
import CodeBlock from "@/components/mdx/CodeBlock";

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fallbackSiteUrl = "https://www.murillowolf.com";
  const normalizedSiteUrl = configuredSiteUrl
    ? configuredSiteUrl.startsWith("http")
      ? configuredSiteUrl
      : `https://${configuredSiteUrl}`
    : fallbackSiteUrl;
  const canonical = `/projects/${project.slug}`;
  const absoluteUrl = `${normalizedSiteUrl.replace(/\/$/, "")}${canonical}`;
  const title = `${project.title} | Murillo Wolf`;

  return {
    title,
    description: project.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: absoluteUrl,
      title,
      description: project.description,
      siteName: "Murillo Wolf Portfolio",
      locale: "en_US",
      images: [
        {
          url: `${normalizedSiteUrl}/me.png`,
          width: 1200,
          height: 1200,
          alt: `${project.title} case study by Murillo Wolf`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [`${normalizedSiteUrl}/me.png`],
    },
  };
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mdxPath = path.join(
    process.cwd(),
    "content",
    "projects",
    project.bodyFile
  );

  let mdxContent: ReactNode | null = null;

  try {
    const source = await fs.readFile(mdxPath, "utf-8");
    const { content } = await compileMDX({
      source,
      components: {
        pre: (props) => <CodeBlock {...props} />,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    mdxContent = content;
  } catch (error) {
    console.error(`Failed to load MDX for project slug ${slug}:`, error);
    notFound();
  }

  return (
    <main className="font-sans mx-auto w-full max-w-4xl px-0 py-16 sm:px-6 lg:px-0">
      <Link
        href="/#projects"
        className="px-4 md:px-0 mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <article className="rounded-lg bg-white/70 p-8  sm:p-12">
        <header className="flex flex-col gap-6  border-b-2 border-muted/80 pb-4">
          <div className="space-y-3">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </h1>
              {project.externalUrl ? (
                <Button variant="ghost" asChild className="w-fit gap-2">
                  <Link
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See it live
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
            </div>
            <p className="lg:w-5/6 text-base text-muted-foreground sm:text-md">
              {project.description}
            </p>
          </div>
        </header>
        <div className="mt-12">
          <div className="space-y-6 text-base leading-7 text-muted-foreground sm:text-md sm:leading-8 [&_h2]:mt-16 [&_h2]:text-xl [&_h3]:font-semibold [&_h2]:font-semibold [&_h3]:-mb-4 [&_h3]:mt-8 [&_h3]:text-lg [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5">
            {mdxContent}
          </div>
        </div>
      </article>
    </main>
  );
}
