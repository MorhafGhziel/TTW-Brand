import Link from "next/link";
import { getBrowseCategories } from "@/lib/products";
import Wordmark from "./Wordmark";

const SERVICE_LINKS = [
  { href: "/#manifesto", label: "الشحن والإرجاع" },
  { href: "/#manifesto", label: "الأسئلة الشائعة" },
  { href: "/#manifesto", label: "سياسة الخصوصية" },
  { href: "/#manifesto", label: "تواصل معنا" },
];

/* Set as words rather than logos: we don't hold the marks, and a row of
   redrawn brand icons would be both wrong and off-register with the type. */
const PAYMENTS = ["MADA", "VISA", "MASTERCARD", "APPLE PAY", "TABBY"];

const SOCIALS = [
  { href: "https://instagram.com", label: "INSTAGRAM" },
  { href: "https://tiktok.com", label: "TIKTOK" },
  { href: "https://x.com", label: "X" },
];

const browseCategories = getBrowseCategories();

const Footer = () => (
  <footer className="border-t border-line bg-abyss">
    <div className="mx-auto max-w-[var(--max)] px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Wordmark className="h-9" />
          <p className="font-kufi mt-5 text-[1.0625rem] font-bold text-text-2">
            أعمق من الموضة
          </p>
          <p className="mt-3 max-w-[28ch] text-[0.875rem] text-text-2">
            مصمّم في الرياض. يُشحن إلى السعودية والإمارات والكويت. كل إصدار
            يُطبع مرة واحدة، وما ينفد لا يعود.
          </p>
        </div>

        <nav aria-labelledby="footer-cats">
          <h2 id="footer-cats" className="meta mb-5 text-text-3">
            الفئات
          </h2>
          <ul className="flex flex-col gap-3">
            {browseCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="link-underline text-[0.875rem] text-text-2"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-service">
          <h2 id="footer-service" className="meta mb-5 text-text-3">
            خدمة العملاء
          </h2>
          <ul className="flex flex-col gap-3">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="link-underline text-[0.875rem] text-text-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-social">
          <h2 id="footer-social" className="meta mb-5 text-text-3">
            تابعنا
          </h2>
          <ul className="flex flex-col gap-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline data text-[0.75rem] tracking-[0.2em] text-text-2"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>

    <div className="border-t border-line">
      <div className="mx-auto flex max-w-[var(--max)] flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-[0.75rem] text-text-3">
          © ٢٠٢٦ ABYSS. جميع الحقوق محفوظة.
        </p>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {PAYMENTS.map((method) => (
            <li
              key={method}
              className="data border border-line px-2.5 py-1.5 text-[0.625rem] tracking-[0.14em] text-text-3"
            >
              {method}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
