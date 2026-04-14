import { IProductFormValues } from '@/views/pages/dashboard/products/types';

export const initialAddProductValues: IProductFormValues = {
  name: '',
  brandId: '',
  basePrice: '',
  baseStock: '',
  comparePrice: '',
  type: null,
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
  productVariants: [],
};

export function generateCombinations(arrays: number[][]): number[][] {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]] as number[][],
  );
}
