import { IAttribute } from '@/views/pages/c/types';
import {
  IProductAttribute,
  IProductFormValues,
  IProductVariant,
} from '@/views/pages/dashboard/products/types';

// SAFE KEY
///////////
const makeKey = (ids?: number[]) => {
  if (!Array.isArray(ids)) return '';
  return ids
    .slice()
    .sort((a, b) => a - b)
    .join('-');
};

// COMBINATIONS
///////////////
const generateCombinations = (arrays: number[][]): number[][] => {
  if (!arrays.length) return [[]];

  return arrays.reduce(
    (acc, curr) => {
      const res: number[][] = [];

      acc.forEach((a) => {
        curr.forEach((b) => res.push([...a, b]));
      });

      return res;
    },
    [[]] as number[][],
  );
};

// BUILD VARIANTS
/////////////////
const buildVariants = (values: IProductFormValues): IProductVariant[] => {
  const variantAttrs = values.productAttributes.filter(
    (attr: IProductAttribute) =>
      values.variantAttributeIds.includes(Number(attr.attributeId)) &&
      Array.isArray(attr.values) &&
      attr.values.length > 0,
  );

  if (!variantAttrs.length) return [];

  const matrix = variantAttrs.map((a) => a.values);

  const combos = generateCombinations(matrix);

  return combos.map((combo) => ({
    attributeValueId: Array.isArray(combo) ? combo : [],
    basePrice: values.basePrice,
    stock: values.baseStock,
    comparePrice: values.comparePrice || '',
    barcode: '',
  }));
};

// GENERATE + MERGE
///////////////////
export const generateAndMergeVariants = (
  values: IProductFormValues,
): IProductVariant[] => {
  const generated = buildVariants(values);
  const oldVariants: IProductVariant[] = values.productVariants || [];

  const oldMap = new Map(
    oldVariants
      .filter((v) => Array.isArray(v.attributeValueId))
      .map((v) => [makeKey(v.attributeValueId), v]),
  );

  const merged = generated.map((newVar) => {
    const key = makeKey(newVar.attributeValueId);
    const old = oldMap.get(key);

    if (old) {
      return {
        ...newVar,
        basePrice: old.basePrice,
        stock: old.stock,
        barcode: old.barcode,
        comparePrice: old.comparePrice,
      };
    }

    return newVar;
  });

  return merged;
};

export const groupByImage = (
  variants: IProductVariant[],
  values: IProductFormValues,
) => {
  const imageAttr = values.productAttributes.find((a) => a.imageBased);

  if (!imageAttr) return null;

  const groups: Record<number, IProductVariant[]> = {};

  variants.forEach((variant) => {
    const imageValueId = variant.attributeValueId.find((id) =>
      imageAttr.values.includes(id),
    );

    if (!imageValueId) return;

    if (!groups[imageValueId]) {
      groups[imageValueId] = [];
    }

    groups[imageValueId].push(variant);
  });

  return groups;
};

export const createValueMap = (attributes: IAttribute[]) => {
  const map: Record<number, string> = {};

  attributes.forEach((attr) => {
    attr.attributeValues.forEach((val: any) => {
      map[val.id] = val.value;
    });
  });

  return map;
};
