"use client";

import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { NavLink } from "./_components/NavLink";

interface Props {}

export const Navbar: React.FC<Props> = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.navbar}>
      <NavLink
        className={styles.navbarItem}
        activeClassName={styles.active}
        href="/properties"
      >
        Propiedades
      </NavLink>
      {/* <NavLink
        className={styles.navbarItem}
        activeClassName={styles.active}
        href="/contact"
      >
        Contacto
      </NavLink> */}
    </nav>
  );
};
