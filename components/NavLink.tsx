"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Define the props we expect (compatible with your existing code)
interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  to: string; // We map this to 'href'
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // Next.js doesn't use this, but we keep it to prevent errors
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    
    // Logic to check if the link is active
    // 1. Exact match (e.g. "/" matches "/")
    // 2. Sub-path match (e.g. "/services" matches "/services/cleaning")
    // 3. Exclude Home "/" from matching everything else
    const isActive = 
      pathname === to || 
      (pathname?.startsWith(to) && to !== "/" && pathname?.charAt(to.length) === '/');

    return (
      <Link
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {props.children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };