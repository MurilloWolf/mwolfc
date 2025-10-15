"use client";

import type React from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../types";
import {
  buildHistoryPayload,
  createMessageId,
  isHtmlContent,
} from "../utils/message";
import { getTimeOfDay } from "../utils/time";
import { createRateLimitState, evaluateRateLimit } from "../utils/rate-limit";
import { sendChatCompletion } from "@/server/actions/chat";
import {
  ASSISTANT_FALLBACK_MESSAGE,
  DEFAULT_USER_NAME,
  RATE_LIMIT_MESSAGES,
  INITIAL_MESSAGE,
} from "@/components/system/Chat/constants";
import botImage from "../assets/bot.png";

type ChatPanelVariant = "full" | "widget";

type ChatPanelProps = {
  variant?: ChatPanelVariant;
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
};

export default function ChatPanel({
  variant = "full",
  onClose,
  className,
  contentClassName,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [, startTransition] = useTransition();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const rateLimitStateRef = useRef(createRateLimitState());
  const inputRef = useRef<HTMLInputElement>(null);
  const isWidget = variant === "widget";

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const node = chatContainerRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({
      top: node.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    const node = chatContainerRef.current;
    if (!node) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = node;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      shouldAutoScrollRef.current = distanceFromBottom < 120;
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isSending) {
      inputRef.current?.focus();
    }
  }, [isSending]);

  const pushWarning = (warning: string) => {
    const fallback: Message = {
      id: createMessageId(),
      text: warning,
      sender: "bot",
      timestamp: new Date(),
      format: "text",
    };

    shouldAutoScrollRef.current = true;
    setMessages((prev) => [...prev, fallback]);
  };

  const passesRateLimitGuards = (message: string) => {
    const result = evaluateRateLimit(message, rateLimitStateRef.current);
    rateLimitStateRef.current = result.state;

    if (!result.allowed && result.reason) {
      pushWarning(RATE_LIMIT_MESSAGES[result.reason]);
      return false;
    }

    return result.allowed;
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isSending) {
      return;
    }

    if (!passesRateLimitGuards(trimmedInput)) {
      setInputValue("");
      return;
    }

    const userMessage: Message = {
      id: createMessageId(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
      format: "text",
    };

    const previousMessages = [...messages];
    shouldAutoScrollRef.current = true;

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const data = await sendChatCompletion({
        userName: DEFAULT_USER_NAME,
        timeOfDay: getTimeOfDay(),
        currentQuestion: trimmedInput,
        history: buildHistoryPayload(previousMessages),
      });

      const assistantMessages = Array.isArray(data?.messages)
        ? data.messages
        : [data?.message ?? ASSISTANT_FALLBACK_MESSAGE];

      const formattedMessages = assistantMessages
        .map((raw) => {
          if (raw == null) {
            return null;
          }

          const text = String(raw);
          return {
            id: createMessageId(),
            text,
            sender: "bot" as const,
            timestamp: new Date(),
            format: isHtmlContent(text) ? "html" : "text",
          } satisfies Message;
        })
        .filter(Boolean) as Message[];

      startTransition(() => {
        setMessages((prev) => [...prev, ...formattedMessages]);
      });
    } catch (error) {
      console.error("Erro ao conversar com o assistente:", error);

      const fallbackMessage: Message = {
        id: createMessageId(),
        text:
          error instanceof Error
            ? `Desculpe, ocorreu um erro: ${error.message}`
            : ASSISTANT_FALLBACK_MESSAGE,
        sender: "bot",
        timestamp: new Date(),
        format: "text",
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerClasses = cn(
    "flex flex-col overflow-hidden rounded-2xl  shadow-2xl backdrop-blur-xl",
    variant === "full" && "h-full md:rounded-2xl",
    variant === "widget" &&
      "rounded-2xl h-[70vh] min-h-[360px] max-h-[calc(100vh-100px)] sm:h-[540px]",
    className
  );

  const contentClasses = cn(
    "glass-scrollbar flex-1 overflow-y-auto overflow-x-hidden touch-pan-y  backdrop-blur-lg",
    isWidget ? "px-3 py-3 sm:px-3.5" : "px-4 py-4",
    contentClassName
  );

  const wrapperClasses =
    variant === "full"
      ? "w-full h-full min-h-[400px] md:min-h-[700px] mx-auto my-2 md:my-10 max-w-3xl"
      : "w-full";

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        <header
          className={cn(
            "flex items-center bg-black backdrop-blur-xl",
            isWidget ? "gap-3 px-3 py-2" : "gap-4 px-4 py-3 md:px-6 md:py-4"
          )}
        >
          <div
            className={cn("flex items-center", isWidget ? "gap-3" : "gap-4")}
          >
            <Image
              src={botImage}
              alt="Evee, Custom GPT Assistant"
              className={cn(
                "rounded-full object-contain",
                isWidget ? "h-8 w-8" : "h-9 w-9 md:h-12 md:w-12"
              )}
              width={60}
              height={60}
            />
            <div className="flex flex-col text-left">
              <h1
                className={cn(
                  "font-semibold text-white",
                  isWidget
                    ? "text-base sm:text-lg"
                    : "text-lg sm:text-xl md:text-2xl"
                )}
              >
                Evee
              </h1>
              <p
                className={cn(
                  "text-white/80 font-mono",
                  isWidget ? "text-[11px] sm:text-xs" : "text-xs md:text-sm"
                )}
              >
                Virtual Assistant
              </p>
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Fechar chat"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </header>
        <div ref={chatContainerRef} className={contentClasses}>
          <div
            className={cn(
              "mx-auto max-w-4xl",
              isWidget ? "space-y-4" : "space-y-6"
            )}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar message={message} />
                <MessageBubble message={message} />
              </div>
            ))}
            {isSending ? <TypingIndicator /> : null}
          </div>
        </div>
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          disabled={isSending}
          inputRef={inputRef}
          variant={variant}
        />
      </div>
    </div>
  );
}
