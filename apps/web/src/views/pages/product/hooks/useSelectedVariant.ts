import { useEffect, useMemo, useState } from 'react';
import { IVariant } from '../types/product.types';
import { GetGroupedAttributes } from './groupAttributes';

export default function UseSelectedVariant(variants: IVariant[]) {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});

  const groupedAttributes = useMemo(() => {
    return [...GetGroupedAttributes(variants)].reverse();
  }, [variants]);

  const selectedVariant = useMemo(() => {
    if (!variants || variants.length === 0) return null;

    return variants.find((variant) =>
      variant.attributes.every(
        (attr) => selectedAttributes[attr.attribute.id] === attr.id,
      ),
    );
  }, [variants, selectedAttributes]);

  const handleSelect = (attributeId: number, valueId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  };

  useEffect(() => {
    if (!variants || variants.length === 0) return;

    const inStockVariants = variants.filter((v) => v.inStock);

    if (inStockVariants.length === 0) return;
    const prices = inStockVariants
      .map((v) => Number(v.price.finalPrice))
      .filter((p): p is number => p != null);

    const minPrice = prices.length > 0 ? Math.min(...prices) : null;

    const cheapestVariants =
      minPrice !== null
        ? inStockVariants.filter((v) => Number(v.price.finalPrice) === minPrice)
        : [];

    const defaultVariant =
      cheapestVariants.length > 0 ? cheapestVariants[0] : inStockVariants[0];

    const initialAttributes: Record<number, number> = {};
    defaultVariant.attributes.forEach((attr) => {
      initialAttributes[attr.attribute.id] = attr.id;
    });
    setSelectedAttributes(initialAttributes);
  }, [variants]);

  const colorAttributeId = useMemo(() => {
    return groupedAttributes.find(
      (attr) => attr.attributeName.toLowerCase() === 'color',
    )?.attributeId;
  }, [groupedAttributes]);

  const selectedColorId = colorAttributeId
    ? selectedAttributes[colorAttributeId]
    : undefined;

  return {
    selectedAttributes,
    selectedVariant,
    groupedAttributes,
    selectedColorId,
    handleSelect,
  };
}
