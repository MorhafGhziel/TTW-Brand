"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/orders";
import type { Product, Size } from "@/lib/types";

const ProductDetail = ({ product }: { product: Product }) => {
  const { addLine } = useCart();
  const soldOut = new Set(product.soldOutSizes ?? []);

  const firstAvailable = product.sizes.find((s) => !soldOut.has(s)) ?? null;
  const [size, setSize] = useState<Size | null>(firstAvailable);
  const [color, setColor] = useState(product.colors[0]);
  const [openDetails, setOpenDetails] = useState(true);

  return (
    <div className="mx-auto max-w-[var(--max)] px-5 py-10 md:px-8 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative aspect-3/4 overflow-hidden bg-elevated">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover brightness-[0.88] contrast-105 saturate-[0.7]"
          />
          <span className="data pointer-events-none absolute bottom-4 start-4 text-[0.625rem] tracking-[0.24em] text-text-2 mix-blend-difference">
            {product.subtitle}
          </span>
        </div>

        {/* Follows the image on scroll */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="h-section">{product.name}</h1>

          <div className="data mt-5 flex flex-wrap items-baseline gap-3 text-[1.125rem]">
            <span>{formatPrice(product.price)} ر.س</span>
            {product.oldPrice && (
              <>
                <span className="text-text-3 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="bg-blue px-2 py-1 text-[0.625rem] leading-none font-bold text-abyss">
                  وفّر {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="prose-ar mt-8 text-[0.9375rem] text-text-2">
            {product.description}
          </p>

          {product.colors.length > 1 && (
            <div className="mt-10">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="meta text-text-3">اللون</span>
                <span className="text-[0.8125rem] text-text-2">{color.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    aria-pressed={c.id === color.id}
                    className={`h-9 w-9 border p-[3px] transition-colors duration-200 ${
                      c.id === color.id
                        ? "border-text"
                        : "border-line hover:border-line-strong"
                    }`}
                  >
                    <span
                      className="block h-full w-full"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="meta text-text-3">المقاس</span>
            </div>

            <div className="grid grid-cols-5 gap-px bg-line">
              {product.sizes.map((s) => {
                const unavailable = soldOut.has(s);
                const selected = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={unavailable}
                    onClick={() => setSize(s)}
                    aria-pressed={selected}
                    className={`data py-3.5 text-[0.75rem] transition-colors duration-200 ${
                      unavailable
                        ? "cursor-not-allowed bg-abyss text-text-3 line-through"
                        : selected
                          ? "bg-text text-abyss"
                          : "bg-abyss text-text hover:bg-elevated"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {product.soldOutSizes?.length ? (
              <p className="mt-3 text-[0.75rem] text-text-3">
                المقاسات المشطوبة نفدت من هذه الدفعة.
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => size && addLine(product, size, color)}
            disabled={!size}
            className="btn-solid mt-8 w-full text-[0.9375rem]"
          >
            {size ? "أضف إلى السلة" : "اختر المقاس"}
          </button>

          <p className="mt-4 text-center text-[0.75rem] text-text-3">
            شحن مجاني فوق {formatPrice(FREE_SHIPPING_THRESHOLD)} ر.س · استبدال
            خلال ١٤ يوماً
          </p>

          <div className="mt-10 border-t border-line">
            <button
              type="button"
              onClick={() => setOpenDetails((v) => !v)}
              className="flex w-full items-center justify-between py-4 text-start"
              aria-expanded={openDetails}
            >
              <span className="text-[0.9375rem]">التفاصيل والخامة</span>
              <span
                className={`text-[1.25rem] leading-none text-text-2 transition-transform duration-300 ${
                  openDetails ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease)]"
              style={{ gridTemplateRows: openDetails ? "1fr" : "0fr" }}
            >
              <ul className="overflow-hidden">
                {product.details.map((d) => (
                  <li
                    key={d}
                    className="flex gap-3 pb-3 text-[0.875rem] leading-relaxed text-text-2"
                  >
                    <span className="text-text-3" aria-hidden="true">
                      —
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
