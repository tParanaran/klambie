import useAttribute from '@/views/pages/c/hooks/useAttribute';
import { IAttribute } from '@/views/pages/c/types';
import {
  IProductAttribute,
  IProductFormValues,
  IProductVariant,
} from '@/views/pages/dashboard/products/types';

// SAFE KEY
///////////
type Key = string;

const uniq = (arr: number[]) => [...new Set(arr)];

const makeKey = (combo: number[], attrs: IProductAttribute[]): Key => {
  return combo.map((valId, i) => `${attrs[i].attributeId}:${valId}`).join('|');
};

const getVariantAttributes = (
  values: IProductFormValues,
): IProductAttribute[] => {
  const variantIds = new Set((values.variantAttributeIds || []).map(Number));

  return (values.productAttributes || [])
    .filter(
      (attr) =>
        variantIds.has(Number(attr.attributeId)) &&
        Array.isArray(attr.values) &&
        attr.values.length > 0,
    )
    .map((attr) => ({
      ...attr,
      values: uniq(attr.values),
    }));
};

// COMBINATIONS
///////////////
const generateCombinations = (arrays: number[][]): number[][] => {
  if (!arrays.length) return [];

  return arrays.reduce<number[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
    [[]],
  );
};

// BUILD VARIANTS
/////////////////
const buildVariants = (
  values: IProductFormValues,
  attrs: IProductAttribute[],
): IProductVariant[] => {
  if (!attrs.length) return [];

  const matrix = attrs.map((a) => a.values);
  const combos = generateCombinations(matrix);

  return combos.map((combo) => ({
    attributeValueId: combo,
    basePrice: values.basePrice,
    stock: values.baseStock,
    barcode: '',
  }));
};

const indexOldVariants = (
  oldVariants: IProductVariant[],
  attrs: IProductAttribute[],
): Map<Key, IProductVariant> => {
  const map = new Map<Key, IProductVariant>();

  for (const v of oldVariants || []) {
    if (!Array.isArray(v.attributeValueId)) continue;

    const key = makeKey(v.attributeValueId, attrs);

    if (!map.has(key)) {
      map.set(key, v); // keep first, ignore duplicates
    }
  }

  return map;
};

// GENERATE + MERGE
///////////////////
export const generateAndMergeVariants = (
  values: IProductFormValues,
): IProductVariant[] => {
  const attrs = getVariantAttributes(values);

  const fresh = buildVariants(values, attrs);
  const oldMap = indexOldVariants(values.productVariants || [], attrs);

  const next: IProductVariant[] = [];
  const usedKeys = new Set<Key>();

  for (const v of fresh) {
    const key = makeKey(v.attributeValueId, attrs);
    const old = oldMap.get(key);

    if (old) {
      next.push({
        ...v,
        basePrice: old.basePrice,
        stock: old.stock,
        barcode: old.barcode,
      });
    } else {
      next.push(v);
    }

    usedKeys.add(key);
  }

  const removed: IProductVariant[] = [];

  for (const [key, old] of oldMap.entries()) {
    if (!usedKeys.has(key)) {
      removed.push(old);
    }
  }

  return next;
};

export const groupByImage = (
  variants: IProductVariant[],
  values: IProductFormValues,
) => {
  const imageAttr = values.productAttributes.find((a) => a.imageBased);

  if (!imageAttr) return null;

  const validValues = new Set(imageAttr.values);

  const groups: Record<number, IProductVariant[]> = {};

  for (const variant of variants) {
    const id = variant.attributeValueId.find((v) => validValues.has(v));

    if (!id) continue;

    if (!groups[id]) groups[id] = [];
    groups[id].push(variant);
  }

  return groups;
};

export const createValueMap = () => {
  const { attributes } = useAttribute();
  const map: Record<number, string> = {};

  attributes.forEach((attr) => {
    attr.attributeValues.forEach((val: any) => {
      map[val.id] = val.value;
    });
  });

  return map;
};
