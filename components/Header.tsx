"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";

const navLinks = [
  { href: "/new", label: "جديدنا" },
  { href: "/collabs", label: "تعاونات" },
  { href: "/by-appointment", label: "بموعد فقط" },
  { href: "/sets", label: "أطقم" },
  { href: "/best-sellers", label: "الأكثر مبيعاً" },
  { href: "/women", label: "نساء" },
  { href: "/men", label: "رجال" },
  { href: "/hats", label: "قبعات" },
  { href: "/gift-card", label: "بطاقة هدية" },
  { href: "/sale", label: "تخفيضات" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out bg-white ${
        scrolled
          ? "shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
          : ""
      }`}
    >
      {/* Main Row */}
      <div className="max-w-[1300px] mx-auto px-8 flex items-center justify-between h-[4.5rem]">
        {/* Left - Icons */}
        <div className="flex items-center gap-5">
          <button className="cursor-pointer group relative p-2" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#888] group-hover:text-[#0a0a0a] transition-all duration-300 group-hover:scale-110">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button onClick={openCart} className="group relative p-2 cursor-pointer" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#888] group-hover:text-[#0a0a0a] transition-all duration-300 group-hover:scale-110">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {/* Cart badge */}
            {totalItems > 0 && (
              <span className="absolute top-0.5 left-0.5 w-[18px] h-[18px] bg-[#0a0a0a] rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>

          <Link href="/account" className="group relative p-2" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#888] group-hover:text-[#0a0a0a] transition-all duration-300 group-hover:scale-110">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>

        {/* Right - Logo */}
        <Link href="/" className="transition-all duration-500 hover:opacity-80 hover:scale-105 flex items-center h-full">
          <Image
            src="/icons/Abyss-Logo.svg"
            alt="Abyss Brand"
            width={250}
            height={250}
            className="object-contain max-h-[6.5rem]"
            priority
          />
        </Link>
      </div>

    </header>
  );
};

export default Header;
