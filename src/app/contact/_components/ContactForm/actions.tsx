"use server";

import { ok } from "assert";
import { ContactFormData } from "./types";
import { json } from "stream/consumers";
import { headers } from "next/headers";

interface SendEmailProps {
  formData: ContactFormData & { "cf-turnstile-response": string };
  captchaToken: string;
}

export const sendEmail = async ({ formData, captchaToken }: SendEmailProps) => {
  const cfTurnstileResponse = formData["cf-turnstile-response"];
  // If using a reverse proxy, ensure the X-Real-IP header is enabled to accurately capture the client's original IP address.
  const ip = headers().get("x-real-ip");

  // Create form data for Turnstile verification
  const verifyFormData = new FormData();
  verifyFormData.append(
    "secret",
    process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY
  );
  verifyFormData.append("response", String(cfTurnstileResponse));
  verifyFormData.append("remoteip", String(ip));

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  try {
    // Verify Turnstile using Cloudflare endpoint
    const result = await fetch(url, {
      body: verifyFormData,
      method: "POST",
    });

    const outcome = await result.json();
    if (!outcome.success) {
      // Turnstile failed
      return {
        ok: false,
        error: "Invalid CAPTCHA",
      };
    }
    try {
      await sendEmailThroughHerotofu({ formData, captchaToken });
    } catch (err) {
      return {
        ok: false,
        error: "Unable to send email",
      };
    }
  } catch (err) {
    // Request failed
    return {
      ok: false,
      error: "Unable to verify CAPTCHA",
    };
  }
};

const sendEmailThroughHerotofu = async ({ formData }: SendEmailProps) => {
  const url = process.env.HEROTOFU_API_URL;
  const body = new FormData();
  body.append("name", formData.name);
  body.append("email", formData.email);
  body.append("phone", formData.phone || "");
  body.append("propertyId", formData.propertyId || "");

  try {
    const response = await fetch(url, {
      body,
      method: "POST",
    });

    return {
      ok: response.ok,
    };
  } catch (err) {
    return {
      ok: false,
      error: "Unable to send email",
    };
  }
};
