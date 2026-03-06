import Decimal from 'decimal.js';
import { AppliedPromotion } from './promotion.type';

export type InsertCart = {
  productVariantId: number;
  quantity: number;
  unitPrice: number;
};

export type AddCart = {
  success: boolean;
  addQuantity?: number;
  message: string;
};

export type Adjustment = {
  productVariantId: number;
  requested: number;
  available: number;
  final: number;
  reason: string;
};

export type Price = {
  subtotal: Decimal;
  totalPrice: Decimal;
  discount: Decimal;
};

export type CartItems = {
  cartItemId: number;
  productVariantId: number;
  slug: string;
  name: string;
  brand: string;
  hasDiscount: boolean;
  appliedPromotions: AppliedPromotion[];
  price: Price;
  sku: string;
  image: string;
  quantity: number;
  stockAvailable: number;
  attributes: {
    attributeId: number;
    attribute: string;
    value: string;
  }[];
};

type TotalPrice = {
  subTotal: Decimal;
  discountTotal: Decimal;
  grandTotal: Decimal;
};

export type CartItemsResponse = {
  cartItems: CartItems[];
  totalPrice: TotalPrice;
};
