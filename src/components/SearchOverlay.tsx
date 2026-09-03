"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "./UIContext";
import { formatPrice, searchProductsSync } from "@/lib/products";

const RECENT_KEY = "abyss-recent-searches";
const MAX_RECENT = 4;

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(RECENT_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed)
      ? (parsed as string[]).slice(0, MAX_RECENT)
      : [];
  } catch {
    // Unavailable or corrupt storage just means no history to offer.
    return [];
  }
}

const SearchOverlay = () => {
  const { searchOpen, closeSearch } = useUI();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Read once, lazily. The overlay renders nothing until it is opened, so the
  // server and the first client render agree regardless of what is stored.
  const [recent, setRecent] = useState<string[]>(readRecent);

  useEffect(() => {
    if (!searchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen]);

  const results = useMemo(() => searchProductsSync(query).slice(0, 5), [query]);

  /** Records the term that actually led somewhere, not every keystroke. */
  const remember = (term: string) => {
    const clean = term.trim();
    if (!clean) return;

    const next = [clean, ...recent.filter((r) => r !== clean)].slice(
      0,
      MAX_RECENT
    );
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // Nothing to do; the session still works.
    }
  };

  const leave = () => {
    remember(query);
    setQuery("");
    closeSearch();
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="بحث"
          className="fixed inset-0 z-[95] overflow-y-auto bg-abyss/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mx-auto max-w-[52rem] px-5 pt-24 pb-16 md:px-8 md:pt-32">
            <div className="mb-8 flex justify-end">
              <button
                type="button"
                onClick={closeSearch}
                aria-label="إغلاق البحث"
                className="text-text transition-colors hover:text-chrome"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <label htmlFor="site-search" className="sr-only">
              ابحث في المتجر
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن..."
              autoComplete="off"
              className="font-kufi w-full border-b border-line-strong bg-transparent pb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-text outline-none placeholder:text-text-3 focus:border-text"
            />

            {query.trim() === "" ? (
              recent.length > 0 && (
                <div className="mt-10">
                  <p className="meta mb-4 text-text-3">آخر عمليات البحث</p>
                  <ul className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="border border-line px-4 py-2 text-[0.875rem] text-text-2 transition-colors hover:border-text hover:text-text"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ) : results.length === 0 ? (
              <p className="mt-10 text-[0.9375rem] text-text-2">
                لا يوجد ما يطابق &laquo;{query}&raquo;. جرّب اسم قطعة أو فئة —
                جاكيتات، تيشيرتات، أحذية.
              </p>
            ) : (
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={leave}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="relative aspect-3/4 w-14 shrink-0 overflow-hidden bg-elevated">
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="font-kufi block text-[1rem] font-bold transition-colors group-hover:text-chrome">
                          {product.name}
                        </span>
                        <span className="data block text-[0.625rem] tracking-[0.2em] text-text-3">
                          {product.subtitle}
                        </span>
                      </span>

                      <span className="data shrink-0 text-[0.875rem] text-text-2">
                        {formatPrice(product.price)} ر.س
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
