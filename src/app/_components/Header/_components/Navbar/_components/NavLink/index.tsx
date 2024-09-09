"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<LinkProps> {
  className?: string;
  activeClassName?: string;
}

export const NavLink: React.FC<Props> = ({
  activeClassName,
  className,
  children,
  ...props
}) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={`${className} ${
        pathname === props.href && activeClassName ? activeClassName : ""
      }`}
    >
      {children}
    </Link>
  );
};
