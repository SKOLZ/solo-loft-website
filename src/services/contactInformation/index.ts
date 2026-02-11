"use cache";

import { getSdk } from "@/generated/graphql";
import { client } from "../client";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, ETERNAL_CACHE_LIFE } from "../constants";

export const getContactInformation = async () => {
  cacheLife(ETERNAL_CACHE_LIFE);
  cacheTag(CACHE_TAGS.CONTACT);
  const response = await getSdk(client).getContactInformation();
  return response.contactInformations[0];
};
