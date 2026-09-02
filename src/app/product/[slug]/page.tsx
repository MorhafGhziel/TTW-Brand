import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(slug);

  return (
    <>
      <nav
        aria-label="مسار التنقل"
        className="mx-auto max-w-[var(--max)] px-5 pt-24 md:px-8 md:pt-28"
      >
        <ol className="flex items-center gap-2 text-[0.75rem] text-text-3">
          <li>
            <Link href="/" className="link-underline">
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-2">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-[var(--max)] px-5 pb-24 md:px-8 md:pb-32">
          <h2 className="h-sub mb-8">يُلبس معه</h2>
          <ProductGrid products={related} eagerCount={0} columns={4} />
        </section>
      )}
    </>
  );
}
