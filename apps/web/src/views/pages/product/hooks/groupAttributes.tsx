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

      if (!group.values.some((v) => v.id === attr.id)) {
        group.values.push({
          id: attr.id,
          value: attr.value,
          hexUrl: attr.hexUrl,
        });
      }
    });
  });

  return Array.from(map.values());
}
