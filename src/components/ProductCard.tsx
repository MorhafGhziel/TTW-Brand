"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import type { Product, Size } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Loads the image eagerly. Reserved for the first row above the fold. */
  priority?: boolean;
  /** Smaller type and image, for the bestsellers rail. */
  compact?: boolean;
}

/**
 * A sharp rectangle: image, name, price, and the sizes still in stock.
 *
 * Quick-add is the size row that slides up over the image on pointer devices.
 * Touch devices get the product page instead, where a colourway can be picked
 * too — adding an unnamed size on a tap is a guess, not a shortcut.
 */
const ProductCard = ({
  product,
  priority = false,
  compact = false,
}: ProductCardProps) => {
  const { addLine } = useCart();
  const [added, setAdded] = useState<Size | null>(null);

  const soldOut = new Set(product.soldOutSizes ?? []);
  const inStock = product.sizes.filter((s) => !soldOut.has(s));
  const discounted = Boolean(product.oldPrice);

  const quickAdd = (size: Size) => {
    addLine(product, size, product.colors[0]);
    setAdded(size);
    window.setTimeout(() => setAdded(null), 1400);
  };

  return (
    <article className="group relative flex flex-col bg-surface">
      <div className="relative aspect-3/4 overflow-hidden bg-elevated">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={
            compact
              ? "(max-width: 768px) 70vw, 22vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          priority={priority}
          className="grade object-cover group-hover:scale-[1.03]"
        />

        {/* Status. Only one can apply, and a discount outranks a new arrival. */}
        {(discounted || product.isNew) && (
          <span
            className={`data pointer-events-none absolute top-3 start-3 z-20 px-2 py-1 text-[0.625rem] leading-none font-bold ${
              discounted
                ? "bg-blue text-abyss"
                : "border border-line-strong bg-abyss/60 text-text backdrop-blur-sm"
            }`}
          >
            {discounted ? "تخفيض" : "جديد"}
          </span>
        )}

        {/* Quick add — pointer devices only. */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden translate-y-full bg-abyss/90 backdrop-blur-sm transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0 lg:block">
          <div className="flex items-stretch gap-px p-1">
            {product.sizes.map((size) => {
              const unavailable = soldOut.has(size);
              return (
                <button
                  key={size}
                  type="button"
                  disabled={unavailable}
                  onClick={() => quickAdd(size)}
                  aria-label={`ضف مقاس ${size} للسلة`}
                  className={`data relative z-10 flex flex-1 items-center justify-center py-2.5 text-[0.6875rem] transition-colors duration-200 ${
                    unavailable
                      ? "cursor-not-allowed text-text-3 line-through"
                      : added === size
                        ? "bg-text text-abyss"
                        : "text-text hover:bg-text hover:text-abyss"
                  }`}
                >
                  {added === size ? (
                    <Check size={13} strokeWidth={2} />
                  ) : (
                    size
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3 pt-3 pb-4">
        <h3
          className={`leading-snug font-bold ${
            compact ? "text-[0.875rem]" : "text-[1rem]"
          }`}
        >
          {/* Stretched link. The quick-add row sits above it on the z-axis so
              its buttons stay independently clickable. */}
          <Link
            href={`/product/${product.slug}`}
            className="after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </h3>

        <span className="data text-[0.625rem] tracking-[0.2em] text-text-3">
          {product.subtitle}
        </span>

        <div className="data mt-2 flex items-baseline gap-2 text-[0.875rem]">
          <span>{formatPrice(product.price)} ر.س</span>
          {product.oldPrice && (
            <span className="text-text-3 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Availability, at a glance. Filled means the size is in stock. */}
        {product.sizes.length > 1 && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="sr-only">
              المقاسات المتوفرة: {inStock.join("، ") || "ما فيه"}
            </span>
            {product.sizes.map((size) => (
              <span
                key={size}
                aria-hidden="true"
                title={size}
                className={`h-1.5 w-1.5 ${
                  soldOut.has(size) ? "bg-text-3/40" : "bg-text-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
