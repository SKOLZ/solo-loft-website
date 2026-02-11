"use cache";

import { getSdk } from "@/generated/graphql";
import { client } from "../client";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, ETERNAL_CACHE_LIFE } from "../constants";

export const getAboutUs = async () => {
  cacheLife(ETERNAL_CACHE_LIFE);
  cacheTag(CACHE_TAGS.ABOUT_US);
  const response = await getSdk(client).getAboutUs();
  return response.aboutsUs[0];
};
