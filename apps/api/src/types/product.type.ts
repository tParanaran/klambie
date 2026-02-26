export type InsertProduct = {
  name: string;
  brandId: number;
  basePrice: number;
  comparePrice: number;
  slug: string;
  sizingGuideId: number | null;
  productDetails: {
    description: string;
    care: string | null;
    feature: string | null;
    material: string | null;
    weight: number;
    height: number | null;
    width: number | null;
    length: number | null;
    volume: number | null;
  };
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

export type AllProductsResponse = {
  name: string;
  basePrice: string;
  slug: string;
  brand: string;
  comparePrice: string | null;
  discountPercentage: string | null;
  variants: (string | null)[];
  categories: (string | undefined)[];
  tags: string[];
  images: string[];
};

export type OneProductResponse = {
  id: number;
  name: string;
  brand: string;
  basePrice: string;
  comparePrice: string | null;
  discountPercentage: string | null;
  categories: (string | undefined)[];
  tags: string[];
  productDetails: {
    description: string;
    material: string | null;
    feature: string | null;
    weight: number;
    length: number | null;
    width: number | null;
    height: number | null;
    volume: number | null;
    care: string | null;
  } | null;
  images: { attributeId: number | null; url: string }[];
  variants: {
    id: number;
    sku: string;
    basePrice: string;
    comparePrice: string | null;
    discountPercentage: string | null;
    stock: number;
    inStock: boolean;
    attributes: {
      id: number;
      value: string;
      hexUrl: string | null;
    }[];
  }[];
};
