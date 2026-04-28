import { array, boolean, mixed, number, object, ref, string } from 'yup';

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

export const GeneralTabSchema = object({
  name: string()
    .required('Product name is required')
    .min(5, 'Minimum 3 characters'),

  type: mixed<'NO_VARIANT' | 'VARIANT'>()
    .oneOf(['NO_VARIANT', 'VARIANT'], 'Invalid product type')
    .required('Product type is required'),

  brandId: number()
    .typeError('Brand is required')
    .required('Brand is required')
    .min(1, 'Invalid brand'),

  productTags: array().of(number()).optional(),
  productCategories: array()
    .of(string().required())
    .min(1, 'At least one category is required'),

  productDetails: object({
    description: string()
      .required('Description is required')
      .min(50, 'Minimum 50 characters'),

    care: string().optional(),
    feature: string().optional(),
    material: string().optional(),

    weight: number()
      .typeError('Must be a number')
      .required('Weight is required')
      .min(1, 'Weight must be at least 1'),

    height: number()
      .typeError('Height must be a number')
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),

    width: number()
      .typeError('Width must be a number')
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),

    length: number()
      .typeError('Length must be a number')
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),

    volume: number()
      .typeError('Volume must be a number')
      .nullable()
      .transform((v, o) => (o === '' ? null : v)),
  }),

  images: array()
    .of(
      object({
        url: string().required('Image is required'),
        attributeValueId: number().optional(),
      }),
    )
    .min(1, 'At least one image is required')
    .test(
      'at-least-one-without-attribute',
      'At least one main image is required',
      (images) => {
        if (!images || images.length === 0) return false;

        return images.some((img) => !img.attributeValueId);
      },
    ),
});

export const AdvanceTabSchema = object({
  ...GeneralTabSchema.fields,
  basePrice: number()
    .typeError('Must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least Rp 1'),

  baseStock: number()
    .typeError('Must be a number')
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(1, 'Stock must be at least 1 pc'),

  sizingGuideId: number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .typeError('Sizing guide is required')
    .required('Sizing guide is required')
    .min(1, 'Invalid sizing guide'),

  variantAttributeIds: array()
    .of(number())
    .when('type', {
      is: 'VARIANT',
      then: (schema) =>
        schema
          .min(1, 'Select at least one attribute for variants')
          .required('Select at least one attribute for variants'),
      otherwise: (schema) => schema.optional(),
    }),

  productAttributes: array()
    .of(
      object({
        attributeId: number()
          .typeError('Attribute is required')
          .required('Attribute is required'),

        values: array()
          .of(number().typeError('Attribute value is required'))
          .min(1, 'At least one value is required')
          .required('Values are required'),

        imageBased: boolean().optional(),
      }),
    )
    .min(1, 'At least one attribute is required')
    .required('Product attributes are required'),
});

export const productValidationSchema = object({
  ...AdvanceTabSchema.fields,
  productVariants: array()
    .of(
      object({
        barcode: string().optional(),

        basePrice: number()
          .typeError('Must be a number')
          .required('Price is required')
          .min(1, 'Price must be at least Rp 1'),

        stock: number()
          .typeError('Must be a number')
          .required('Stock is required')
          .integer('Stock must be a whole number')
          .min(1, 'Stock must be at least 1 pc'),

        attributeValueId: array()
          .of(number().required())
          .when('type', {
            is: 'VARIANT',
            then: (schema) =>
              schema
                .min(1, 'Variant must have at least one attribute')
                .required(),
            otherwise: (schema) => schema.notRequired(),
          }),
      }),
    )
    .when('type', {
      is: 'VARIANT',
      then: (schema) =>
        schema
          .min(1, 'At least one variant is required')
          .test(
            'unique-variants',
            'Duplicate variant combination',
            (variants, ctx) => {
              const type = ctx.from?.[1]?.value?.type;

              if (type !== 'VARIANT') return true;
              if (!variants) return true;

              const seen = new Set();

              for (const v of variants) {
                const key = v.attributeValueId?.slice().sort().join('-');
                if (seen.has(key)) return false;
                seen.add(key);
              }

              return true;
            },
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
});
