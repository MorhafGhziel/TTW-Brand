"use client";

import { useRef, useEffect } from "react";

const badges = [
  {
    title: "تسوق بثقة",
    description: "حماية كاملة لطلبك من البداية للنهاية",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "دفع آمن",
    description: "خيارات دفع متعددة ومشفّرة بالكامل",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "جودة مضمونة",
    description: "منتجات مختارة بعناية وأصلية 100%",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
  {
    title: "دعم متواصل",
    description: "فريق دعم جاهز لمساعدتك في أي وقت",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

const TrustBadges = () => {
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
    <section className="py-16 bg-white border-t border-[#f0f0f0]" dir="rtl">
      <div
        ref={ref}
        className="card-enter max-w-[1280px] mx-auto px-6 md:px-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-right"
            >
              <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0 text-[#0a0a0a]">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-[#0a0a0a] mb-1">
                  {badge.title}
                </h4>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
