"use client";

import { useRef, useEffect } from "react";

const CTABanner = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]" dir="rtl">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div
        ref={ref}
        className="card-enter relative max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col items-center text-center"
      >
        <h2 className="text-white text-[36px] md:text-[52px] font-bold mb-4 leading-tight">
          تسوق الآن
        </h2>
        <p className="text-white/50 text-[16px] md:text-[18px] mb-10 max-w-[400px]">
          اكتشف أحدث المنتجات بأفضل الأسعار
        </p>
        <button className="group bg-white text-[#0a0a0a] text-[16px] font-semibold px-10 py-4 rounded-full hover:bg-white/90 active:scale-[0.97] transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]">
          تصفح المنتجات
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
