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
  weight: number | null;
  height?: number | null;
  width?: number | null;
  length?: number | null;
  volume?: number | null;
}

export interface IProductAttribute {
  attributeId: number;
  imageBased?: boolean;
}

export interface IProductImage {
  url: string;
  attributeValueId?: number | null;
}

export interface IProductVariant {
  barcode?: string;
  basePrice: number | null;
  comparePrice?: number | null;
  stock: number | null;
  attributeValueId: number[];
}

export interface IProductFormValues {
  name: string;
  brandId: number | null;
  basePrice: number | null;
  productTags?: number[];
  sizingGuideId?: number | null;
  productDetails: IProductDetails;
  productAttributes: IProductAttribute[];
  productCategories: string[];
  images: IProductImage[];
  productVariants: IProductVariant[];
}
