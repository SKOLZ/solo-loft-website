import { getSdk } from "@/generated/graphql";
import { client } from "../client";

export const getContactInformation = async () => {
  const response = await getSdk(client).getContactInformation();
  return response.contactInformations[0];
};
