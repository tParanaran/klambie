import {
  IGroupedAttribute,
  IVariant,
} from '@/views/pages/product/types/product.types';

export function GetGroupedAttributes(variants: IVariant[]) {
  const map = new Map<number, IGroupedAttribute>();

  variants.forEach((variant) => {
    variant.attributes.forEach((attr) => {
      const attributeId = attr.attribute.id;

      if (!map.has(attributeId)) {
        map.set(attributeId, {
          attributeId,
          attributeName: attr.attribute.name,
          values: [],
        });
      }

      const group = map.get(attributeId)!;

      const existingValue = group.values.find((v) => v.id === attr.id);

      if (existingValue) {
        if (variant.inStock) {
          existingValue.inStock = true;
        }
      } else {
        group.values.push({
          id: attr.id,
          variantId: variant.id,
          value: attr.value,
          hexUrl: attr.hexUrl,
          inStock: variant.inStock,
        });
      }
    });
  });

  return Array.from(map.values());
}
