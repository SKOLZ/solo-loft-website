export const CACHE_TAGS = {
  ABOUT_US: "ABOUT_US",
  CONTACT: "CONTACT",
  PROPERTIES: "PROPERTIES",
  PROPERTY: (id: string) => `PROPERTY_${id}`,
} as const;

export const ETERNAL_CACHE_LIFE = {
  stale: 365 * 60 * 60 * 24, // 1 year
  revalidate: 365 * 60 * 60 * 24, // 1 year
  expire: 365 * 60 * 60 * 24, // 1 year
} as const;
