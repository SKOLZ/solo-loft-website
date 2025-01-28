import { Carousel } from "@/app/_components/Carousel";
import { SliderArrowVariant } from "@/app/_components/Carousel/_components/SliderArrow/types";
import Slider, { Settings } from "react-slick";

interface Props<T> {
  isSingle: boolean;
  elements: Array<T>;
  children: (element: T, index: number) => React.ReactNode;
  className?: string;
  arrowClassName?: string;
  arrowVariant?: SliderArrowVariant;
  settings?: Settings;
  sliderRef?: React.RefObject<Slider>;
}

export const AssetCarousel = <T,>({
  isSingle,
  elements,
  children,
  className,
  arrowClassName,
  arrowVariant,
  settings,
  sliderRef,
}: Props<T>) => {
  return (
    <>
      {isSingle ? (
        children(elements[0], 0)
      ) : (
        <Carousel
          settings={{ arrows: elements.length > 1, ...settings }}
          className={className}
          arrowClassName={arrowClassName}
          arrowVariant={arrowVariant}
          sliderRef={sliderRef}
        >
          {elements.map((element, index) => children(element, index))}
        </Carousel>
      )}
    </>
  );
};
