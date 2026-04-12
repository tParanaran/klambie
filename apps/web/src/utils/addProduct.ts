import { IProductFormValues } from '@/views/pages/dashboard/products/types';

export const initialAddProductValues: IProductFormValues = {
  name: '',
  brandId: '',
  basePrice: '',

  sizingGuideId: '',

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

  activeImageIndex: 0,

  productVariants: [
    {
      barcode: '',
      basePrice: '',
      comparePrice: '',
      stock: '',
      attributeValueId: [],
    },
  ],
};
