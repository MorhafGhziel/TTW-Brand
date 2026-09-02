import Link from "next/link";
import Marquee from "./Marquee";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
import { getNewDrop } from "@/lib/products";

/**
 * The current drop. The marquee is the section's texture title; a quiet header
 * gives first-time visitors the context the band alone can't carry.
 */
const NewDrop = async () => {
  const products = await getNewDrop(6);

  return (
    <section id="new-drop" className="scroll-mt-16">
      <Marquee latin="NEW DROP" arabic="تشكيلة جديدة" />

      <div className="mx-auto max-w-[var(--max)] px-5 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
        <Reveal>
          <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta mb-3 text-text-3">هذا الأسبوع</p>
              <div className="flex items-baseline gap-4">
                <h2 className="h-section">الإصدار الجديد</h2>
                <span className="outline-type hidden text-[2.5rem] text-[#3a3a3a] md:inline">
                  DROP 01
                </span>
              </div>
            </div>

            <Link
              href="/new"
              className="link-underline data text-[0.75rem] tracking-[0.2em] text-text-2"
            >
              عرض التشكيلة كاملة
            </Link>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <ProductGrid products={products} eagerCount={0} />
        </Reveal>
      </div>
    </section>
  );
};

export default NewDrop;
