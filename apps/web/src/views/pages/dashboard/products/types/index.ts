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
  weight: number | string;
  height?: number | string;
  width?: number | string;
  length?: number | string;
  volume?: number | string;
}

type ProductType = 'NO_VARIANT' | 'VARIANT' | null;

export interface IProductAttribute {
  attributeId: number | string;
  imageBased?: boolean;
}

export interface IProductImage {
  url: string;
  file?: File;
  source?: 'local' | 'url';
  attributeValueId?: number | string;
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
  basePrice: number | string;
  baseStock: number | string;
  comparePrice: number | string;
  type: ProductType;
  productTags?: number[];
  sizingGuideId?: number | string;
  productDetails: IProductDetails;
  productAttributes: IProductAttribute[];
  productCategories: string[];
  images: IProductImage[];
  productVariants: IProductVariant[];
}
