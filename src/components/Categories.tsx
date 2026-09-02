import Image from "next/image";
import Link from "next/link";
import { getBrowseCategories } from "@/lib/products";

/**
 * Category rail. A snap-scrolling row on touch, five full-bleed columns on
 * desktop. The names carry the section, so there is no heading above it.
 */
const Categories = () => {
  const items = getBrowseCategories();

  return (
    <section
      aria-label="تصفّح حسب الفئة"
      className="border-y border-line bg-abyss"
    >
      <div className="rail flex snap-x snap-mandatory gap-px overflow-x-auto bg-line lg:grid lg:grid-cols-5 lg:overflow-visible">
        {items.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="group duotone duotone-deep relative aspect-3/4 w-[68vw] shrink-0 snap-start overflow-hidden bg-elevated sm:w-[42vw] lg:aspect-[3/5] lg:w-auto"
          >
            {category.image && (
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, 20vw"
                className="object-cover object-[center_28%] transition-transform duration-700 ease-[var(--ease)] group-hover:scale-105"
              />
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0)_62%)]"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <span className="link-underline font-kufi inline-block text-[1.375rem] leading-tight font-bold text-text">
                {category.name}
              </span>
              <p className="mt-1.5 text-[0.8125rem] text-text-2">
                {category.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
