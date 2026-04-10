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

import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required')
    .min(3, 'Minimum 3 characters'),

  brandId: Yup.number().required('Brand is required').min(0),

  basePrice: Yup.number()
    .required('Base price is required')
    .min(0, 'Price must be greater than or equal to 0'),

  sizingGuideId: Yup.number().nullable(),

  productDetails: Yup.object({
    description: Yup.string().required('Description is required'),
    care: Yup.string().required('Care instructions are required'),
    feature: Yup.string().required('Feature is required'),
    material: Yup.string().required('Material is required'),

    weight: Yup.number().nullable().min(0, 'Weight must be positive'),

    height: Yup.number().nullable().min(0, 'Height must be positive'),

    width: Yup.number().nullable().min(0, 'Width must be positive'),

    length: Yup.number().nullable().min(0, 'Length must be positive'),

    volume: Yup.number().nullable().min(0, 'Volume must be positive'),
  }),

  productAttributes: Yup.array()
    .of(
      Yup.object({
        attributeId: Yup.number().required(),
        imageBased: Yup.boolean().optional(),
      }),
    )
    .min(1, 'At least one attribute is required'),

  productCategories: Yup.array()
    .of(Yup.number().required())
    .min(1, 'Select at least one category'),

  images: Yup.array()
    .of(
      Yup.object({
        url: Yup.string()
          .required('Image URL is required')
          .url('Invalid URL format'),

        attributeValueId: Yup.number().optional(),
      }),
    )
    .min(1, 'At least one image is required'),

  productVariants: Yup.array()
    .of(
      Yup.object({
        barcode: Yup.string().nullable(),

        basePrice: Yup.number()
          .required('Variant price is required')
          .min(0, 'Price must be >= 0'),

        comparePrice: Yup.number()
          .nullable()
          .min(0, 'Compare price must be >= 0')
          .test(
            'compare-greater',
            'Compare price must be greater than base price',
            function (value) {
              const { basePrice } = this.parent;
              if (value == null) return true;
              return value >= basePrice;
            },
          ),

        stock: Yup.number()
          .required('Stock is required')
          .min(0, 'Stock cannot be negative'),

        attributeValueId: Yup.array()
          .of(Yup.number().required())
          .min(1, 'Variant must have at least one attribute'),
      }),
    )
    .min(1, 'At least one variant is required'),
});
