export type Category =
  | "disposable"
  | "pod"
  | "cartridge"
  | "sale"
  | "liquid"
  | "accessory";

export interface ProductVariant {
  label: string;
  price: number;
  bulkPrice?: number;
  note?: string;
}

export interface Product {
  slug: string;
  brand: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isHot?: boolean;
  isSale?: boolean;
  shortDesc?: string;
  description?: string;
  tags?: string[];
  flavors?: string[];
  variants?: ProductVariant[];
  puffs?: number;
  strength?: string;
  features?: string[];
  /** Real product photo path under /public, e.g. /products/elfbar.jpg.
   *  When set, takes precedence over the generated visual. */
  image?: string;
  /** Tailwind classes used to render the gradient card image */
  imageStyle: {
    from: string;
    via?: string;
    to: string;
    accent?: string;
  };
  /** Visual shape hint to render generated SVG */
  shape?: "stick" | "box" | "pod" | "cart";
}

export interface CartLine {
  slug: string;
  variant?: string;
  qty: number;
}
