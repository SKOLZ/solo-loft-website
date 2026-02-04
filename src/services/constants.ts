export const CACHE_TAGS = {
  ABOUT_US: "ABOUT_US",
  CONTACT: "CONTACT",
  PROPERTIES: "PROPERTIES",
  PROPERTY: (id: string) => `PROPERTY_${id}`,
} as const;
