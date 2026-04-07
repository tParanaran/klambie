import { number, object } from 'yup';

export const EditVariants = object({
  stock: number()
    .typeError('Must be a number')
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(1, 'Stock must be at least 1 pc'),
  basePrice: number()
    .typeError('Must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least Rp 1'),
});
