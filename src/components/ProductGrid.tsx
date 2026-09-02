import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

/**
 * Tight editorial grid. The 1px gap is the page background showing through,
 * so the cards read as one block cut into panels rather than as floating tiles.
 */
const ProductGrid = ({
  products,
  eagerCount = 3,
  columns = 3,
}: {
  products: Product[];
  /** How many images load eagerly. Set to 0 below the fold. */
  eagerCount?: number;
  columns?: 3 | 4;
}) => (
  <div
    className={`grid grid-cols-1 gap-px bg-line md:grid-cols-2 ${
      columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
    }`}
  >
    {products.map((product, i) => (
      <ProductCard
        key={product.id}
        product={product}
        priority={i < eagerCount}
      />
    ))}
  </div>
);

export default ProductGrid;
