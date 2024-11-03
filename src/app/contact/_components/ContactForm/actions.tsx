"use server";

import { ok } from "assert";
import { ContactFormData } from "./types";
import { json } from "stream/consumers";

interface SendEmailProps {
  formData: ContactFormData;
  captchaToken: string;
}

export const sendEmail = async ({ formData, captchaToken }: SendEmailProps) => {
  try {
    const response = await fetch(process.env.HEROTOFU_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        "g-recaptcha-response": captchaToken,
      }),
    });

    return {
      ok: response.ok,
      error: response.ok ? null : await response.json(),
    };
  } catch (error) {
    return {
      ok: false,
      error: error,
    };
  }
};
