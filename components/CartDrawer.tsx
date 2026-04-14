"use client";

import { useCart } from "./CartContext";
import { useEffect } from "react";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[420px] bg-white z-[70] shadow-[-8px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <h2 className="text-[20px] font-bold text-[#0a0a0a]">
            سلة التسوق
            {totalItems > 0 && (
              <span className="text-[14px] font-normal text-[#999] mr-2">
                ({totalItems})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors duration-200 cursor-pointer"
            aria-label="إغلاق"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666]">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ccc]">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
              </div>
              <p className="text-[16px] text-[#999]">سلتك فارغة</p>
              <button
                onClick={closeCart}
                className="text-[14px] font-semibold text-[#0a0a0a] underline underline-offset-4 hover:no-underline cursor-pointer"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#fafafa] border border-[#f0f0f0]"
                >
                  {/* Product image placeholder */}
                  <div className="w-20 h-24 rounded-lg bg-[#eee] flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-bold text-black/[0.06] select-none">
                      Abyss
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#2a2a2a] leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-[16px] font-bold text-[#0a0a0a]">
                          {item.price}
                        </span>
                        <span className="text-[12px] text-[#999]">ر.س</span>
                        {item.oldPrice && (
                          <span className="text-[12px] text-[#c0c0c0] line-through mr-1">
                            {item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-0 border border-[#e0e0e0] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#666] hover:bg-[#f0f0f0] transition-colors cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-[14px] font-semibold text-[#0a0a0a] border-x border-[#e0e0e0]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#666] hover:bg-[#f0f0f0] transition-colors cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ccc] hover:text-[#ef4444] hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        aria-label="حذف"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-center text-[13px] text-[#999] hover:text-[#ef4444] transition-colors duration-200 py-2 cursor-pointer"
              >
                مسح السلة
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#f0f0f0] px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#888]">المجموع الفرعي</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[20px] font-bold text-[#0a0a0a]">
                  {totalPrice}
                </span>
                <span className="text-[13px] text-[#999]">ر.س</span>
              </div>
            </div>

            <p className="text-[12px] text-[#aaa] text-center">
              الشحن والضرائب تُحسب عند الدفع
            </p>

            {/* Checkout button */}
            <button className="w-full h-12 bg-[#0a0a0a] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              إتمام الطلب
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l-7 7 7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
