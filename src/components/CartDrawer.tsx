"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/orders";

/**
 * Cart panel.
 *
 * It enters from the left because the page is right-to-left: the drawer comes
 * from the side the reader's eye leaves, not the side it starts on.
 */
const CartDrawer = () => {
  const {
    lines,
    isOpen,
    closeCart,
    removeLine,
    setQuantity,
    subtotal,
    totalItems,
  } = useCart();

  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="سلة التسوق"
            className="fixed inset-y-0 left-0 z-[95] flex w-full max-w-md flex-col border-r border-line bg-surface"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-kufi text-[1.125rem] font-bold">
                سلة التسوق
                {totalItems > 0 && (
                  <span className="data ms-2 text-[0.875rem] font-normal text-text-3">
                    {totalItems}
                  </span>
                )}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label="إغلاق السلة"
                className="text-text transition-colors hover:text-chrome"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-5 px-5">
                <p className="font-kufi text-[1.25rem] font-bold">سلتك فارغة</p>
                <p className="max-w-[30ch] text-[0.9375rem] text-text-2">
                  ابدأ من التشكيلة الجديدة — ستة قطع نزلت هذا الأسبوع.
                </p>
                <Link
                  href="/#new-drop"
                  onClick={closeCart}
                  className="btn-line text-[0.875rem]"
                >
                  تصفّح التشكيلة
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="relative aspect-3/4 w-20 shrink-0 overflow-hidden bg-elevated"
                      >
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover saturate-[0.85]"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-kufi text-[0.9375rem] leading-snug font-bold">
                            <Link href={`/product/${line.slug}`} onClick={closeCart}>
                              {line.name}
                            </Link>
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            aria-label={`احذف ${line.name} من السلة`}
                            className="shrink-0 text-text-3 transition-colors hover:text-error"
                          >
                            <X size={15} strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="data mt-1 text-[0.6875rem] tracking-[0.12em] text-text-3">
                          {line.size} · {line.color.name}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                              aria-label="إنقاص الكمية"
                              className="p-2 text-text-2 transition-colors hover:text-text"
                            >
                              <Minus size={13} strokeWidth={1.5} />
                            </button>
                            <span className="data w-8 text-center text-[0.8125rem]">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity + 1)}
                              aria-label="زيادة الكمية"
                              className="p-2 text-text-2 transition-colors hover:text-text"
                            >
                              <Plus size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <span className="data text-[0.875rem]">
                            {formatPrice(line.price * line.quantity)} ر.س
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-line px-5 py-5">
                  <div className="mb-3">
                    {remaining > 0 ? (
                      <>
                        <p className="mb-2 text-[0.75rem] text-text-2">
                          أضف{" "}
                          <span className="font-bold text-text">
                            {formatPrice(remaining)} ر.س
                          </span>{" "}
                          ليصبح الشحن مجانياً
                        </p>
                        <div className="h-px bg-elevated">
                          <div
                            className="h-px bg-chrome transition-[width] duration-700 ease-[var(--ease)]"
                            style={{
                              width: `${
                                Math.min(
                                  100,
                                  Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
                                )
                              }%`,
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <p className="mb-2 text-[0.75rem] text-text-2">
                        <span className="font-bold text-text">
                          الشحن مجاني
                        </span>{" "}
                        على هذا الطلب
                      </p>
                    )}
                  </div>

                  <div className="mb-5 flex items-baseline justify-between border-t border-line pt-4">
                    <span className="text-[0.9375rem] text-text-2">
                      المجموع الفرعي
                    </span>
                    <span className="data text-[1.0625rem]">
                      {formatPrice(subtotal)} ر.س
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-solid w-full text-[0.9375rem]"
                  >
                    إتمام الشراء
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
