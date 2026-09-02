"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

/**
 * Bestsellers rail. Native overflow scrolling does the dragging on touch;
 * desktop gets a pair of buttons that page by one viewport of the rail.
 *
 * The buttons disable at each end rather than wrapping, so the rail never
 * jumps under the pointer.
 */
const Bestsellers = ({ products }: { products: Product[] }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    // scrollLeft runs negative in RTL, so compare on magnitude.
    const offset = Math.abs(rail.scrollLeft);
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(offset < 8);
    setAtEnd(offset >= max - 8);
  }, []);

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;

    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="bestsellers" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-[var(--max)] px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-section">الأكثر مبيعاً</h2>

          <div className="flex items-center gap-6">
            <Link
              href="/new"
              className="link-underline flex items-center gap-2 text-[0.8125rem] text-text-2"
            >
              عرض الكل
              <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
            </Link>

            <div className="hidden items-center gap-px lg:flex">
              <button
                type="button"
                onClick={() => page(1)}
                disabled={atStart}
                aria-label="السابق"
                className="border border-line p-2.5 text-text transition-colors hover:border-text hover:bg-text hover:text-abyss disabled:pointer-events-none disabled:text-text-3"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => page(-1)}
                disabled={atEnd}
                aria-label="التالي"
                className="border border-line p-2.5 text-text transition-colors hover:border-text hover:bg-text hover:text-abyss disabled:pointer-events-none disabled:text-text-3"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The gutters are spacer elements, not padding: Chromium offsets the
          initial scroll position of an RTL overflow container by its
          inline-start padding, which leaves the first card clipped. */}
      <div
        ref={railRef}
        className="rail flex snap-x snap-mandatory gap-px overflow-x-auto"
      >
        <span aria-hidden="true" className="w-5 shrink-0 md:w-8" />

        {products.map((product) => (
          <div
            key={product.id}
            className="w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23vw] xl:w-[19rem]"
          >
            <ProductCard product={product} compact />
          </div>
        ))}

        <span aria-hidden="true" className="w-5 shrink-0 md:w-8" />
      </div>
    </section>
  );
};

export default Bestsellers;
