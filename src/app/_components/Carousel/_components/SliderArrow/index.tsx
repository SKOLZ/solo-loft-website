import { CustomArrowProps } from "react-slick";
import styles from "./styles.module.scss";

interface Props extends CustomArrowProps {
  direction: "left" | "right";
  variant?: "lg" | "sm";
}

const directionClassMap = {
  left: styles.left,
  right: styles.right,
};

const variantClassMap = {
  sm: styles.sm,
  lg: styles.lg,
};

export const SliderArrow: React.FC<Props> = ({
  onClick,
  direction,
  variant = "lg",
}) => {
  return (
    <button
      className={`${styles.sliderArrow} ${directionClassMap[direction]} ${variantClassMap[variant]}`}
      onClick={onClick}
    />
  );
};
