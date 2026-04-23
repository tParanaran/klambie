import { ProductType } from '../../dashboard/products/types';

export interface IAppliedPromotion {
  name: string;
  badge: string;
  discount: string;
}

export interface IPrice {
  originalPrice: string;
  finalPrice: string;
  discountApplied: string;
  discountPercentage: string;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
}

export interface IBrand {
  slug: string;
  name: string;
  id: number;
  image?: string;
  description?: string;
  createdAt: string;
  priority: boolean;
}

export interface IProducts {
  name: string;
  appliedPromotion?: IAppliedPromotion[];
  hasDiscount: boolean;
  price: IPrice;
  slug: string;
  brand: { name: string; slug: string };
  hexUrl: string[];
  categories: { name: string; slug: string }[];
  tags: ITag[];
  images: string[];
}

export interface IProductDetails {
  description: string;
  material?: string;
  feature?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  volume?: number;
  care?: string;
}

export interface IAttributes {
  id: number;
  name: string;
  values: { id: number; name: string }[];
}

export interface IVariant {
  id: number;
  sku: string;
  price: IPrice;
  appliedPromotion?: IAppliedPromotion[];
  hasDiscount: boolean;
  availableStock: number;
  inStock: boolean;
  attributes: {
    id: number;
    value: string;
    hexUrl?: string;
    attribute: {
      id: number;
      name: string;
    };
  }[];
}

export interface IImages {
  attributeId: number | null;
  url: string;
}

export interface IProduct {
  id: number;
  name: string;
  sku: string;
  slug: string;
  type: ProductType;
  status: string;
  brand: { name: string; slug: string };
  attributes: IAttributes[];
  categories: { name: string; slug: string }[];
  tags: ITag[];
  productDetails: IProductDetails;
  images: IImages[];
  variants: IVariant[];
}

export interface IGroupedAttribute {
  attributeId: number;
  attributeName: string;
  values: {
    id: number;
    variantId: number;
    value: string;
    hexUrl?: string;
    inStock: boolean;
    isDisabled: boolean;
  }[];
}

export interface ICartItem {
  productVariantId: number;
  quantity: number;
  unitPrice: string;
  currentPrice?: number;
  priceChanged?: boolean;
}
