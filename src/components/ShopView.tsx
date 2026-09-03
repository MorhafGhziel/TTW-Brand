"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { categories } from "@/lib/products";
import type { CategorySlug, Product } from "@/lib/types";

type SortKey = "featured" | "new" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "المختارة" },
  { key: "new", label: "الأحدث" },
  { key: "price-asc", label: "الأرخص أول" },
  { key: "price-desc", label: "الأغلى أول" },
];

interface ShopViewProps {
  products: Product[];
  /** When set, the category filter row is hidden — the page already scoped it. */
  lockedCategory?: CategorySlug;
}

const ShopView = ({ products, lockedCategory }: ShopViewProps) => {
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [color, setColor] = useState<string | "all">("all");

  const colorOptions = useMemo(() => {
    const seen = new Map<string, string>();
    products.forEach((p) =>
      p.colors.forEach((c) => {
        if (!seen.has(c.id)) seen.set(c.id, c.hex);
      })
    );
    return [...seen.entries()];
  }, [products]);

  const visible = useMemo(() => {
    const filtered =
      filter === "all" || lockedCategory
        ? products
        : products.filter((p) => p.categories.includes(filter));

    const byColor =
      color === "all"
        ? filtered
        : filtered.filter((p) => p.colors.some((c) => c.id === color));

    const sorted = [...byColor];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, filter, sort, color, lockedCategory]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        {!lockedCategory && (
          <div className="rail -mx-1 flex items-center gap-1 overflow-x-auto">
            {(["all", ...categories.map((c) => c.slug)] as const).map((slug) => {
              const active = filter === slug;
              const label =
                slug === "all"
                  ? "الكل"
                  : (categories.find((c) => c.slug === slug)?.name ?? slug);

              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setFilter(slug as CategorySlug | "all")}
                  aria-pressed={active}
                  className={`shrink-0 border px-4 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 ${
                    active
                      ? "border-text bg-text text-abyss"
                      : "border-line text-text-2 hover:border-line-strong hover:text-text"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4">
          <span className="data text-[0.75rem] text-text-3">
            {visible.length} قطعة
          </span>

          <label className="sr-only" htmlFor="sort">
            ترتيب
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="cursor-pointer border border-line bg-abyss px-3 py-2 text-[0.8125rem] text-text outline-none hover:border-line-strong"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key} className="bg-abyss">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colour filter — only when there is more than one colourway. */}
      {colorOptions.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="meta text-text-3">اللون</span>
          {colorOptions.map(([id, hex]) => {
            const active = color === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setColor(active ? "all" : id)}
                aria-pressed={active}
                aria-label={active ? `إزالة فلتر اللون` : `تصفية باللون`}
                className={`h-8 w-8 border p-[3px] transition-colors duration-200 ${
                  active ? "border-text" : "border-line hover:border-line-strong"
                }`}
              >
                <span
                  className="block h-full w-full"
                  style={{ backgroundColor: hex }}
                />
              </button>
            );
          })}
        </div>
      )}

      <ProductGrid products={visible} eagerCount={3} columns={4} />
    </>
  );
};

export default ShopView;
