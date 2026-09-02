import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Noto_Kufi_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { UIProvider } from "@/components/UIContext";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

/* ── Type ──────────────────────────────────────────────────────────────
   IntraNet is the brand's own latin face and carries the wordmark and
   section numerals. Its Outline cut is loaded as a separate family
   because outline is a different drawing, not a lighter weight. */

const intranet = localFont({
  src: "../../public/Fonts/IntraNet-Typeface/IntraNet/IntraNetRegular.otf",
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

const intranetOutline = localFont({
  src: "../../public/Fonts/IntraNet-Typeface/IntraNet/IntraNetOutline.otf",
  variable: "--font-outline",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

/* Angular kufic for arabic headlines — it shares the geometry of the
   site's hard-edged rectangles in a way a rounded geometric sans doesn't. */
const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-kufi",
  display: "swap",
});

/* Humanist arabic for running text, and its latin covers prices and sizes. */
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abyss.sa"),
  title: {
    default: "ABYSS | أعمق من الموضة",
    template: "%s | ABYSS",
  },
  description:
    "تشكيلة أزياء عصرية من الرياض. ملابس بكميات محدودة تُطبع مرة واحدة. جاكيتات، تيشيرتات، بناطيل، وإكسسوارات بجودة عالية.",
  keywords: [
    "أبيس",
    "ملابس",
    "أزياء",
    "تشكيلة",
    "ستريت وير",
    "ABYSS",
    "رياض",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "ABYSS",
    title: "ABYSS | أعمق من الموضة",
    description:
      "تشكيلة أزياء عصرية من الرياض. ملابس بكميات محدودة تُطبع مرة واحدة.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${intranet.variable} ${intranetOutline.variable} ${kufi.variable} ${tajawal.variable} bg-abyss text-text antialiased`}
      >
        <CartProvider>
          <UIProvider>
            <SmoothScroll />
            <Navbar />
            <main id="top">{children}</main>
            <Newsletter />
            <Footer />
            <CartDrawer />
            <SearchOverlay />
          </UIProvider>
        </CartProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
