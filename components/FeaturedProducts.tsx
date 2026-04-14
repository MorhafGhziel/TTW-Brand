"use client";

import { useRef, useEffect, useState } from "react";

const products = [
  { id: 1, name: "تيشيرت أسود كلاسيك", price: 149, badge: "new" as const },
  { id: 2, name: "هودي منظمة Abyss", price: 198, oldPrice: 268, discount: 26 },
  { id: 3, name: "بانتس منظمة Abyss", price: 149, oldPrice: 199, discount: 25 },
  { id: 4, name: "سويتر Abyss أسود", price: 290, badge: "new" as const },
];

const FeaturedProductCard = ({
  name,
  price,
  oldPrice,
  discount,
  badge,
  index = 0,
}: {
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  badge?: "new" | "sale" | null;
  index?: number;
}) => {
  const [liked, setLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), index * 120);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="card-enter">
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.14)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
        {/* Image area with niche effect */}
        <div className="relative aspect-[3/4] bg-gradient-to-b from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] overflow-hidden">
          {/* Niche/alcove shadow effect like the reference */}
          <div className="absolute inset-4 rounded-xl bg-gradient-to-b from-[#d8d8d8] via-[#e4e4e4] to-[#f2f2f2] shadow-[inset_0_8px_24px_rgba(0,0,0,0.12),inset_0_-4px_12px_rgba(255,255,255,0.3)]" />
          <div className="absolute inset-6 rounded-lg bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <span className="text-[48px] font-bold text-black/[0.04] tracking-[0.15em] select-none">
              Abyss
            </span>
          </div>

          {/* Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="أضف للمفضلة"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "#ef4444" : "none"} stroke={liked ? "#ef4444" : "#c0c0c0"} strokeWidth="2" className="transition-all duration-300">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>

          {/* Badges */}
          {!!discount && (
            <span className="absolute top-3 left-3 bg-[#dc2626] text-white text-[12px] font-bold min-w-[42px] h-[26px] rounded-full flex items-center justify-center px-2">
              {discount}%-
            </span>
          )}
          {badge === "new" && !discount && (
            <span className="absolute top-3 left-3 bg-[#0a0a0a] text-white text-[12px] font-bold h-[26px] rounded-full flex items-center justify-center px-3.5">
              جديد
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 pb-5 text-right">
          <h3 className="text-[15px] text-[#2a2a2a] font-semibold mb-2 leading-snug line-clamp-1">
            {name}
          </h3>
          <div className="flex items-baseline gap-2 justify-end mb-4">
            {oldPrice && (
              <span className="text-[14px] text-[#c0c0c0] line-through">{oldPrice}</span>
            )}
            <span className="text-[13px] text-[#999]">ر.س</span>
            <span className="text-[18px] font-bold text-[#0a0a0a]">{price}</span>
          </div>

          <button className="w-full h-11 bg-[#0a0a0a] text-white text-[14px] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all duration-200 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            إضافة للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-[#f9f9f9]" dir="rtl">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Title */}
        <h2 className="text-[32px] md:text-[40px] font-bold text-[#0a0a0a] text-center mb-14">
          منتجاتنا
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {products.map((p, i) => (
            <FeaturedProductCard
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

        {/* View All button */}
        <div className="flex justify-center pt-12">
          <button className="group flex items-center gap-2.5 bg-[#0a0a0a] text-white text-[15px] font-semibold px-10 py-3.5 rounded-full hover:bg-[#1a1a1a] active:scale-[0.97] transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            عرض الكل
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
