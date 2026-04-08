import { boolean, number, object } from 'yup';

export const AddToCartSchema = object({
  selectedAttributes: object().test(
    'not-empty',
    'Please select attributes first',
    (value) => {
      return value && Object.keys(value).length > 0;
    },
  ),

  selectedVariant: object({
    id: number(),
    inStock: boolean(),
    availableStock: number(),
  })
    .nullable()
    .test(
      'variant-valid',
      'Selected combination is not available.',
      (value) => {
        if (!value || Object.keys(value).length === 0) return false;

        return (
          Number(value.id) > 0 &&
          value.inStock === true &&
          Number(value.availableStock) > 0
        );
      },
    ),

  quantity: number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1 pc'),
});
