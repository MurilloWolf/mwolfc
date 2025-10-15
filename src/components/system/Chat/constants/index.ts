import { Message } from "../types";
import { RateLimitViolation } from "../utils/rate-limit";

export const ASSISTANT_FALLBACK_MESSAGE =
  "Desculpe, não consegui gerar uma resposta agora. Tente novamente em instantes.";

export const DEFAULT_USER_NAME = "Visitante";

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
