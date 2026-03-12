import { useEffect, useMemo, useState } from 'react';
import { IVariant } from '../types/product.types';
import { GetGroupedAttributes } from './groupAttributes';

interface IUseSelected {
  variants: IVariant[];
  cartItemVariant?: {
    variantId: number;
    attributes: { attributeId: number; attributeValueId: number }[];
  };
  isModal?: boolean;
}

export default function useSelectedVariant({
  variants,
  cartItemVariant,
  isModal,
}: IUseSelected) {
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

    let defaultVariant: (typeof variants)[0] | undefined;

    // Default by cart items
    if (cartItemVariant) {
      defaultVariant = inStockVariants.find(
        (v) => v.id === cartItemVariant.variantId,
      );
    }

    // Default by cheapest price
    if (!defaultVariant && isModal) {
      const prices = inStockVariants
        .map((v) => Number(v.price.finalPrice))
        .filter((p): p is number => p != null);
      const minPrice = prices.length > 0 ? Math.min(...prices) : null;

      const cheapestVariants =
        minPrice !== null
          ? inStockVariants.filter(
              (v) => Number(v.price.finalPrice) === minPrice,
            )
          : [];
      defaultVariant =
        cheapestVariants.length > 0 ? cheapestVariants[0] : inStockVariants[0];
    }

    // Initialize selected attributes
    const initialAttributes: Record<number, number> = {};
    defaultVariant?.attributes.forEach((attr) => {
      initialAttributes[attr.attribute.id] = attr.id;
    });

    setSelectedAttributes(initialAttributes);
  }, [variants, cartItemVariant, isModal]);

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
