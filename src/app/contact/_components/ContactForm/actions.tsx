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
    // const response = await fetch(
    //   "https://public.herotofu.com/v1/7771bcf0-8336-11ef-b2ee-7bc0ee20cd9b",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...formData,
    //       "g-recaptcha-response": captchaToken,
    //     }),
    //   }
    // );
    const response = {
      ok: true,
      json: async () => {
        return {
          message: "Success",
        };
      },
    };
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
