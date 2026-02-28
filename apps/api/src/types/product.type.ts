import Decimal from 'decimal.js';
import { Promotion } from '@/utils/price';

type ProductDetails = {
  description: string;
  material: string | null;
  feature: string | null;
  weight: number;
  length: number | null;
  width: number | null;
  height: number | null;
  volume: number | null;
  care: string | null;
};

export type InsertProduct = {
  name: string;
  brandId: number;
  basePrice: number;
  sizingGuideId: number | null;
  productDetails: ProductDetails;
  productAttributes: { attributeId: number; imageBased: boolean }[];
  productCategories: number[];
  productTags: number[];
  images: { url: string; attributeValueId: number | null }[];
  productVariants: {
    barcode: string | null;
    basePrice: number;
    stock: number;
    attributeValueId: number[];
  }[];
};

export type Price = {
  finalPrice: string;
  discountApplied: string | null;
  discountPercentage: string | null;
  hasDiscount: boolean;
  appliedPromotions: Promotion[] | [];
};

export type AllProductsResponse = {
  name: string;
  price: Price;
  slug: string;
  brand: string;
  variants: (string | null)[];
  categories: (string | undefined)[];
  tags: string[];
  images: string[];
};

export type OneProductResponse = {
  id: number;
  name: string;
  brand: string;
  categories: (string | undefined)[];
  tags: string[];
  productDetails: ProductDetails | null;
  images: { attributeId: number | null; url: string }[];
  variants: {
    id: number;
    sku: string;
    basePrice: string;
    price: Price;
    stock: number;
    inStock: boolean;
    attributes: {
      id: number;
      value: string;
      hexUrl: string | null;
    }[];
  }[];
};
