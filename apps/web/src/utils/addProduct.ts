import { IProductFormValues } from '@/views/pages/dashboard/products/types';

export const initialAddProductValues: IProductFormValues = {
  name: '',
  brandId: null,
  basePrice: '',

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
      attributeValueId: undefined,
    },
  ],

  productVariants: [
    {
      barcode: null,
      basePrice: '',
      comparePrice: null,
      stock: '',
      attributeValueId: [],
    },
  ],
};
