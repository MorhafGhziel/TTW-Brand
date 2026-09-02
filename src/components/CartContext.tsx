"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Colorway, Product, Size } from "@/lib/types";

const STORAGE_KEY = "abyss-cart-v2";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  /** False until localStorage has been read, so the UI can avoid flashing an empty cart. */
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (product: Product, size: Size, color: Colorway, quantity?: number) => void;
  removeLine: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  /** Sum of `oldPrice - price` across the cart, for the savings line. */
  savings: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};

const lineKey = (productId: number, size: Size, colorId: string) =>
  `${productId}-${size}-${colorId}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Read once on mount. Until this runs, `lines` is empty but not authoritative.
  //
  // This has to happen in an effect, not in a useState initialiser: the server
  // renders an empty cart, so reading localStorage during the first client
  // render would produce a hydration mismatch. Consumers gate on `hydrated`
  // instead of trusting an empty `lines`.
  /* eslint-disable react-hooks/set-state-in-effect -- see note above */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setLines(parsed as CartLine[]);
      }
    } catch {
      // Corrupt or unavailable storage: start empty rather than crash.
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist only after hydration — writing first would clobber the saved cart.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private mode / quota exceeded. The cart still works for this session.
    }
  }, [lines, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addLine = useCallback(
    (product: Product, size: Size, color: Colorway, quantity = 1) => {
      const key = lineKey(product.id, size, color.id);

      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, quantity: l.quantity + quantity } : l
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            size,
            color,
            image: product.images[0],
            quantity,
          },
        ];
      });

      setIsOpen(true);
    },
    []
  );

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity } : l))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const { totalItems, subtotal, savings } = useMemo(() => {
    return lines.reduce(
      (acc, l) => {
        acc.totalItems += l.quantity;
        acc.subtotal += l.price * l.quantity;
        if (l.oldPrice) acc.savings += (l.oldPrice - l.price) * l.quantity;
        return acc;
      },
      { totalItems: 0, subtotal: 0, savings: 0 }
    );
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      hydrated,
      openCart,
      closeCart,
      addLine,
      removeLine,
      setQuantity,
      clearCart,
      totalItems,
      subtotal,
      savings,
    }),
    [
      lines,
      isOpen,
      hydrated,
      openCart,
      closeCart,
      addLine,
      removeLine,
      setQuantity,
      clearCart,
      totalItems,
      subtotal,
      savings,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
