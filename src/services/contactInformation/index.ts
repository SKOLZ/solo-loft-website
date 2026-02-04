"use cache";

import { getSdk } from "@/generated/graphql";
import { client } from "../client";
import { cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constants";

export const getContactInformation = async () => {
  cacheTag(CACHE_TAGS.CONTACT);
  const response = await getSdk(client).getContactInformation();
  return response.contactInformations[0];
};
