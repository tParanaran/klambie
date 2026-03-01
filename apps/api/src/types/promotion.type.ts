import Decimal from 'decimal.js';
import { PromotionRule } from 'generated/prisma/client';

type Product = {
  id: number;
  basePrice: Decimal;
  brandId: number;
  categoriesId: number[];
  tagsId: number[];
};

type VariantPrice = {
  basePrice: Decimal;
  stock: number;
  productVariantAttributes: {
    attributeValue: {
      hexUrl: string | null;
    };
  }[];
};

export type PriceInput = {
  productInfo: Product;
  user?: number;
  variants: VariantPrice[] | null;
};

export type GetPromotion = {
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  applyTo: 'PRODUCT' | 'BRAND' | 'CATEGORY' | 'ORDER' | 'TAG';
  name: string;
  code: string | null;
  value: Decimal;
  isActive: boolean;
  isStackable: boolean;
  isAutomatic: boolean;
  promotionRule: PromotionRule | null;
  promotionAssignments: { targetId: number }[];
};

export type AppliedPromotions = {
  name: string;
  badge: string;
  discount: string;
};
