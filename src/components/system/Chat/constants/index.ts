import { Message } from "../types";
import { RateLimitViolation } from "../utils/rate-limit";

export const ASSISTANT_FALLBACK_MESSAGE =
  "Sorry, I couldn't generate a response right now. Please try again in a moment.";

export const DEFAULT_USER_NAME = "Visitor";

export const INITIAL_MESSAGE: Message = {
  id: "welcome",
  text: "Hi! 👋 How can I help you today?",
  sender: "bot",
  timestamp: new Date(),
  format: "text",
};

export const RATE_LIMIT_MESSAGES: Record<RateLimitViolation, string> = {
  min_length:
    "I need a little more context to help. Please write a more complete message.",
  duplicate:
    "I received this message a little while ago. Please try rephrasing your question instead of repeating it.",
  frequency:
    "You sent too many messages in a row. Please wait a few seconds before continuing.",
};
