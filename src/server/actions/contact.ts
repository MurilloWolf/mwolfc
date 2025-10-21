"use server";

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

type SendContactResult = { success: true } | { success: false; error: string };

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const GENERIC_ERROR_MESSAGE =
  "Sorry, we can't deliver your message. Try another way.";

const serviceId = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;

export async function sendContactEmail(
  data: ContactFormInput
): Promise<SendContactResult> {
  const missingEnv = [
    !serviceId && "EMAILJS_SERVICE_ID",
    !templateId && "EMAILJS_TEMPLATE_ID",
    !publicKey && "EMAILJS_PUBLIC_KEY",
  ].filter(Boolean);

  if (missingEnv.length > 0) {
    console.error(
      "EmailJS configuration error. Missing variables:",
      missingEnv
    );
    return {
      success: false,
      error: GENERIC_ERROR_MESSAGE,
    };
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message) {
    console.warn("Contact form submission missing required fields.");
    return { success: false, error: GENERIC_ERROR_MESSAGE };
  }

  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      name,
      email,
      message,
    },
  };

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("EmailJS request failed", response.status, body);
    return {
      success: false,
      error: GENERIC_ERROR_MESSAGE,
    };
  }

  return { success: true };
}
