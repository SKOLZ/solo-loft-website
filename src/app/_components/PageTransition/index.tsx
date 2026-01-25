"use client";

import { ViewTransition } from "react";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      mainRef.current?.classList.add(styles.loaded);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main ref={mainRef} className="container main-container">
      <ViewTransition name="page">
        <div className={styles.initializationAnimation}>{children}</div>
      </ViewTransition>
    </main>
  );
};
