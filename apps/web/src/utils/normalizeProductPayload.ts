import {
  IProductFormValues,
  IProductPayload,
} from '@/views/pages/dashboard/products/types';
import { toNumber, toNullableNumber } from './formatValue';

export const normalizeProductPayload = (
  data: IProductFormValues,
): IProductPayload => {
  return {
    name: data.name,

    brandId: toNumber(data.brandId),
    basePrice: toNumber(data.basePrice),
    type: data.type || 'NO_VARIANT',
    productTags: data.productTags ?? [],
    sizingGuideId: toNumber(data.sizingGuideId),

    // =========================
    // DETAILS
    // =========================
    productDetails: {
      description: data.productDetails.description,
      care: data.productDetails.care || null,
      feature: data.productDetails.feature || null,
      material: data.productDetails.material || null,
      weight: toNumber(data.productDetails.weight),
      height: data.productDetails.height
        ? toNumber(data.productDetails.height)
        : null,
      width: data.productDetails.width
        ? toNumber(data.productDetails.width)
        : null,
      length: data.productDetails.length
        ? toNumber(data.productDetails.length)
        : null,
      volume: data.productDetails.volume
        ? toNumber(data.productDetails.volume)
        : null,
    },

    // =========================
    // ATTRIBUTES
    // =========================
    productAttributes: data.productAttributes.map((attr) => ({
      attributeId: toNumber(attr.attributeId),
      imageBased: !!attr.imageBased,
      values: attr.values.map((v) => toNumber(v)),
    })),

    productCategories: data.productCategories,

    // =========================
    // IMAGES
    // =========================
    images: data.images.map((img) => ({
      url: img.url,
      source: img.source || 'URL',
      attributeValueId:
        toNumber(img.attributeValueId) === 0
          ? null
          : toNumber(img.attributeValueId),
    })),

    // =========================
    // VARIANTS
    // =========================
    productVariants: data.productVariants.map((v) => ({
      attributeValueId: v.attributeValueId.map((id) => toNumber(id)) || [],
      basePrice: toNumber(v.basePrice),
      stock: toNumber(v.stock),
      comparePrice: v.comparePrice ? toNullableNumber(v.comparePrice) : null,
      barcode: v.barcode || null,
    })),
  };
};
