"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import ChatPanel from "./ChatPanel";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  const isFaqPage = pathname?.startsWith("/faq");

  if (isFaqPage) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const MOBILE_BREAKPOINT = 768;
    const HIDE_THRESHOLD_PX = 120;

    const updateVisibility = () => {
      if (typeof window === "undefined") {
        return;
      }

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

      if (!isMobile) {
        setIsVisible(true);
        return;
      }

      const doc = document.documentElement;
      const distanceFromBottom =
        doc.scrollHeight - (window.scrollY + window.innerHeight);

      setIsVisible(distanceFromBottom > HIDE_THRESHOLD_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full sm:w-fit font-sans fixed bottom-4 right-2 z-50 flex max-w-full flex-col items-end gap-3 p-2 sm:p-0 transition-opacity duration-200",
        !isVisible && "pointer-events-none opacity-0"
      )}
      aria-hidden={!isVisible}
    >
      {isOpen ? (
        <div
          id="chat-widget"
          className={cn("w-[min(92vw,480px)]", "sm:w-[420px]", "lg:w-[440px]")}
        >
          <ChatPanel
            variant="widget"
            onClose={() => setIsOpen(false)}
            className="h-[calc(100vh-2rem)] rounded-3xl "
            contentClassName="px-3 py-3 sm:px-4 sm:py-4"
          />
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-[#212121] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black-500/20 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0f13] active:scale-95"
        aria-expanded={isOpen}
        aria-controls="chat-widget"
      >
        <MessageCircle className="h-5 w-5" />
        {isOpen ? "Close chat" : "Need help?"}
      </button>
    </div>
  );
}
