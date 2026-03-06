import Decimal from 'decimal.js';
import { AppliedPromotion } from './promotion.type';

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
  productTags: number[];
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

export type AllProductsResponse = {
  name: string;
  appliedPromotion?: AppliedPromotion[];
  hasDiscount: boolean;
  price: Price;
  slug: string;
  brand: string;
  variants: string[];
  categories: string[];
  tags: { name: string; slug: string }[];
  images: string[];
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

export type OneProductResponse = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categories: string[];
  tags: { name: string; slug: string }[];
  productDetails: ProductDetails | null;
  images: { attributeId?: number | null; url: string }[];
  attributes: { id: number; name: string }[];
  variants: VariantProduct[];
};
