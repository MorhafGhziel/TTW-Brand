"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";
import {
  calculateTotals,
  isValidEmail,
  isValidSaudiPhone,
  placeOrder,
  type ShippingDetails,
} from "@/lib/orders";

const CITIES = [
  "الرياض",
  "جدة",
  "الدمام",
  "مكة المكرمة",
  "المدينة المنورة",
  "الخبر",
  "أبها",
  "تبوك",
  "الطائف",
  "بريدة",
];

type Errors = Partial<Record<keyof ShippingDetails, string>>;

const emptyForm: ShippingDetails = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const { lines, subtotal, savings, clearCart, hydrated } = useCart();

  const [form, setForm] = useState<ShippingDetails>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const totals = useMemo(() => calculateTotals(subtotal), [subtotal]);

  const update = (field: keyof ShippingDetails, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const validate = (): boolean => {
    const next: Errors = {};

    if (form.fullName.trim().length < 3) next.fullName = "اكتب اسمك كامل";
    if (!isValidSaudiPhone(form.phone))
      next.phone = "رقم الجوال مو صحيح — مثال: 0501234567";
    if (!isValidEmail(form.email)) next.email = "الإيميل مو صحيح";
    if (!form.city) next.city = "اختر مدينتك";
    if (form.address.trim().length < 8) next.address = "اكتب العنوان بالتفصيل";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailed(false);
    if (!validate()) {
      document
        .querySelector("[data-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const result = await placeOrder({
        lines,
        shipping: form,
        subtotal,
        shippingCost: totals.shippingCost,
        vat: totals.vat,
        total: totals.total,
      });
      setOrderId(result.orderId);
      clearCart();
    } catch {
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Confirmation ─────────────────────────────────────────────── */
  if (orderId) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[var(--max)] flex-col items-center justify-center px-5 py-24 text-center md:px-8">
        <p className="meta mb-6 text-text-3">وصلنا طلبك</p>
        <h1 className="h-section mb-4">يعطيك العافية</h1>
        <p className="mb-2 max-w-[42ch] leading-relaxed text-text-2">
          بنكلمك على {form.phone} نأكد الطلب ونتفق على وقت التوصيل.
        </p>
        <p className="data mb-10 text-[0.875rem] text-text-3">
          رقم طلبك: <span className="text-text">{orderId}</span>
        </p>
        <Link
          href="/"
          className="btn-solid text-[0.9375rem]"
        >
          ارجع للمتجر
        </Link>
      </div>
    );
  }

  /* ── Empty ────────────────────────────────────────────────────── */
  if (hydrated && lines.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[var(--max)] flex-col items-center justify-center px-5 text-center md:px-8">
        <h1 className="h-section mb-4">السلة فاضية</h1>
        <p className="mb-10 text-text-2">ضف قطعة وحدة على الأقل قبل ما تدفع.</p>
        <Link
          href="/"
          className="btn-solid text-[0.9375rem]"
        >
          شوف الدروب
        </Link>
      </div>
    );
  }

  const field =
    "w-full border-b border-line bg-transparent py-3 text-[0.9375rem] outline-none transition-colors placeholder:text-text-3 focus:border-text";

  return (
    <div className="mx-auto max-w-[var(--max)] px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-24">
      <h1 className="h-section mb-12">إتمام الطلب</h1>

      <form onSubmit={submit} noValidate className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        {/* Details */}
        <div className="space-y-12">
          <section>
            <h2 className="meta mb-6 text-text-3">معلومات التواصل</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div data-error={Boolean(errors.fullName)} className="sm:col-span-2">
                <input
                  className={field}
                  placeholder="اسمك الكامل"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && (
                  <p className="mt-2 text-[0.75rem] text-error">{errors.fullName}</p>
                )}
              </div>

              <div data-error={Boolean(errors.phone)}>
                <input
                  className={field}
                  placeholder="رقم جوالك"
                  inputMode="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p className="mt-2 text-[0.75rem] text-error">{errors.phone}</p>
                )}
              </div>

              <div data-error={Boolean(errors.email)}>
                <input
                  className={field}
                  placeholder="إيميلك"
                  inputMode="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-2 text-[0.75rem] text-error">{errors.email}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="meta mb-6 text-text-3">عنوان الشحن</h2>

            <div className="grid gap-6">
              <div data-error={Boolean(errors.city)}>
                <select
                  className={`${field} cursor-pointer`}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  aria-invalid={Boolean(errors.city)}
                >
                  <option value="">اختر مدينتك</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-2 text-[0.75rem] text-error">{errors.city}</p>
                )}
              </div>

              <div data-error={Boolean(errors.address)}>
                <textarea
                  className={`${field} min-h-24 resize-none`}
                  placeholder="الحي، الشارع، رقم المبنى"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  aria-invalid={Boolean(errors.address)}
                />
                {errors.address && (
                  <p className="mt-2 text-[0.75rem] text-error">{errors.address}</p>
                )}
              </div>

              <textarea
                className={`${field} min-h-16 resize-none`}
                placeholder="ملاحظات للمندوب (اختياري)"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h2 className="meta mb-6 text-text-3">الدفع</h2>
            <div className="border border-line p-5">
              <p className="mb-1 text-[0.9375rem]">الدفع عند الاستلام</p>
              <p className="text-[0.8125rem] leading-relaxed text-text-2">
                تدفع كاش أو بالشبكة لما يوصلك الطلب. الدفع الإلكتروني (مدى،
                Apple&nbsp;Pay، تمارا) بينزل قريب.
              </p>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-line">
            <h2 className="meta border-b border-line px-5 py-4 text-text-3">ملخّص الطلب</h2>

            <ul className="max-h-80 overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 border-b border-line py-4 last:border-b-0">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-elevated">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="data absolute top-0 start-0 bg-text px-1.5 py-0.5 text-[0.625rem] text-abyss">
                      {line.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.8125rem]">{line.name}</p>
                    <p className="mt-1 text-[0.75rem] text-text-3">
                      {line.color.name} · {line.size}
                    </p>
                  </div>

                  <span className="data text-[0.8125rem]">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-line px-5 py-4 text-[0.8125rem]">
              <div className="flex justify-between text-text-2">
                <span>المجموع</span>
                <span className="data">{formatPrice(subtotal)} ر.س</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-text-2">
                  <span>وفّرت</span>
                  <span className="data">−{formatPrice(savings)} ر.س</span>
                </div>
              )}

              <div className="flex justify-between text-text-2">
                <span>الشحن</span>
                <span className="data">
                  {totals.shippingCost === 0
                    ? "مجاني"
                    : `${formatPrice(totals.shippingCost)} ر.س`}
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <span className="text-[0.9375rem] text-text">الإجمالي</span>
                <span className="data text-[1.25rem] font-bold">
                  {formatPrice(totals.total)} ر.س
                </span>
              </div>

              <p className="text-[0.6875rem] text-text-3">
                شامل ضريبة القيمة المضافة {formatPrice(totals.vat)} ر.س
              </p>
            </div>
          </div>

          {failed && (
            <p className="mt-4 border border-error p-4 text-[0.8125rem]">
              ما قدرنا نرسل الطلب. جرّب مرة ثانية.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-solid mt-5 w-full text-[0.9375rem]"
          >
            {submitting ? "جاري الإرسال…" : "أكّد الطلب"}
          </button>

          <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-text-3">
            بتأكيدك للطلب أنت موافق على سياسة التبديل والإرجاع.
          </p>
        </aside>
      </form>
    </div>
  );
}
