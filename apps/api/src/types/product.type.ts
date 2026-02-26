type ProductDetails = {
  description: string;
  material: string | null;
  feature: string | null;
  weight: number;
  length: number | null;
  width: number | null;
  height: number | null;
  volume: number | null;
  care: string | null;
};

export type InsertProduct = {
  name: string;
  brandId: number;
  basePrice: number;
  comparePrice: number;
  slug: string;
  sizingGuideId: number | null;
  productDetails: ProductDetails;
  productAttributes: { attributeId: number; imageBased: boolean }[];
  productCategories: number[];
  productTags: number[];
  images: { url: string; attributeValueId: number | null }[];
  productVariants: {
    sku: string;
    barcode: string | null;
    basePrice: number;
    comparePrice: number;
    stock: number;
    productImages: string[];
    attributeValueId: number[];
  }[];
};

type Price = {
  originalPrice: string;
  finalPrice: string;
  comparePrice: string | null;
  discountPercentage: string | null;
  discountEndsAt: Date | null;
  hasDiscount: boolean;
};

export type AllProductsResponse = {
  name: string;
  price: Price;
  slug: string;
  brand: string;
  variants: (string | null)[];
  categories: (string | undefined)[];
  tags: string[];
  images: string[];
};

export type OneProductResponse = {
  id: number;
  name: string;
  brand: string;
  price: Price;
  categories: (string | undefined)[];
  tags: string[];
  productDetails: ProductDetails | null;
  images: { attributeId: number | null; url: string }[];
  variants: {
    id: number;
    sku: string;
    price: Price;
    stock: number;
    inStock: boolean;
    attributes: {
      id: number;
      value: string;
      hexUrl: string | null;
    }[];
  }[];
};
