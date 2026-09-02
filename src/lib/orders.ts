import type { CartLine } from "./types";

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
}

export interface OrderPayload {
  lines: CartLine[];
  shipping: ShippingDetails;
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
}

export interface OrderResult {
  orderId: string;
}

export const FREE_SHIPPING_THRESHOLD = 300;
export const SHIPPING_COST = 25;
export const VAT_RATE = 0.15;

export function calculateTotals(subtotal: number) {
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  // Saudi retail prices are quoted VAT-inclusive, so VAT is shown as the
  // portion already contained in the subtotal rather than added on top.
  const vat = Math.round(subtotal * (VAT_RATE / (1 + VAT_RATE)));
  const total = subtotal + shippingCost;

  return { shippingCost, vat, total };
}

/**
 * Submits an order.
 *
 * There is no backend yet. This resolves locally with a generated reference so
 * the full flow can be used and demoed end to end. When the API exists, replace
 * the body with the request — the signature and the call sites stay as they are:
 *
 *   const res = await fetch("/api/orders", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("ORDER_FAILED");
 *   return res.json();
 */
export async function placeOrder(payload: OrderPayload): Promise<OrderResult> {
  // Keeps the loading state honest instead of resolving in the same tick.
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (payload.lines.length === 0) throw new Error("EMPTY_CART");

  const ref = Math.random().toString(36).slice(2, 8).toUpperCase();
  return { orderId: `ABY-${ref}` };
}

/** Saudi mobile numbers: 05XXXXXXXX, or +9665XXXXXXXX. */
export function isValidSaudiPhone(value: string): boolean {
  const digits = value.replace(/[\s-]/g, "");
  return /^(?:\+?966|0)5\d{8}$/.test(digits);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
