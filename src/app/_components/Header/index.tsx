import { Hero } from "./_components/Hero";
import { Navbar } from "./_components/Navbar";
import styles from "./styles.module.scss";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Navbar />
        <Hero />
      </div>
    </header>
  );
};
