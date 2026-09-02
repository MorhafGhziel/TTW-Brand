/**
 * Domain types for the ABYSS storefront.
 *
 * These mirror the shape we expect the future API to return. Keeping them in
 * one place means the swap from mock data to real endpoints is a change in
 * `products.ts` only — no component needs to know where the data came from.
 */

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Colorway {
  /** Stable key used in URLs and cart line items. */
  id: string;
  /** Arabic display name, e.g. "أسود". */
  name: string;
  /** CSS colour used for the swatch. */
  hex: string;
}

export type CategorySlug =
  | "new"
  | "jackets"
  | "tees"
  | "pants"
  | "accessories"
  | "footwear"
  | "sale";

export interface Category {
  slug: CategorySlug;
  /** Arabic label shown in navigation and on the category card. */
  name: string;
  /** Short Arabic line used as the listing page subtitle. */
  tagline: string;
  /** Card image on the browse rail. Omitted for the utility categories. */
  image?: string;
}

export interface Product {
  id: number;
  /** URL segment, latin, kebab-case. */
  slug: string;
  /** Arabic product name. */
  name: string;
  /** Latin sub-label shown under the name — brand texture, not translation. */
  subtitle: string;
  /** Price in SAR. */
  price: number;
  /** Original price when discounted. */
  oldPrice?: number;
  categories: CategorySlug[];
  sizes: Size[];
  colors: Colorway[];
  images: string[];
  /** Arabic paragraph for the product page. */
  description: string;
  /** Arabic bullet points: fabric, fit, care. */
  details: string[];
  /** Part of the current drop — drives the NEW DROP grid. */
  isNew?: boolean;
  /** Drives the bestsellers carousel. */
  isBestseller?: boolean;
  /** Out of stock sizes, by size key. */
  soldOutSizes?: Size[];
}

/** A single line in the cart. Size and colour are part of its identity. */
export interface CartLine {
  /** Composite key: `${productId}-${size}-${colorId}`. */
  key: string;
  productId: number;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  size: Size;
  color: Colorway;
  image: string;
  quantity: number;
}

/** One frame in the lookbook triptych. */
export interface LookbookShot {
  src: string;
  /** Arabic alt text. */
  alt: string;
}
