import { Link, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "to"> {
  to?: LinkProps["to"];
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to as any}
        className={((linkProps: any) => {
          const baseClass = typeof className === "function" ? className(linkProps) : className;
          return cn(
            baseClass,
            linkProps.isActive && activeClassName,
            linkProps.isPending && pendingClassName
          );
        }) as any}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };