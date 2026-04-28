import { IProductFormValues } from '@/views/pages/dashboard/products/types';

export const initialAddProductValues: IProductFormValues = {
  name: '',
  brandId: '',
  basePrice: '',
  baseStock: '',
  type: null,
  sizingGuideId: '',
  barcode: '',
  productDetails: {
    description: '',
    care: '',
    feature: '',
    material: '',
    weight: '',
    height: '',
    width: '',
    length: '',
    volume: '',
  },

  productAttributes: [],
  productCategories: [],
  images: [],
  productVariants: [],
  variantAttributeIds: [],
};
