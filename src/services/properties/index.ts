import { getSdk } from "@/generated/graphql";
import { client } from "../client";

export const getAllProperties = async () => {
  const response = await getSdk(client).getAllProperties();
  return response.properties;
};

export const getPropertyDetails = async (slug: string) => {
  const response = await getSdk(client).getPropertyDetails({ slug });
  return response.properties[0];
};

export const getAllPropertyIdentifiers = async () => {
  const response = await getSdk(client).getAllPropertyIdentifiers();
  return response.properties;
};
