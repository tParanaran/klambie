import Decimal from 'decimal.js';
import { PromotionRule } from 'generated/prisma/client';

type Promotion = {
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  applyTo: 'PRODUCT' | 'BRAND' | 'CATEGORY' | 'ORDER';
  code: String | null;
  value: Decimal;
  isActive: boolean;
  isStackable: boolean;
  isAutomatic: boolean;
  promotionRule?: PromotionRule;
  targetIds?: number[];
};

type VariantPrice = {
  basePrice: Decimal;
  stock: number;
  productVariantAttributes: {
    attributeValue: {
      hexUrl: string | null;
    };
  }[];
};

type PriceInput = {
  basePrice: Decimal;
  variants: VariantPrice[] | null;
  promotion: Promotion[] | null;
};

export function CalculatePrice(price: PriceInput) {
  const { basePrice, variants, promotion } = price;

  let originalPrice = basePrice;

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
    }
  }

  // ----------------------------------
  // Find Active Discount
  // ----------------------------------
  const now = new Date();

  const activeDiscount = promotion?.find((d) => d.isActive) ?? null;

  let finalPrice = originalPrice;
  let comparePrice: Decimal | null = null;

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

    if (activeDiscount.type === 'FIXED_AMOUNT') {
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
    comparePrice = originalPrice;
  }

  // ----------------------------------
  // Calculate discount %
  // ----------------------------------
  let discountPercentage: string | null = null;

  if (comparePrice && comparePrice.greaterThan(finalPrice)) {
    discountPercentage = comparePrice
      .minus(finalPrice)
      .dividedBy(comparePrice)
      .times(100)
      .toFixed(0);
  }

  return {
    price: {
      originalPrice: originalPrice.toString(), // price before discount
      finalPrice: finalPrice.toString(), // price customer pays
      comparePrice: comparePrice ? comparePrice.toString() : null, // only exist when have discount
      discountPercentage,
      discountEndsAt: activeDiscount?.promotionRule?.endsAt ?? null,
      hasDiscount: discountPercentage !== null,
    },
  };
}
