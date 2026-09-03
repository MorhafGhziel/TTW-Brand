"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AnchorLink from "./AnchorLink";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import Wordmark from "./Wordmark";

/** Anchors are absolute so the nav works from product and category pages too. */
export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/#manifesto", label: "من نحن" },
];

const Navbar = () => {
  const { totalItems, hydrated, openCart } = useCart();
  const { openSearch, menuOpen, toggleMenu, closeMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? "border-b border-line bg-abyss/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="التنقل الرئيسي"
          className="mx-auto flex h-14 max-w-[var(--max)] items-center justify-between gap-4 px-5 md:h-16 md:px-8"
        >
          {/* Start — desktop links, mobile menu trigger */}
          <div className="flex flex-1 items-center gap-7">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className="text-text transition-colors hover:text-chrome lg:hidden"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>

            <ul className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <AnchorLink
                    href={link.href}
                    className="link-underline text-[0.8125rem] text-text-2 hover:text-text"
                  >
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Centre — wordmark */}
          <Link
            href="/"
            aria-label="ABYSS — الصفحة الرئيسية"
            className="shrink-0 transition-opacity hover:opacity-70"
          >
            <Wordmark className="h-6 md:h-7" priority />
          </Link>

          {/* End — actions */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <button
              type="button"
              onClick={openSearch}
              aria-label="بحث"
              className="text-text transition-colors hover:text-chrome"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={
                hydrated && totalItems > 0
                  ? `سلة التسوق، ${totalItems} قطعة`
                  : "سلة التسوق"
              }
              className="relative text-text transition-colors hover:text-chrome"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {hydrated && totalItems > 0 && (
                <span className="data absolute -top-1.5 -right-2 min-w-[1.05rem] bg-blue px-1 py-px text-center text-[0.625rem] leading-tight font-bold text-abyss">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-height panel under the bar */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-14 bottom-0 z-40 border-t border-line bg-abyss/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <AnchorLink
                href={link.href}
                onNavigate={closeMenu}
                className="font-kufi block py-5 text-[1.375rem] font-bold text-text"
              >
                {link.label}
              </AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
