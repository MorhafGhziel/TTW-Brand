"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-[#0a0a0a]" dir="rtl">
      {/* ── Logo & Payment Center ── */}
      <div className="border-t border-[#f0f0f0]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-12 flex flex-col items-center gap-7">
          <Link href="/">
            <Image
              src="/icons/Abyss-Logo.svg"
              alt="Abyss Brand"
              width={160}
              height={160}
              className="object-contain max-h-[5rem]"
            />
          </Link>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            {["الرئيسية", "المنتجات", "من نحن", "اتصل بنا"].map((link) => (
              <Link key={link} href="#" className="text-[14px] text-[#888] hover:text-[#0a0a0a] transition-colors duration-300">
                {link}
              </Link>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2.5">
            {["Visa", "Mastercard", "مدى", "Apple Pay", "تمارا"].map((m) => (
              <span
                key={m}
                className="text-[12px] text-[#666] bg-[#f5f5f5] px-3.5 py-2 rounded-lg border border-[#e8e8e8]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-[#f0f0f0]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#bbb]">
            &copy; {new Date().getFullYear()} Abyss. جميع الحقوق محفوظة
          </span>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {[
              { label: "Instagram", d: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" },
              { label: "X", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              { label: "TikTok", d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.4a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.17V11.4a4.85 4.85 0 01-2-.71z" },
              { label: "Snap", d: "M12.2.8c1 0 4.3.3 5.9 3.8.5 1.2.4 3.2.3 4.8v.6c.1 0 .2.1.4.1.3 0 .7-.1.9-.2l.3-.1c.3-.1.5 0 .7.1.2.2.4.5.4.7 0 .5-.5.9-.8 1.1l-.1.1c-.2.1-.5.3-.7.5-.1.1-.3.4-.3.6 0 .1 0 .2.1.3.2.6.5 1.1.8 1.6.5.7 1.1 1.2 1.8 1.6.3.2.6.3.9.4.2.1.3.1.4.2.2.1.3.3.3.5 0 .2-.1.3-.3.5-.4.3-1.1.5-1.7.7 0 0-.1.1-.1.1-.1.2-.1.4-.5.4-.2 0-.4 0-.7-.1-.4-.1-.9-.2-1.4.1-.5.3-1 .7-1.5 1-.7.6-1.4 1.1-2.5 1.1s-1.8-.5-2.5-1.1c-.5-.4-1-.7-1.5-1-.5-.2-1-.2-1.4-.1-.3.1-.5.1-.7.1-.4 0-.4-.2-.5-.4 0-.1-.1-.1-.1-.1-.6-.1-1.2-.3-1.7-.7-.2-.1-.3-.3-.3-.5 0-.2.1-.4.3-.5.1 0 .2-.1.4-.2.3-.1.6-.3.9-.4.7-.4 1.3-1 1.8-1.6.3-.5.6-1 .8-1.6 0-.1.1-.2.1-.3 0-.3-.2-.5-.3-.6-.2-.2-.5-.4-.7-.5l-.1-.1c-.3-.2-.8-.6-.8-1.1 0-.3.1-.6.3-.7.2-.2.4-.2.8-.1l.3.1c.3.1.6.2.9.2.2 0 .3 0 .4-.1v-.6c-.1-1.6-.2-3.6.3-4.8C7.9 1.1 11.2.8 12.2.8z" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-[#e8e8e8] flex items-center justify-center hover:bg-[#0a0a0a] hover:border-[#0a0a0a] transition-all duration-300 group/social"
                aria-label={s.label}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-[#999] group-hover/social:text-white transition-colors duration-300">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
