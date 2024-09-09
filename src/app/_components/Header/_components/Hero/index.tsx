import styles from "./styles.module.scss";

interface Props {}

export const Hero: React.FC<Props> = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroLogo}>Solo loft</h1>
    </div>
  );
};
