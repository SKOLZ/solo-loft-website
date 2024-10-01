import { CustomArrowProps } from "react-slick";
import styles from "./styles.module.scss";

interface Props extends CustomArrowProps {
  direction: "left" | "right";
}

const directionClassMap = {
  left: styles.left,
  right: styles.right,
};

export const SliderArrow: React.FC<Props> = ({ onClick, direction }) => {
  return (
    <button
      className={`${styles.sliderArrow} ${directionClassMap[direction]}`}
      onClick={onClick}
    />
  );
};
