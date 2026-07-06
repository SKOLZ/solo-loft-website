import { CustomArrowProps } from "react-slick";
import styles from "./styles.module.scss";
import { SliderArrowVariant } from "./types";

interface Props extends CustomArrowProps {
  direction: "left" | "right";
  variant?: SliderArrowVariant;
  arrowClassName?: string;
}

const directionClassMap = {
  left: styles.left,
  right: styles.right,
};

const variantClassMap: Record<SliderArrowVariant, string> = {
  sm: styles.sm,
  lg: styles.lg,
  full: styles.full,
};

export const SliderArrow: React.FC<Props> = ({
  onClick,
  direction,
  variant = "lg",
  arrowClassName,
}) => {
  return (
    <button
      className={`${styles.sliderArrow} ${directionClassMap[direction]} ${
        variantClassMap[variant]
      } ${arrowClassName ?? ""}`}
      onClick={onClick}
    />
  );
};
