import Decimal from 'decimal.js';
import { PromotionRule } from '@generated/prisma/client';

export type Product = {
  id: number;
  basePrice: Decimal;
  quantity: number;
  brandId?: number;
  categoriesId?: number[];
  tagsId?: number[];
};

export type Variant = {
  basePrice: Decimal;
  stock: number;
  reservedStock: number;
};

export type PromoInput = {
  product: Product;
  user?: number;
  variants?: Variant[];
};

export type PromoRule = {
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

export type AppliedPromotion = {
  name: string;
  badge: string;
  discount: Decimal;
};

export type Banner = {
  id: number;
  title: string;
  image: string;
  link: string;
  active: boolean;
  createdAt: string;
  validUntil?: string;
  categories: string[];
  discount?: string;
  promoCode?: string;
  isSale: boolean;
};
