"use server";

import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 }
    );
  }

  const data = await request.json();

  if (!data["g-recaptcha-response"]) {
    return new Response(JSON.stringify({ message: "Token not found" }), {
      status: 405,
    });
  }

  try {
    console.log(JSON.stringify(data));
    const response = await fetch(
      "https://public.herotofu.com/v1/7771bcf0-8336-11ef-b2ee-7bc0ee20cd9b",
      {
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Pass the data as
      }
    );
    if (response.ok) {
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } else {
      console.log({ response });
      return new Response(JSON.stringify({ message: "Failed to verify" }), {
        status: 405,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
