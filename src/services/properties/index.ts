import { getSdk } from "@/generated/graphql";
import { client } from "../client";

export const getAllProperties = async () => {
  const response = await getSdk(client).getAllProperties();
  return response.properties;
};
