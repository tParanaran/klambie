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
  productAttributes: number[];
  productCategories: number[];
  productTags: number[];
  images: string[];
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
