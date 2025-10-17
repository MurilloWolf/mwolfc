import React from "react";
import { Send } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

interface IChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  variant?: "full" | "widget";
}

export default function ChatInput(props: IChatInputProps) {
  const {
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    disabled,
    inputRef,
    variant = "full",
  } = props;
  const isWidget = variant === "widget";

  return (
    <div
      className={cn(
        "rounded-b-2xl border-t border-white/10 bg-black p-2 backdrop-blur-xl",
        isWidget ? "sm:px-3 sm:py-3" : "md:px-4 md:py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-4xl items-center gap-3",
          isWidget && "gap-2"
        )}
      >
        <Input
          ref={inputRef}
          value={props.inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={120}
          autoFocus
          placeholder="Ask me anything..."
          className={cn(
            "flex-1 border border-transparent bg-transparent text-base text-white placeholder:text-white/60 shadow-none focus:border-transparent focus:outline-none focus:shadow-none focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none",
            isWidget ? undefined : "lg:text-lg"
          )}
          disabled={disabled}
        />
        <Button
          onClick={handleSendMessage}
          size="icon"
          className={cn(
            "shrink-0 bg-primary text-primary-foreground hover:bg-primary/90",
            !isWidget && "md:size-10"
          )}
          disabled={disabled}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
