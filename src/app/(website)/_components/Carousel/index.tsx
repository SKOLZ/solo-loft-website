"use client";

import { PropsWithChildren } from "react";
import Slider, { Settings } from "react-slick";
import { SliderArrow } from "./_components/SliderArrow";
import "@/styles/overrides/slick-slider.scss";
import { SliderArrowVariant } from "./_components/SliderArrow/types";

interface CarouselProps extends PropsWithChildren {
  className?: string;
  settings?: Settings;
  arrowVariant?: SliderArrowVariant;
  arrowClassName?: string;
  sliderRef?: React.RefObject<Slider | null>;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  arrowVariant = "lg",
  settings,
  arrowClassName,
  sliderRef,
}) => {
  const finalSettings: Settings = {
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    lazyLoad: "progressive",
    className,
    prevArrow: (
      <SliderArrow
        direction="left"
        variant={arrowVariant}
        arrowClassName={arrowClassName}
      />
    ),
    nextArrow: (
      <SliderArrow
        direction="right"
        variant={arrowVariant}
        arrowClassName={arrowClassName}
      />
    ),
    ...settings,
  };

  return (
    <Slider {...finalSettings} ref={sliderRef}>
      {children}
    </Slider>
  );
};
