"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useUI } from "./UIContext";
import { getBrowseCategories } from "@/lib/products";
import Wordmark from "./Wordmark";

/** Anchors are absolute so the nav works from product and category pages too. */
export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/#new-drop", label: "التشكيلة الجديدة" },
  { href: "/#bestsellers", label: "الأكثر مبيعاً" },
  { href: "/#lookbook", label: "لوك بوك" },
  { href: "/#manifesto", label: "من نحن" },
];

const TRUST_LINES = [
  "شحن مجاني للطلبات فوق ٣٠٠ ر.س",
  "الدفع عند الاستلام",
  "استبدال خلال ١٤ يوماً",
  "تصميم من الرياض — تشكيلة محدودة",
];

const browseCategories = getBrowseCategories();

const Navbar = () => {
  const { totalItems, hydrated, openCart } = useCart();
  const { openSearch, menuOpen, toggleMenu, closeMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const [trustIndex, setTrustIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate the trust line.
  useEffect(() => {
    const id = window.setInterval(
      () => setTrustIndex((i) => (i + 1) % TRUST_LINES.length),
      4000
    );
    return () => window.clearInterval(id);
  }, []);

  // Close the mega-menu on outside click, Escape, or a route change.
  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShopOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [shopOpen]);

  return (
    <>
      {/* Trust strip */}
      <div className="fixed inset-x-0 top-0 z-[60] overflow-hidden border-b border-line bg-surface">
        <div
          aria-live="off"
          className="mx-auto flex h-8 max-w-[var(--max)] items-center justify-center px-5 md:px-8"
        >
          <p
            key={trustIndex}
            className="meta animate-fade-in text-text-2"
          >
            {TRUST_LINES[trustIndex]}
          </p>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 top-8 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen || shopOpen
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
              {NAV_LINKS.slice(0, 1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.8125rem] text-text-2 hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Shop mega-menu trigger */}
              <li ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShopOpen((v) => !v)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                  className="link-underline flex items-center gap-1.5 text-[0.8125rem] text-text-2 hover:text-text"
                >
                  المتجر
                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${
                      shopOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </li>

              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.8125rem] text-text-2 hover:text-text"
                  >
                    {link.label}
                  </Link>
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

        {/* Shop mega-menu — photo category rail */}
        {shopOpen && (
          <div className="absolute inset-x-0 top-full hidden border-t border-line bg-abyss/95 backdrop-blur-xl lg:block">
            <div className="mx-auto grid max-w-[var(--max)] grid-cols-5 gap-px bg-line">
              {browseCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  onClick={() => setShopOpen(false)}
                  className="group duotone duotone-deep relative aspect-[3/4] overflow-hidden bg-elevated"
                >
                  {category.image && (
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 20vw, 18vw"
                      className="object-cover object-[center_30%] transition-transform duration-700 ease-[var(--ease)] group-hover:scale-105"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(10,10,10,0.9)_0%,rgba(10,10,10,0.15)_70%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <span className="font-kufi block text-[1.125rem] leading-tight font-bold text-text">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-[0.75rem] text-text-2">
                      {category.tagline}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu — full-height panel under the bar */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-22 bottom-0 z-40 border-t border-line bg-abyss/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <Link
                href={link.href}
                onClick={closeMenu}
                className="font-kufi block py-5 text-[1.375rem] font-bold text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
