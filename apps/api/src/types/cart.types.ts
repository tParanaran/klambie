export type InsertCart = {
  productVariantId: number;
  quantity: number;
  unitPrice: number;
};

export type CartResponse = {
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
