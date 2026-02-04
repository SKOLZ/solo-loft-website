"use cache";

import { getSdk } from "@/generated/graphql";
import { client } from "../client";
import { cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constants";

export const getAllProperties = async () => {
  cacheTag(CACHE_TAGS.PROPERTIES);
  const response = await getSdk(client).getAllProperties();
  return response.properties;
};

export const getPropertyDetails = async (slug: string) => {
  cacheTag(CACHE_TAGS.PROPERTIES);
  const response = await getSdk(client).getPropertyDetails({ slug });
  if (response.property) {
    cacheTag(CACHE_TAGS.PROPERTY(response.property.id));
  }
  return response.property;
};

export const getAllPropertyIdentifiers = async () => {
  cacheTag(CACHE_TAGS.PROPERTIES);
  cacheTag(CACHE_TAGS.CONTACT);
  const response = await getSdk(client).getAllPropertyIdentifiers();
  return response.properties;
};

export const getAllPropertiesSitemapData = async () => {
  cacheTag(CACHE_TAGS.PROPERTIES);
  const response = await getSdk(client).getAllPropertiesSitemapData();
  return response.properties;
};
