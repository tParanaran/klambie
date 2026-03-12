import { boolean, number, object } from 'yup';

export const AddToCartSchema = object({
  selectedAttributes: object().required(),
  selectedVariant: object({
    id: number().required('Selected variant is required'),
    inStock: boolean().oneOf([true], 'This product is out of stock.'),
    stock: number().moreThan(0, 'This product is out of stock.'),
  })
    .nullable()
    .required('Selected combination is not available.'),

  quantity: number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1 pc'),
});
