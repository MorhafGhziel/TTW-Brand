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

/**
 * Overlay state that several unrelated components need: the navbar opens the
 * search and the mobile menu, the overlays close themselves, and Escape closes
 * whichever is open. Kept apart from the cart so neither re-renders the other.
 */
interface UIContextValue {
  searchOpen: boolean;
  menuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openSearch = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!searchOpen && !menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSearchOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, menuOpen]);

  const value = useMemo(
    () => ({
      searchOpen,
      menuOpen,
      openSearch,
      closeSearch,
      toggleMenu,
      closeMenu,
    }),
    [searchOpen, menuOpen, openSearch, closeSearch, toggleMenu, closeMenu]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
