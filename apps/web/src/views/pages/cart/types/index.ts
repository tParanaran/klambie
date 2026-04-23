import { ProductType } from '../../dashboard/products/types';
import { IAppliedPromotion } from '../../p/types/product.types';

export interface IPrice {
  subtotal: string;
  totalPrice: string;
  discount: string;
}

export interface ICartItems {
  productVariantId: number;
  slug: string;
  name: string;
  hasDiscount: boolean;
  appliedPromotions?: IAppliedPromotion[];
  type: ProductType;
  price: IPrice;
  sku: string;
  image: string;
  brand: string;
  quantity: number;
  availableStock: number;
  inStock: boolean;
  attributes: {
    attributeId: number;
    attributeValueId: number;
    attribute: string;
    value: string;
  }[];
}

export interface ITotalPrice {
  subTotal: string;
  discountTotal: string;
  grandTotal: string;
}

export interface IVariantAttribute {
  variantId: number;
  attributes: { attributeId: number; attributeValueId: number }[];
}

export interface ICartItemsResponse {
  cartItems: ICartItems[];
  totalPrice: ITotalPrice;
}
