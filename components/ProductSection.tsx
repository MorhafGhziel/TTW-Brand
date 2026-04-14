"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

/* ─── Data ─── */
const products = [
  { id: 1, name: "تيشيرت أسود كلاسيك", price: 149, badge: "new" as const },
  { id: 2, name: "هودي منظمة Abyss", price: 198, oldPrice: 268, discount: 26 },
  { id: 3, name: "بانتس منظمة Abyss", price: 149, oldPrice: 199, discount: 25 },
  { id: 4, name: "سويتر Abyss أسود", price: 290, oldPrice: 390, discount: 26 },
  { id: 5, name: "تيشيرت أبيض أوفرسايز", price: 149, badge: "new" as const },
  { id: 6, name: "هودي بطبعة جرافيك", price: 219, oldPrice: 299, discount: 27 },
  { id: 7, name: "كاب Abyss أسود", price: 89, badge: "new" as const },
  { id: 8, name: "جاكيت بومبر أسود", price: 359, badge: "new" as const },
];

const sortOptions = ["مقترحاتنا", "الأحدث", "الأقل سعراً", "الأعلى سعراً"] as const;
const categories = ["الكل", "تيشيرتات", "هوديز", "بناطيل", "جاكيتات", "اكسسوارات"] as const;

/*
  Header height (must match Header.tsx):
  Main row  h-[4.5rem]  = 4.5rem
  Nav row   h-11        = 2.75rem
  Total                 = 7.25rem
*/
const HEADER_H = "7.25rem";

const ProductSection = () => {
  const [activeSort, setActiveSort] = useState<string>("مقترحاتنا");
  const [activeCategory, setActiveCategory] = useState<string>("الكل");

  return (
    <section className="relative py-12 bg-[#f4f4f4]" dir="rtl">
      {/* ─── Title area ─── */}
      <div className="bg-[#f4f4f4]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pb-6">
          {/* Heading row */}
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#0a0a0a] leading-none">
              جميع المنتجات
            </h1>
            <span className="text-[14px] text-[#666] shrink-0 pb-0.5">
              {products.length} منتج
            </span>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-[14px] border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "bg-white text-[#444] border-[#d0d0d0] hover:border-[#888] hover:text-[#0a0a0a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Sticky sort bar ─── */}
      <div
        className="sticky z-30 bg-[#f4f4f4]/80 backdrop-blur-2xl border-b border-black/[0.04]"
        style={{ top: HEADER_H }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-[3.25rem]">
          {/* Sort tabs */}
          <div className="flex items-center gap-1">
            <span className="text-[13px] text-[#666] ml-3 hidden sm:inline">ترتيب:</span>
            {sortOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSort(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] transition-all duration-300 cursor-pointer ${
                  activeSort === tab
                    ? "bg-[#0a0a0a] text-white font-bold"
                    : "text-[#555] hover:text-[#0a0a0a] hover:bg-black/[0.04]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ─── Product grid ─── */}
      <div className="bg-[#f4f4f4] min-h-[60vh]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                oldPrice={p.oldPrice}
                discount={p.discount}
                badge={p.badge}
                index={i}
              />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center pt-14 pb-6">
            <button className="group flex items-center gap-2.5 bg-white text-[#0a0a0a] text-[15px] font-semibold px-10 py-3.5 rounded-full border border-[#e0e0e0] hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white active:scale-[0.97] transition-all duration-300 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              عرض المزيد
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
