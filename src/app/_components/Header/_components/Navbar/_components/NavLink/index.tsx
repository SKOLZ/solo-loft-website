"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<LinkProps> {
  className?: string;
  activeClassName?: string;
  href: string;
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
        pathname.includes(props.href) && activeClassName ? activeClassName : ""
      }`}
    >
      {children}
    </Link>
  );
};
