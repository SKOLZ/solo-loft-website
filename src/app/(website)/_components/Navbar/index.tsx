"use client";

import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "./_components/NavLink";
import { usePathname } from "next/navigation";

interface Props {}

export const Navbar: React.FC<Props> = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger}>
        <input
          type="checkbox"
          className={styles.hamburgerCheckbox}
          key={pathname}
        />
      </div>
      <NavLink
        className={styles.navbarItem}
        activeClassName={styles.active}
        href="/properties"
      >
        Propiedades
      </NavLink>
      <NavLink
        className={styles.navbarItem}
        activeClassName={styles.active}
        href="/about-us"
      >
        Nosotros
      </NavLink>
      <NavLink
        className={styles.navbarItem}
        activeClassName={styles.active}
        href="/contact"
      >
        Contacto
      </NavLink>
    </nav>
  );
};
