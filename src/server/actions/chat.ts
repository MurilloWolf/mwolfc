"use server";

import promptTemplate from "@/components/system/Chat/prompts/prompt.json";
import { ASSISTANT_FALLBACK_MESSAGE } from "@/components/system/Chat/constants";
export type HistoryItem = {
  role: "user" | "assistant";
  message: string;
};

type PromptTemplate = {
  model: string;
  temperature?: number;
  max_completion_tokens?: number;
  role: string;
  language?: string;
  conversation_context?: {
    user_name?: string;
    time_of_day?: string;
    history?: string;
    current_question?: string;
  };
  do_not_answer?: string[];
  response_instructions?: string[];
  missing_response?: string[];
  info_to_provide?: string[];
  bot_personality?: {
    name?: string;
    tone?: string;
    style?: string;
    greeting?: string;
    farewell?: string;
  };
  bot_knowledge?: {
    base?: string[];
    velox_site?: Record<string, unknown>;
    telegram_bot_commands?: string[];
    response_format?: Record<string, unknown>;
  };
};

type SendChatPayload = {
  userName: string;
  timeOfDay: string;
  currentQuestion: string;
  history: HistoryItem[];
};

export type SendChatResult = {
  message: string;
  messages: string[];
  tokensUsed: number;
  confidence: number | null;
  raw: Record<string, unknown>;
};

const formatList = (label: string, items?: string[]) => {
  if (!items || items.length === 0) {
    return null;
  }
  return `${label}:\n- ${items.join("\n- ")}`;
};

const buildSystemPrompt = (template: PromptTemplate) => {
  const sections: string[] = [];

  if (template.role) {
    sections.push(template.role);
  }

  if (template.language) {
    sections.push(`Responda sempre em ${template.language}.`);
  }

  const responseInstructions = formatList(
    "Instruções de resposta",
    template.response_instructions
  );
  if (responseInstructions) {
    sections.push(responseInstructions);
  }

  const scopeInfo = formatList(
    "Priorize fornecer informações sobre",
    template.info_to_provide
  );
  if (scopeInfo) {
    sections.push(scopeInfo);
  }

  const doNotAnswer = formatList(
    "Não responda quando as perguntas envolverem",
    template.do_not_answer
  );
  if (doNotAnswer) {
    sections.push(
      `${doNotAnswer}\nSe algo estiver fora do escopo, utilize uma das mensagens de fallback disponíveis em "missing_response".`
    );
  }

  if (template.missing_response && template.missing_response.length > 0) {
    sections.push(
      `Mensagens de fallback sugeridas:\n- ${template.missing_response.join(
        "\n- "
      )}`
    );
  }

  if (template.bot_personality) {
    const { name, tone, style, greeting, farewell } = template.bot_personality;
    const personalityLines = [
      name ? `Nome do assistente: ${name}` : null,
      tone ? `Tom desejado: ${tone}` : null,
      style ? `Estilo de escrita: ${style}` : null,
      greeting ? `Saudação padrão: ${greeting}` : null,
      farewell ? `Despedida padrão: ${farewell}` : null,
    ].filter(Boolean);

    if (personalityLines.length > 0) {
      sections.push(
        `Diretrizes de personalidade:\n- ${personalityLines.join("\n- ")}`
      );
    }
  }

  if (template.bot_knowledge?.base && template.bot_knowledge.base.length > 0) {
    sections.push(
      `Base de conhecimento principal:\n- ${template.bot_knowledge.base.join(
        "\n- "
      )}`
    );
  }

  if (template.bot_knowledge?.velox_site) {
    sections.push(
      `Mapa do site VELOX (JSON):\n${JSON.stringify(
        template.bot_knowledge.velox_site,
        null,
        2
      )}`
    );
  }

  if (template.bot_knowledge?.telegram_bot_commands) {
    const commands = formatList(
      "Comandos do bot no Telegram",
      template.bot_knowledge.telegram_bot_commands
    );
    if (commands) {
      sections.push(commands);
    }
  }

  if (template.bot_knowledge?.response_format) {
    sections.push(
      `Esquema de resposta recomendado:\n${JSON.stringify(
        template.bot_knowledge.response_format,
        null,
        2
      )}`
    );
  }

  sections.push(
    "Formato de resposta obrigatório: JSON contendo os campos message_to_send (string), tokens_used (integer) e confidence (number entre 0 e 1)."
  );

  return sections.join("\n\n");
};

const buildHistorySection = (history: HistoryItem[]) => {
  if (!history.length) {
    return "- (sem histórico prévio)";
  }

  return history.map((entry) => `- ${entry.role}: ${entry.message}`).join("\n");
};

const buildUserPrompt = (
  template: PromptTemplate,
  payload: SendChatPayload
) => {
  const labels = template.conversation_context ?? {};
  const historyBlock = buildHistorySection(payload.history);

  return [
    "Contexto do usuário:",
    `- Nome (${labels.user_name ?? "Nome do usuário"}): ${
      payload.userName || "Visitante"
    }`,
    `- Momento do dia (${labels.time_of_day ?? "momento do dia"}): ${
      payload.timeOfDay
    }`,
    `- Histórico (${labels.history ?? "histórico recente"}):`,
    historyBlock,
    `- Pergunta atual (${labels.current_question ?? "pergunta atual"}):`,
    payload.currentQuestion,
  ].join("\n");
};

const normaliseAssistantContent = (content: unknown): string => {
  if (!content) return "";

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part) {
          return String((part as { text?: unknown }).text ?? "");
        }
        return "";
      })
      .join("");
  }

  if (
    typeof content === "object" &&
    content !== null &&
    "text" in (content as Record<string, unknown>)
  ) {
    return String((content as Record<string, unknown>).text ?? "");
  }

  return "";
};

const collectMessages = (parsed: Record<string, unknown>, fallback: string) => {
  const candidates = [
    parsed?.message_to_send,
    parsed?.messages,
    parsed?.message,
    parsed?.reply,
  ];

  const messages: string[] = [];

  const pushValue = (value: unknown) => {
    if (value == null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(pushValue);
      return;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) {
        messages.push(trimmed);
      }
      return;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      messages.push(String(value));
      return;
    }

    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if ("message" in obj) {
        pushValue(obj.message);
        return;
      }
      if ("text" in obj) {
        pushValue(obj.text);
        return;
      }
      if ("content" in obj) {
        pushValue(obj.content);
        return;
      }

      try {
        messages.push(JSON.stringify(obj));
      } catch (error) {
        console.error("Falha ao serializar mensagem do assistente:", error);
      }
      return;
    }
  };

  candidates.forEach(pushValue);

  if (!messages.length && fallback.trim()) {
    messages.push(fallback.trim());
  }

  if (!messages.length) {
    messages.push(ASSISTANT_FALLBACK_MESSAGE);
  }

  return messages;
};

const buildOpenAiPayload = (
  template: PromptTemplate,
  systemPrompt: string,
  userPrompt: string
) => ({
  model: template.model,
  temperature: template.temperature ?? 0.4,
  max_tokens: template.max_completion_tokens ?? 400,
  response_format: { type: "json_object" as const },
  messages: [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    {
      role: "user" as const,
      content: userPrompt,
    },
  ],
});

export async function sendChatCompletion(
  payload: SendChatPayload
): Promise<SendChatResult> {
  const { userName, timeOfDay, currentQuestion, history } = payload;

  if (!currentQuestion) {
    throw new Error("Pergunta atual não informada.");
  }

  const apiKey = process.env.OPENAI_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Variável OPENAI_API_KEY ou OPENAI_API_KEY não configurada."
    );
  }

  const template: PromptTemplate = JSON.parse(JSON.stringify(promptTemplate));
  const systemPrompt = buildSystemPrompt(template);
  const userPrompt = buildUserPrompt(template, {
    userName,
    timeOfDay: timeOfDay || "dia",
    currentQuestion,
    history: Array.isArray(history) ? history : [],
  });

  const openAiPayload = buildOpenAiPayload(template, systemPrompt, userPrompt);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(openAiPayload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message ?? "Falha ao consultar a OpenAI.";
    throw new Error(message);
  }

  const choice = data?.choices?.[0];
  const assistantRaw = normaliseAssistantContent(choice?.message?.content);

  let parsed: Record<string, unknown> = {};

  if (assistantRaw) {
    try {
      parsed = JSON.parse(assistantRaw);
    } catch (error) {
      console.error(
        "Falha ao interpretar a resposta do assistente como JSON:",
        error
      );
      const match = assistantRaw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (innerError) {
          console.error(
            "Falha ao converter conteúdo do assistente em JSON:",
            innerError
          );
        }
      } else {
        console.error("Resposta do assistente não está em JSON.");
      }
    }
  }

  const assistantMessages = collectMessages(
    parsed,
    assistantRaw || ASSISTANT_FALLBACK_MESSAGE
  );
  const [messageToSend = ASSISTANT_FALLBACK_MESSAGE] = assistantMessages;

  const tokensUsed = Number(
    parsed?.tokens_used ??
      data?.usage?.total_tokens ??
      data?.usage?.completion_tokens ??
      0
  );

  const rawConfidence = (parsed?.confidence ?? null) as unknown;
  let confidence: number | null = null;
  if (typeof rawConfidence === "number") {
    confidence = rawConfidence;
  } else if (typeof rawConfidence === "string") {
    const parsedConfidence = Number.parseFloat(rawConfidence);
    confidence = Number.isNaN(parsedConfidence) ? null : parsedConfidence;
  }

  return {
    message: messageToSend,
    messages: assistantMessages,
    tokensUsed,
    confidence,
    raw: parsed,
  };
}
