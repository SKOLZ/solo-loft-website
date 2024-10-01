"use client";

import { PropsWithChildren } from "react";
import Slider, { Settings } from "react-slick";
import { SliderArrow } from "./_components/SliderArrow";

interface CarouselProps extends PropsWithChildren {
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const settings: Settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: "progressive",
    className,
    prevArrow: <SliderArrow direction="left" />,
    nextArrow: <SliderArrow direction="right" />,
  };

  return <Slider {...settings}>{children}</Slider>;
};
