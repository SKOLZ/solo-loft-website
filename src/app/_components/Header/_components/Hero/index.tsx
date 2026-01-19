"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./styles.module.scss";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { CustomEase } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, SplitText, CustomEase);
}

interface Props {}

export const Hero: React.FC<Props> = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      y: 40,
    });

    CustomEase.create("in-out", "0.42,0,0.58,1");

    gsap.to(titleRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      ease: "in-out",
      duration: 1.2,
      delay: 1,
    });
  }, {});

  return (
    <div className={styles.hero}>
      <h1
        ref={titleRef}
        className={`${styles.heroLogo} ${styles.textGlow} ${styles.logoAnimation}`}
      >
        Solo loft
      </h1>
    </div>
  );
};
