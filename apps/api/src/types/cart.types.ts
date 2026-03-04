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
