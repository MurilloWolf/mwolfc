"use client";

import { useState } from "react";

import { Button } from "@/components/ui";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="ghost"
      className="h-7 px-2 text-xs font-medium text-muted-foreground hover:bg-muted"
    >
      {copied ? <span>Copied!</span> : <Copy className="h-4 w-4" />}
    </Button>
  );
}
