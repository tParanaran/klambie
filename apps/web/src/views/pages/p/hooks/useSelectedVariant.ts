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

  const { defaultVariants, cheapestVariants } = useMemo(() => {
    const inStockVariants = variants.filter((v) => v.inStock);

    const source = inStockVariants.length > 0 ? inStockVariants : variants;

    const prices = source.map((v) => Number(v.price.finalPrice));

    const minPrice = prices.length > 0 ? Math.min(...prices) : null;

    const cheapestVariants =
      minPrice !== null
        ? source.filter((v) => Number(v.price.finalPrice) === minPrice)[0]
        : source[0];

    let defaultVariants: IVariant | undefined;

    // Cart priority by cart items in cart
    if (cartItemVariant) {
      defaultVariants = variants.find(
        (v) => v.id === cartItemVariant.variantId,
      );
    }

    // Cheapest or InStock or First Variants fallback
    if (!defaultVariants && isModal) {
      defaultVariants = cheapestVariants || inStockVariants[0] || variants[0];
    }

    return { defaultVariants, cheapestVariants };
  }, [variants, cartItemVariant, isModal]);

  useEffect(() => {
    if (!defaultVariants) return;

    // Initialize selected attributes
    const initialAttributes: Record<number, number> = {};

    defaultVariants.attributes.forEach((attr) => {
      initialAttributes[attr.attribute.id] = attr.id;
    });

    setSelectedAttributes(initialAttributes);
  }, [defaultVariants]);

  const selectedVariant = useMemo(() => {
    if (!variants || variants.length === 0) return undefined;

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
    defaultVariants,
    cheapestVariants,
    selectedAttributes,
    selectedVariant,
    selectedColorId,
    handleSelect,
    computedGroupedAttributes,
  };
}
