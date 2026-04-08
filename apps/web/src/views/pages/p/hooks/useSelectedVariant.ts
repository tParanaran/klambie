import { useEffect, useMemo, useState } from 'react';
import { IGroupedAttribute, IVariant } from '../types/product.types';

interface IUseSelected {
  variants: IVariant[];
  groupedAttributes: IGroupedAttribute[];
  cartItemVariant?: {
    variantId: number;
    attributes: { attributeId: number; attributeValueId: number }[];
  };
  isModal?: boolean;
}

export default function useSelectedVariant({
  variants,
  groupedAttributes,
  cartItemVariant,
  isModal,
}: IUseSelected) {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});
  const inStockVariants = variants.filter((v) => v.inStock);
  const prices = inStockVariants
    .map((v) => Number(v.price.finalPrice))
    .filter((p): p is number => p != null);
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const cheapestVariants =
    minPrice !== null
      ? inStockVariants.filter((v) => Number(v.price.finalPrice) === minPrice)
      : [];

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

  const computedGroupedAttributes = useMemo(() => {
    return groupedAttributes.map((attr) => ({
      ...attr,
      values: attr.values.map((value) => {
        const isDisabled = !variants.some((variant) => {
          if (!variant.inStock) return false;

          return variant.attributes.every((vAttr) => {
            if (vAttr.attribute.id === attr.attributeId) {
              return vAttr.id === value.id;
            }

            if (selectedAttributes[vAttr.attribute.id]) {
              return vAttr.id === selectedAttributes[vAttr.attribute.id];
            }

            return true;
          });
        });

        return {
          ...value,
          isDisabled,
        };
      }),
    }));
  }, [groupedAttributes, variants, selectedAttributes]);

  return {
    inStockVariants,
    cheapestVariants,
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    handleSelect,
    computedGroupedAttributes,
  };
}
