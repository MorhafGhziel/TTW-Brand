"use client";

import { useState, useRef, useEffect } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  badge?: "sale" | "new" | null;
  image?: string;
  index?: number;
}

const ProductCard = ({
  name,
  price,
  oldPrice,
  discount,
  badge,
  image,
  index = 0,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = (index % 4) * 100;
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="card-enter">
      <div className="group relative bg-white rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5">
        {/* ── Image ── */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-[#f5f5f5] to-[#ebebeb] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[64px] font-bold text-black/[0.04] tracking-[0.15em] select-none">
                Abyss
              </span>
            </div>
          )}

          {/* Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="أضف للمفضلة"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "#c0c0c0"}
              strokeWidth="2"
              className="transition-all duration-300"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>

          {/* Discount */}
          {!!discount && (
            <span className="absolute top-3.5 left-3.5 bg-[#dc2626] text-white text-[12px] font-bold min-w-[42px] h-[26px] rounded-full flex items-center justify-center px-2 shadow-[0_2px_8px_rgba(220,38,38,0.3)]">
              {discount}%-
            </span>
          )}

          {/* New */}
          {badge === "new" && !discount && (
            <span className="absolute top-3.5 left-3.5 bg-[#0a0a0a] text-white text-[12px] font-bold h-[26px] rounded-full flex items-center justify-center px-3.5 tracking-wide">
              جديد
            </span>
          )}
        </div>

        {/* ── Info ── */}
        <div className="p-4 pb-5">
          <h3 className="text-[15px] text-[#2a2a2a] font-semibold mb-2 leading-snug line-clamp-1">
            {name}
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[18px] font-bold text-[#0a0a0a]">{price}</span>
            <span className="text-[13px] text-[#999]">ر.س</span>
            {oldPrice && (
              <span className="text-[14px] text-[#c0c0c0] line-through mr-1">{oldPrice}</span>
            )}
          </div>

          {/* Add to Cart */}
          <button className="w-full h-11 bg-[#0a0a0a] text-white text-[14px] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all duration-200 cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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

export default ProductCard;
