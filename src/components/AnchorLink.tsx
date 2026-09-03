"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollToSection } from "@/lib/smooth-scroll";

interface AnchorLinkProps {
  /** Absolute href, optionally with a hash: "/", "/#lookbook". */
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Runs on every activation — closing the mobile menu, for instance. */
  onNavigate?: () => void;
}

/**
 * A link to a section of a page.
 *
 * When the target section is on the page you are already looking at, this
 * scrolls to it instead of navigating: Next's router sets the scroll position
 * directly, which skips the document's `scroll-behavior: smooth` and lands as
 * a jump. Anything that is a real navigation — another route, a modified
 * click — is handed straight back to `next/link`.
 *
 * The offset under the fixed header comes from each section's `scroll-mt-*`,
 * which `scrollIntoView` honours.
 */
const AnchorLink = ({
  href,
  children,
  className,
  onNavigate,
  ...rest
}: AnchorLinkProps) => {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    // New tab, new window, middle click: not ours to intercept.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (pathname !== targetPath) return;

    const section = hash ? document.getElementById(hash) : null;
    // A hash with no matching section on this page is a real navigation.
    if (hash && !section) return;

    event.preventDefault();
    scrollToSection(section);

    // Keep the address bar in step without letting the browser jump there.
    window.history.replaceState(null, "", hash ? `#${hash}` : targetPath);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default AnchorLink;
