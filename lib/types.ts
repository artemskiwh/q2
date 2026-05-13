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
  /** Tailwind classes used to render the gradient card image */
  imageStyle: {
    from: string;
    via?: string;
    to: string;
    accent?: string;
  };
}

export interface CartLine {
  slug: string;
  variant?: string;
  qty: number;
}
