import { IProductFormValues } from '@/views/pages/dashboard/products/types';

export const initialAddProductValues: IProductFormValues = {
  name: '',
  brandId: null,
  basePrice: null,

  sizingGuideId: null,

  productDetails: {
    description: '',
    care: '',
    feature: '',
    material: '',
    weight: null,
    height: null,
    width: null,
    length: null,
    volume: null,
  },

  productAttributes: [],

  productCategories: [],

  images: [
    {
      url: '',
      attributeValueId: null,
    },
  ],

  productVariants: [
    {
      barcode: '',
      basePrice: null,
      comparePrice: null,
      stock: null,
      attributeValueId: [],
    },
  ],
};
