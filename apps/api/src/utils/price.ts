import Decimal from 'decimal.js';
import { PromotionService } from '@/services/promotion.service';
import { PromotionRule } from 'generated/prisma/client';
import { Price } from '@/types/product.type';

const promotionService = new PromotionService();

type Product = {
  id: number;
  name: string;
  basePrice: Decimal;
  brandId: number;
  categoriesId: number[];
  tagsId: number[];
};

export type Promotion = {
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  applyTo: 'PRODUCT' | 'BRAND' | 'CATEGORY' | 'ORDER' | 'TAG';
  name: string;
  code: string | null;
  value: Decimal;
  isActive: boolean;
  isStackable: boolean;
  isAutomatic: boolean;
  promotionRule: PromotionRule | null;
  promotionAssignments: { targetId: number }[];
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
  productPromo: Product;
  variants: VariantPrice[] | null;
  userCountOrder: number;
};

function CalculateSinglePromoPrice(
  price: Decimal,
  promo: Promotion,
): { finalPrice: Decimal; discountApplied: Decimal } {
  let discount = new Decimal(0);
  const rule = promo.promotionRule;

  if (promo.type === 'PERCENTAGE') {
    discount = price.mul(promo.value).div(100);
  } else if (promo.type === 'FIXED_AMOUNT') {
    discount = new Decimal(promo.value);
  }

  if (rule?.maxDiscount) {
    discount = Decimal.min(discount, rule.maxDiscount);
  }

  const finalPrice = Decimal.max(price.minus(discount), 0);
  return { finalPrice, discountApplied: discount };
}

export async function CalculatePrice(
  price: PriceInput,
): Promise<{ price: Price }> {
  const { productPromo, variants, userCountOrder } = price;

  const promotions = await promotionService.getPromotion();

  let originalPrice = new Decimal(productPromo.basePrice);

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
  // Filter active promotions applicable to this productPromo
  // ----------------------------------

  const applicablePromos = promotions.filter((p) => {
    if (!p.isActive || !p.isAutomatic) return false;

    const rule = p.promotionRule;
    const now = new Date();

    if (rule) {
      if (rule.firstOrderOnly && userCountOrder > 0) return false;
      if (
        (rule.startsAt && now < rule.startsAt) ||
        (rule.endsAt && now > rule.endsAt)
      )
        return false;
      if (rule.usageLimit && rule.usedCount >= rule.usageLimit) return false;
      if (rule.minOrderValue && originalPrice.lessThan(rule.minOrderValue))
        return false;
    }

    const targetIds = [
      ...new Set(p.promotionAssignments.map((t) => t.targetId).filter(Boolean)),
    ];
    if (p.applyTo === 'PRODUCT' && targetIds.includes(productPromo.id))
      return true;
    if (p.applyTo === 'BRAND' && targetIds.includes(productPromo.brandId))
      return true;
    if (
      p.applyTo === 'CATEGORY' &&
      targetIds.some((id) => productPromo.categoriesId.includes(Number(id)))
    )
      return true;
    if (
      p.applyTo === 'TAG' &&
      targetIds.some((id) => productPromo.tagsId.includes(id))
    )
      return true;

    return false;
  });

  let discountPercentage: string | null = null;

  if (applicablePromos.length === 0)
    return {
      price: {
        finalPrice: originalPrice.toString(), // price before discount
        discountApplied: null,
        discountPercentage,
        hasDiscount: discountPercentage !== null,
        appliedPromotions: [],
      },
    };

  // ----------------------------------
  // Separate stackable vs non-stackable
  // ----------------------------------

  const stackablePromos = applicablePromos.filter((p) => p.isStackable);
  const nonStackablePromos = applicablePromos.filter((p) => !p.isStackable);

  let bestPrice = originalPrice;
  let bestDiscount = new Decimal(0);
  let bestApplied: Promotion[] = [];

  for (const promo of nonStackablePromos) {
    const { finalPrice, discountApplied } = CalculateSinglePromoPrice(
      originalPrice,
      promo,
    );

    if (discountApplied.greaterThan(bestDiscount)) {
      bestDiscount = discountApplied;
      bestPrice = finalPrice;
      bestApplied = [promo];
    }
  }

  // ----------------------------------
  // Evaluate stackable combination
  // ----------------------------------

  if (stackablePromos.length > 0) {
    let combinedPrice = originalPrice;
    let combinedDiscount = new Decimal(0);
    const applied: Promotion[] = [];

    for (const promo of stackablePromos) {
      const { finalPrice, discountApplied } = CalculateSinglePromoPrice(
        combinedPrice,
        promo,
      );
      combinedDiscount = combinedDiscount.plus(discountApplied);
      combinedPrice = finalPrice;
      applied.push(promo);
    }

    if (combinedDiscount.greaterThan(bestDiscount)) {
      bestDiscount = combinedDiscount;
      bestPrice = combinedPrice;
      bestApplied = applied;
    }
  }

  discountPercentage = bestPrice.equals(0)
    ? null
    : bestDiscount.div(originalPrice).mul(100).toString();

  return {
    price: {
      finalPrice: bestPrice.toString(), // price customer pays
      discountApplied: bestDiscount.toString(),
      discountPercentage,
      hasDiscount: discountPercentage !== null,
      appliedPromotions: bestApplied,
    },
  };
}
