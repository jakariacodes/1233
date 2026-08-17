import { Link, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={(linkProps: { isActive: boolean; isPending: boolean }) => {
          const baseClass = typeof className === "function" ? className(linkProps: { isActive: boolean; isPending: boolean }) : className;
          return cn(
            baseClass,
            linkProps: { isActive: boolean; isPending: boolean }.isActive && activeClassName,
            linkProps: { isActive: boolean; isPending: boolean }.isPending && pendingClassName
          );
        }}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
