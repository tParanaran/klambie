import Decimal from 'decimal.js';
import { AppliedPromotion } from './promotion.type';

export type Category = {
  categoriesId: number[];
  categoriesName: { name: string; slug: string }[];
};

export type Tag = {
  tagsId: number[];
  tagsName: { name: string; slug: string }[];
};

export type Brand = {
  brandId: number;
  brandName: { name: string; slug: string };
};

export type VariantImages = {
  url: string;
  attributeId: number | null;
};

export type Images = {
  images: string[];
  variantImages: VariantImages[];
};

type ProductDetails = {
  description: string;
  material?: string | null;
  feature?: string | null;
  weight: number;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  volume?: number | null;
  care?: string | null;
};

export type InsertProduct = {
  name: string;
  brandId: number;
  basePrice: number;
  sizingGuideId?: number | null;
  productDetails: ProductDetails;
  productAttributes: { attributeId: number; imageBased: boolean }[];
  productCategories: number[];
  productTags?: number[];
  images: { url: string; attributeValueId: number | null }[];
  productVariants: {
    barcode?: string | null;
    basePrice: number;
    stock: number;
    attributeValueId: number[];
  }[];
};

export type Price = {
  originalPrice: Decimal;
  finalPrice: Decimal;
  discountApplied: Decimal;
  discountPercentage: Decimal;
};

export type PromoResult = {
  productVariantId: number;
  appliedPromotion?: AppliedPromotion[];
  hasDiscount: boolean;
  price: Price;
};

export type Products = {
  name: string;
  appliedPromotion?: AppliedPromotion[];
  hasDiscount: boolean;
  price: Price;
  slug: string;
  brand: { name: string; slug: string };
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
  images?: string[];
  hexUrl?: string[];
};

export type VariantProduct = {
  id: number;
  sku: string;
  price: Price;
  appliedPromotion?: AppliedPromotion[];
  hasDiscount: boolean;
  availableStock: number;
  inStock: boolean;
  attributes: {
    id: number;
    value: string;
    hexUrl?: string | null;
    attribute: {
      id: number;
      name: string;
    };
  }[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  brand: { name: string; slug: string };
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
  productDetails: ProductDetails | null;
  images?: { attributeId?: number | null; url: string }[];
  attributes: { id: number; name: string }[];
  variants?: VariantProduct[];
};

export type Filters = {
  id: number;
  name: string;
  slug: string;
  level?: number;
  subcategories: Filters[];
};

export type GetAllProducts = {
  slugs: string[];
  tag?: string;
  user?: number;
  includeDescendants?: boolean;
  brands?: string[];
  attributeIds?: number[];
  categoryIds?: number[];
  sort?: string;
  order?: string;
};
