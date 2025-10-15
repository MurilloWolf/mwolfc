export type RateLimitViolation = "min_length" | "duplicate" | "frequency";

export interface RateLimitState {
  timestamps: number[];
  lastMessageText: string;
  lastMessageAt: number;
}

export interface RateLimitOptions {
  windowMs: number;
  maxMessages: number;
  duplicateCooldownMs: number;
  minLength: number;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: RateLimitViolation;
  state: RateLimitState;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  windowMs: 60_000,
  maxMessages: 6,
  duplicateCooldownMs: 15_000,
  minLength: 4,
};

const normalize = (value: string) => value.trim().toLowerCase();

export const createRateLimitState = (): RateLimitState => ({
  timestamps: [],
  lastMessageText: "",
  lastMessageAt: 0,
});

export const evaluateRateLimit = (
  message: string,
  state: RateLimitState,
  options: RateLimitOptions = DEFAULT_OPTIONS,
  now = Date.now()
): RateLimitResult => {
  const trimmed = message.trim();
  const normalized = normalize(trimmed);

  const timestamps = state.timestamps.filter(
    (timestamp) => now - timestamp < options.windowMs
  );

  const nextState: RateLimitState = {
    timestamps,
    lastMessageText: state.lastMessageText,
    lastMessageAt: state.lastMessageAt,
  };

  if (trimmed.length < options.minLength) {
    return {
      allowed: false,
      reason: "min_length",
      state: nextState,
    };
  }

  if (
    normalized === state.lastMessageText &&
    now - state.lastMessageAt < options.duplicateCooldownMs
  ) {
    return {
      allowed: false,
      reason: "duplicate",
      state: nextState,
    };
  }

  if (timestamps.length >= options.maxMessages) {
    return {
      allowed: false,
      reason: "frequency",
      state: nextState,
    };
  }

  nextState.timestamps = [...timestamps, now];
  nextState.lastMessageText = normalized;
  nextState.lastMessageAt = now;

  return {
    allowed: true,
    state: nextState,
  };
};

export const RATE_LIMIT_DEFAULTS = DEFAULT_OPTIONS;
