"use server";

import { ok } from "assert";
import { ContactFormData } from "./types";
import { json } from "stream/consumers";
import { headers } from "next/headers";

interface SendEmailProps {
  formData: ContactFormData;
  turnstileToken: string;
}

export const sendEmail = async ({
  formData,
  turnstileToken,
}: SendEmailProps) => {
  // If using a reverse proxy, ensure the X-Real-IP header is enabled to accurately capture the client's original IP address.
  const ip = headers().get("x-real-ip");

  // Create form data for Turnstile verification
  const verifyFormData = new FormData();
  verifyFormData.append(
    "secret",
    process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY
  );
  verifyFormData.append("response", String(turnstileToken));
  verifyFormData.append("remoteip", String(ip));

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  try {
    // Verify Turnstile using Cloudflare endpoint
    const result = await fetch(url, {
      body: verifyFormData,
      method: "POST",
    });

    const outcome = await result.json();
    console.log({ outcome });
    if (!outcome.success) {
      // Turnstile failed
      console.log("Invalid CAPTCHA");
      return {
        ok: false,
        error: "Invalid CAPTCHA",
      };
    }
    try {
      const response = await sendEmailThroughHerotofu(formData);
      return response;
    } catch (err) {
      console.log("Unable to send email");
      return {
        ok: false,
        error: "Unable to send email",
      };
    }
  } catch (err) {
    // Request failed
    console.log("Unable to verify CAPTCHA");
    return {
      ok: false,
      error: "Unable to verify CAPTCHA",
    };
  }
};

const sendEmailThroughHerotofu = async (formData: ContactFormData) => {
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
    console.log("success");
    return {
      ok: response.ok,
    };
  } catch (err) {
    console.log("Unable to send email");
    return {
      ok: false,
      error: "Unable to send email",
    };
  }
};
