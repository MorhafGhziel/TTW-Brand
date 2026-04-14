import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../../components/Header";
import { CartProvider } from "../../components/CartContext";
import CartDrawer from "../../components/CartDrawer";
import SmoothScroll from "../../components/SmoothScroll";

const intraNet = localFont({
  src: [
    {
      path: "../../public/Fonts/IntraNet-Typeface/IntraNet/IntraNetRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/IntraNet-Typeface/IntraNet/IntraNetOutline.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-intranet",
  display: "swap",
});

const ibmPlexArabic = localFont({
  src: [
    {
      path: "../../public/Fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-ibm-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abyss",
  description: "علامة أزياء سعودية تجمع بين الثقة والأناقة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${intraNet.variable} ${ibmPlexArabic.variable} antialiased bg-[#0a0a0a]`}
        style={{ fontFamily: `${ibmPlexArabic.style.fontFamily}, Arial, Helvetica, sans-serif` }}
      >
        <CartProvider>
          <SmoothScroll />
          <Header />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
