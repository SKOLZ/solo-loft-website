import styles from "./styles.module.scss";

interface Props {}

export const Hero: React.FC<Props> = () => {
  return (
    <div className={styles.hero}>
      <h1
        className={`${styles.heroLogo} ${styles.textGlow} ${styles.logoAnimation}`}
      >
        Solo loft
      </h1>
    </div>
  );
};
