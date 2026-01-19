"use client";

import { useRef, ViewTransition } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const ref = useRef<HTMLElement>(null);

  const handleExit = () => {
    // Exit animation: fade out
    console.log("exit");
    return gsap
      .to(ref.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .then();
  };

  const handleEnter = () => {
    console.log("enter");
    return gsap
      .fromTo(
        ref.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      )
      .then();
  };

  return (
    // <ViewTransition onExit={handleExit} onEnter={handleEnter}>
    <main className="container main-container" ref={ref}>
      {children}
    </main>
    // </ViewTransition>
  );
};
