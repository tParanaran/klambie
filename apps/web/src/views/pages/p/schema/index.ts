import { number, object, boolean } from 'yup';

const SimpleProductSchema = object({
  quantity: number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1 pc'),
});

const VariantProductSchema = object({
  ...SimpleProductSchema.fields,
  selectedAttributes: object().test(
    'not-empty',
    'Please select attributes first',
    (value) => value && Object.keys(value).length > 0,
  ),

  selectedVariant: object({
    id: number(),
    inStock: boolean(),
    availableStock: number(),
  })
    .required('Variant is required')
    .test(
      'variant-valid',
      'Selected combination is not available.',
      (value) => {
        if (!value) return false;

        return (
          Number(value.id) > 0 &&
          value.inStock === true &&
          Number(value.availableStock) > 0
        );
      },
    ),
});

export const getAddToCartSchema = (hasVariants: boolean) => {
  return hasVariants ? VariantProductSchema : SimpleProductSchema;
};
