"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { Textarea, Input, Button } from "@/components/ui";
import { Loader2, MessageCircle } from "lucide-react";

export default function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (status === "success") {
      const timeout = setTimeout(() => {
        setStatus("idle");
      }, 2400);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [status]);

  const handleChange = (
    field: "name" | "email" | "message"
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (event) => {
      const value = event.target.value;
      if (status === "error") {
        setStatus("idle");
        setErrorMessage("");
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") {
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await new Promise((resolve, reject) => setTimeout(resolve, 900));

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 4000);
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("error");
      setErrorMessage("Sorry, something went wrong. Please try again.");
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "5518997708504";
    const message = encodeURIComponent("Hello, I would like to get in touch!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const isSubmitting = status === "loading";

  return (
    <div className="space-y-4 py-4">
      <div className="relative overflow-hidden rounded-lg bg-transparent py-4 px-0 sm:p-6 sm:px-0">
        {status === "error" && errorMessage ? (
          <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive animate-error-shake">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Message"
              value={formData.message}
              onChange={handleChange("message")}
              className="resize-none"
              required
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        {status === "success" ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-400/95 via-emerald-500 to-teal-500 text-white">
            <div className="relative flex max-w-xs flex-col items-center gap-3 text-center animate-success-pop">
              <span className="text-5xl">✨</span>
              <p className="text-lg font-semibold uppercase tracking-[0.2em]">
                Success!
              </p>
              <p className="text-sm text-white/80">
                I received your message. I will get back to you very soon.
              </p>
              <span className="absolute -top-6 -left-4 h-2 w-14 rounded-full bg-white/80 blur-[1px] animate-confetti-left" />
              <span className="absolute -bottom-6 -right-6 h-2 w-14 rounded-full bg-white/70 blur-[1px] animate-confetti-right" />
              <span className="absolute -top-2 right-12 h-5 w-5 rounded-full border border-white/80 animate-sparkle" />
              <span className="absolute bottom-10 -left-8 h-4 w-4 rounded-full border border-white/70 animate-sparkle-delayed" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-100 px-2 text-muted-foreground">or</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 bg-transparent"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="h-4 w-4" />
        Talk on WhatsApp
      </Button>
    </div>
  );
}
