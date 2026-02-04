"use cache";

import { getSdk } from "@/generated/graphql";
import { client } from "../client";
import { cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constants";

export const getAboutUs = async () => {
  cacheTag(CACHE_TAGS.ABOUT_US);
  const response = await getSdk(client).getAboutUs();
  return response.aboutsUs[0];
};
