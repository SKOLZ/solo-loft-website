import { Carousel } from "@/app/_components/Carousel";
import styles from "../../styles.module.scss";

interface Props<T> {
  isSingle: boolean;
  elements: Array<T>;
  children: (element: T, index: number) => React.ReactNode;
}

export const AssetCarousel = <T,>({
  isSingle,
  elements,
  children,
}: Props<T>) => {
  return (
    <>
      {isSingle ? (
        children(elements[0], 0)
      ) : (
        <Carousel
          settings={{ arrows: elements.length > 1 }}
          className={styles.propertyPhoto}
        >
          {elements.map((element, index) => children(element, index))}
        </Carousel>
      )}
    </>
  );
};
