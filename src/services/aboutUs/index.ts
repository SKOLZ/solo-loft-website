import { getSdk } from "@/generated/graphql";
import { client } from "../client";

export const getAboutUs = async () => {
  const response = await getSdk(client).getAboutUs();
  return response.aboutsUs[0];
};
