"use client";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Menu, Send } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import ContactForm from "./ContactForm";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Job Experience" },
];

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleNavClick = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      href: string,
      shouldCloseSheet = false
    ) => {
      if (typeof window === "undefined" || !href.startsWith("#")) {
        return;
      }

      event.preventDefault();

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

      const scrollToTarget = () => {
        const header = document.querySelector("header");
        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const offsetBuffer = 16;
        const targetTop =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetTop = Math.max(
          targetTop - (headerHeight + offsetBuffer),
          0
        );

        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        window.history.replaceState(null, "", href);
      };

      if (shouldCloseSheet) {
        setIsSheetOpen(false);
        setTimeout(() => {
          requestAnimationFrame(scrollToTarget);
        }, 340);
        return;
      }

      scrollToTarget();
    },
    [setIsSheetOpen]
  );
  return (
    <header className="font-mono sticky top-0 z-50 border-b border-white/20 bg-white/95 backdrop-blur-md transition-colors supports-[backdrop-filter]:bg-white/85 dark:border-white/10 dark:bg-zinc-900/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-12 p-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className=" text-lg font-semibold uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-100"
        >
          <span className="group inline-flex hover:tracking-normal transition-all duration-300 ease-in-out">
            m <span className="group-[&:hover]:hidden">.</span>
            <span className="hidden group-[&:hover]:block mr-2">urillo</span>
          </span>
          <span className="tracking-normal">wolf</span>
          <span className="group inline-flex hover:tracking-normal transition-all duration-300 ease-in-out">
            <span className="group-[&:hover]:hidden">.</span>
            <span className="group-[&:hover]:ml-2">C</span>
            <span className="hidden group-[&:hover]:block">avalheiro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <AlertDialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button size="sm" className="shadow-lg">
                Send Me a Message <Send className=" h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-medium font-sans bg-gray-100 rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">
                  Get in Touch
                </AlertDialogTitle>
                <ContactForm onClose={() => setIsDialogOpen(false)} />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={cn(
              "flex w-full max-w-xs flex-col gap-6 bg-white p-6",
              "backdrop-blur-md supports-[backdrop-filter]:bg-white/95",
              "border-l border-white/20 dark:border-white/10 dark:bg-zinc-900/85"
            )}
          >
            <SheetTitle className="font-mono text-lg font-semibold uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-100">
              mwolfc
            </SheetTitle>
            <nav className="font-sans flex flex-col gap-4 text-base font-medium text-neutral-600">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href, true)}
                  className="transition-colors hover:text-foreground/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <AlertDialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="shadow-lg font-sans">
                  Send Me a Message <Send className=" h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="font-medium font-sans bg-gray-100 rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    Get in Touch
                  </AlertDialogTitle>
                  <ContactForm onClose={() => setIsDialogOpen(false)} />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
