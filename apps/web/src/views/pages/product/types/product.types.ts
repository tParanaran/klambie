export interface IAppliedPromotions {
  name: string;
  badge: string;
  discount: string;
}

export interface IPrice {
  originalPrice: string;
  finalPrice: string;
  discountApplied?: string;
  discountPercentage?: string;
  hasDiscount: boolean;
  appliedPromotions?: IAppliedPromotions[];
}

export interface IProducts {
  name: string;
  price: IPrice;
  slug: string;
  brand: string;
  variants: (string | null)[];
  categories: (string | undefined)[];
  tags: string[];
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

export interface IVariant {
  id: number;
  sku: string;
  price: IPrice;
  stock: number;
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
export interface IProduct {
  id: number;
  name: string;
  sku: string;
  slug: string;
  brand: string;
  attributes: { name: string; id: number }[];
  categories?: string[];
  tags: string[];
  productDetails: IProductDetails;
  images: { attributeId: number | null; url: string }[];
  variants: IVariant[];
}

export interface IGroupedAttribute {
  attributeId: number;
  attributeName: string;
  values: {
    id: number;
    value: string;
    hexUrl?: string;
  }[];
}
