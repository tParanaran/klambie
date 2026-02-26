import Decimal from 'decimal.js';

type Discount = {
  type: 'PERCENTAGE' | 'FIXED';
  value: Decimal;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};

type VariantPrice = {
  basePrice: Decimal;
  comparePrice: Decimal | null;
  stock: number;
  productVariantAttributes: {
    attributeValue: {
      hexUrl: string | null;
    };
  }[];
};

type PriceInput = {
  bPrice: Decimal;
  cPrice: Decimal | null;
  variants: VariantPrice[] | null;
  discounts: Discount[] | null;
};

export function CalculatePrice(price: PriceInput) {
  const { bPrice, cPrice, variants, discounts } = price;

  let originalPrice = bPrice;
  let manualComparePrice = cPrice ?? null;

  // ----------------------------------
  // Choose Cheapest In-Stock Variant
  // ----------------------------------

  if (variants && variants.length > 0) {
    const availableVariants = variants.filter((v) => v.stock > 0);

    if (availableVariants.length > 0) {
      const cheapest = availableVariants.reduce((prev, current) =>
        current.basePrice.lessThan(prev.basePrice) ? current : prev,
      );

      originalPrice = cheapest.basePrice;
      manualComparePrice = cheapest.comparePrice ?? null;
    }
  }

  // ----------------------------------
  // Find Active Discount
  // ----------------------------------
  const now = new Date();

  const activeDiscount =
    discounts?.find(
      (d) =>
        d.isActive &&
        new Date(d.startDate) <= now &&
        new Date(d.endDate) >= now,
    ) ?? null;

  let finalPrice = originalPrice;
  let effectiveComparePrice: Decimal | null = null;

  // ----------------------------------
  // Check scheduled discount first
  // Scheduled Discount > ComparePrice
  // ----------------------------------
  if (activeDiscount) {
    if (activeDiscount.type === 'PERCENTAGE') {
      finalPrice = originalPrice.minus(
        originalPrice.times(activeDiscount.value).dividedBy(100),
      );
    }

    if (activeDiscount.type === 'FIXED') {
      finalPrice = originalPrice.minus(activeDiscount.value);
    }

    // ----------------------------------
    // Prevent negative price
    // ----------------------------------
    if (finalPrice.isNegative()) {
      finalPrice = new Decimal(0);
    }

    // ----------------------------------
    // When scheduled discount exists,
    // we compare against ORIGINAL base price
    // ----------------------------------
    effectiveComparePrice = originalPrice;
  }

  // ----------------------------------
  // If no scheduled discount, use comparePrice
  // ----------------------------------
  else if (
    manualComparePrice &&
    manualComparePrice.greaterThan(originalPrice)
  ) {
    finalPrice = originalPrice;
    effectiveComparePrice = manualComparePrice;
  }

  // ----------------------------------
  // Calculate discount %
  // ----------------------------------
  let discountPercentage: string | null = null;

  if (effectiveComparePrice && effectiveComparePrice.greaterThan(finalPrice)) {
    discountPercentage = effectiveComparePrice
      .minus(finalPrice)
      .dividedBy(effectiveComparePrice)
      .times(100)
      .toFixed(0);
  }

  return {
    price: {
      originalPrice: originalPrice.toString(), // price before discount
      finalPrice: finalPrice.toString(), // price customer pays
      comparePrice: effectiveComparePrice
        ? effectiveComparePrice.toString()
        : null,
      discountPercentage,
      discountEndsAt: activeDiscount?.endDate ?? null,
      hasDiscount: discountPercentage !== null,
    },
  };
}
