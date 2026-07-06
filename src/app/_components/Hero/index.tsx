import cn from "classnames";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.hero, className)}>
      <h1 className={`${styles.heroLogo} ${styles.textGlow}`}>Solo loft</h1>
    </div>
  );
};
