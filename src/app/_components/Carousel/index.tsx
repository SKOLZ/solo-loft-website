"use client";

import { PropsWithChildren } from "react";
import Slider, { Settings } from "react-slick";
import { SliderArrow } from "./_components/SliderArrow";

interface CarouselProps extends PropsWithChildren {
  className?: string;
  settings?: Settings;
  arrowVariant?: "lg" | "sm";
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  arrowVariant = "lg",
  settings,
}) => {
  const finalSettings: Settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: "progressive",
    className,
    prevArrow: <SliderArrow direction="left" variant={arrowVariant} />,
    nextArrow: <SliderArrow direction="right" variant={arrowVariant} />,
    ...settings,
  };

  return <Slider {...finalSettings}>{children}</Slider>;
};
