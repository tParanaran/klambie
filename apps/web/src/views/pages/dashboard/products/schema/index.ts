import { array, boolean, number, object, ref, string } from 'yup';

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

export const productValidationSchema = object({
  name: string()
    .required('Product name is required')
    .min(5, 'Minimum 3 characters'),

  brandId: number()
    .typeError('Brand is required')
    .required('Brand is required')
    .min(1, 'Invalid brand'),

  basePrice: number()
    .typeError('Must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least Rp 1'),

  productTags: array().of(number()).optional(),

  sizingGuideId: number().optional(),

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

  productAttributes: array().of(
    object({
      attributeId: number()
        .typeError('Attribute is required')
        .required('Attribute is required'),

      imageBased: boolean().optional(),
    }),
  ),

  images: array()
    .of(
      object({
        url: string().required('Image is required'),

        attributeValueId: number().optional(),
      }),
    )
    .min(1, 'At least one image is required'),

  productVariants: array()
    .of(
      object({
        barcode: string().optional(),

        basePrice: number()
          .typeError('Must be a number')
          .required('Price is required')
          .min(1, 'Price must be at least Rp 1'),

        comparePrice: number()
          .typeError('Must be a number')
          .nullable()
          .transform((v, o) => (o === '' ? null : v))
          .min(1, 'Price must be at least Rp 1')
          .moreThan(ref('basePrice'), 'Must be greater than price'),

        stock: number()
          .typeError('Must be a number')
          .required('Stock is required')
          .integer('Stock must be a whole number')
          .min(1, 'Stock must be at least 1 pc'),

        attributeValueId: array()
          .of(number().required())
          .min(1, 'Variant must have at least one attribute'),
      }),
    )
    .min(1, 'At least one variant is required')
    .test('unique-variants', 'Duplicate variant combination', (variants) => {
      if (!variants) return true;

      const seen = new Set();

      for (const v of variants) {
        const key = v.attributeValueId?.sort().join('-');
        if (seen.has(key)) return false;
        seen.add(key);
      }

      return true;
    }),
});
