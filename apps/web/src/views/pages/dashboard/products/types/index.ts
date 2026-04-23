export interface IVariantsDashboard {
  productVariantId: number;
  sku: string;
  name: string;
  stock: number;
  reservedStock: number;
  price: string;
  isActive: boolean;
  soldQty: number;
  image: string;
}

export interface IProductDashboard {
  productId: number;
  name: string;
  type: 'VARIANT' | 'NO_VARIANT';
  brand: string;
  slug: string;
  sku: string;
  price: string;
  stock: number;
  reservedStock: number;
  soldQty: number;
  image: string;
  status: string;
  productVariants: IVariantsDashboard[];
}

export interface IEditVariants {
  stock?: number;
  basePrice?: number;
  isActive?: boolean;
}

export interface IProductDetails {
  description: string;
  care?: string;
  feature?: string;
  material?: string;
  weight: number | string;
  height?: number | string;
  width?: number | string;
  length?: number | string;
  volume?: number | string;
}

export type ProductType = 'NO_VARIANT' | 'VARIANT';

export interface IProductAttribute {
  attributeId: number | string;
  imageBased?: boolean;
  values: number[];
}

export interface IProductImage {
  url: string;
  file?: File;
  source?: 'URL' | 'LOCAL';
  attributeValueId: number;
}

export interface IProductVariant {
  barcode?: string;
  basePrice: number | string;
  comparePrice?: number | string;
  stock: number | string;
  attributeValueId: number[];
}

export interface IProductFormValues {
  name: string;
  brandId: number | string;
  barcode: string;
  basePrice: number | string;
  baseStock: number | string;
  comparePrice?: number | string;
  type: ProductType | null;
  productTags?: number[];
  sizingGuideId: number | string;
  productDetails: IProductDetails;
  productAttributes: IProductAttribute[];
  variantAttributeIds: number[];
  productCategories: string[];
  images: IProductImage[];
  productVariants: IProductVariant[];
}

export interface IProductPayload {
  name: string;
  brandId: number;
  basePrice: number;
  type: ProductType;
  productTags?: number[];
  sizingGuideId: number;
  productDetails: {
    description: string;
    care?: string | null;
    feature?: string | null;
    material?: string | null;
    weight: number;
    height?: number | null;
    width?: number | null;
    length?: number | null;
    volume?: number | null;
  };
  productAttributes: {
    attributeId: number;
    imageBased: boolean;
    values: number[];
  }[];
  productCategories: string[];
  productVariants: {
    attributeValueId: number[];
    basePrice: number;
    stock: number;
    comparePrice?: number | null;
    barcode?: string | null;
  }[];
  images: {
    url: string;
    source: 'URL' | 'LOCAL';
    attributeValueId: number | null;
  }[];
}
