import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";
import type { CategorySlug } from "@/lib/types";
import ShopView from "@/components/ShopView";

// Static segments (/product, /checkout) take priority over this dynamic one,
// so only real category slugs reach here.
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

type Params = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  return { title: category.name, description: category.tagline };
}

export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.slug as CategorySlug);

  return (
    <section className="mx-auto max-w-[var(--max)] px-5 pt-28 pb-24 md:px-8 md:pt-32 md:pb-32">
      <header className="mb-12 border-b border-line pb-10">
        <h1 className="h-section">{category.name}</h1>
        <p className="mt-4 max-w-[46ch] text-[0.9375rem] text-text-2">
          {category.tagline}
        </p>
      </header>

      <ShopView products={products} lockedCategory={category.slug} />
    </section>
  );
}
