export type Product = {
  name: string;
  brandId: number;
  basePrice: number;
  comparePrice: number | null;
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
    price: number;
    comparePrice: number | null;
    stock: number;
    productImages: string[];
    attributeValueId: number[];
  }[];
};
