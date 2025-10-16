import Link from "next/link";
import { Compass, Home } from "lucide-react";

import { Badge, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="font-sans mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-4 py-24 sm:px-6">
      <section className="relative w-full overflow-hidden rounded-3xl border border-muted bg-white/80 p-10 shadow-xl backdrop-blur-md sm:p-14">
        <div
          className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-emerald-200/60 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-4 h-56 w-56 rounded-full bg-[#dff2e1] blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col gap-8">
          <Badge
            variant="outline"
            className="w-fit rounded-full border-emerald-200 bg-emerald-50/70 px-4 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-emerald-800"
          >
            404 · Page not found
          </Badge>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Sorry, we couldn&apos;t find that page.
            </h2>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              The page you are looking for might have been moved or never
              existed.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 border-muted-foreground/40 bg-white/80 hover:bg-white"
            >
              <Link href="/#projects">
                <Compass className="h-4 w-4" />
                View projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
