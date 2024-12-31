export const ASSET_TYPES = {
  photos: "photos",
  videos: "videos",
} as const;

export type AssetType = (typeof ASSET_TYPES)[keyof typeof ASSET_TYPES];
