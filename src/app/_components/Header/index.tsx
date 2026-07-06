import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>{children}</div>
    </header>
  );
};
