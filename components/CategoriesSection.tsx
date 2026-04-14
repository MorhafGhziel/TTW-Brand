"use client";

import { useRef, useEffect } from "react";

const categories = [
  { name: "تيشيرتات", icon: "M20 4H4v16h16V4z" },
  { name: "هوديز", icon: "M12 2L2 7v15h20V7L12 2z" },
  { name: "بناطيل", icon: "M6 2h12v20H6z" },
  { name: "جاكيتات", icon: "M4 4h16v16H4z" },
  { name: "أطقم", icon: "M3 3h18v18H3z" },
  { name: "اكسسوارات", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z" },
];

const CategoriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-[#f0f0f0]" dir="rtl">
      <div
        ref={sectionRef}
        className="card-enter max-w-[1280px] mx-auto px-6 md:px-10"
      >
        {/* Section Title */}
        <h2 className="text-[32px] md:text-[40px] font-bold text-[#0a0a0a] text-center mb-14">
          التصنيفات
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-square bg-[#e6e6e6] rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e8] to-[#d8d8d8] group-hover:from-[#0a0a0a] group-hover:to-[#1a1a1a] transition-all duration-500" />
                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[32px] font-bold text-black/[0.06] group-hover:text-white/10 transition-colors duration-500 tracking-wider select-none">
                    Abyss
                  </span>
                </div>
              </div>
              <p className="text-[15px] font-semibold text-[#2a2a2a] mt-3 text-center group-hover:text-[#0a0a0a] transition-colors duration-300">
                {cat.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
