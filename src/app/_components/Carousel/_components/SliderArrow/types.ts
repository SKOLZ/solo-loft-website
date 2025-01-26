export const SLIDER_ARROW_VARIANTS = {
  sm: "sm",
  lg: "lg",
  full: "full",
} as const;

export type SliderArrowVariant = keyof typeof SLIDER_ARROW_VARIANTS;
