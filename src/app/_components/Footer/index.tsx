import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import ConsultoraRocaLogo from "@/assets/consultora_roca_logo.svg";

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGroup}>
          <h3 className={styles.footerGroupTitle}>Empresa y Producto</h3>
          <ul className={styles.footerGroupLinks}>
            <li>
              <Link href="/properties" className="link">
                Propiedades
              </Link>
            </li>
            <li>
              <Link href="/contact" className="link">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerGroup}>
          <ConsultoraRocaLogo className={styles.footerGroupLogo} />
        </div>
      </div>
    </footer>
  );
};
