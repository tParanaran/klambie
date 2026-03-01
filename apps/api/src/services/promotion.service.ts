import Decimal from 'decimal.js';
import Rupiah from '@/utils/rupiah';
import { Price } from '@/types/product.type';
import { Prisma, Promotion } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';
import {
  AppliedPromotions,
  GetPromotion,
  PriceInput,
} from '@/types/promotion.type';
import { PromotionHelper } from '@/helpers/promotion.helper';
import { OrderService } from './order.service';

const promotionHelper = new PromotionHelper();
const orderService = new OrderService();

export class PromotionService {
  async createPromotion(data: Prisma.PromotionCreateInput): Promise<Promotion> {
    const result = await prisma.$transaction(async (tx) => {
      const {
        name,
        code,
        value,
        promotionRule,
        isStackable,
        isAutomatic,
        type,
        applyTo,
      } = data;
      const promotion = await tx.promotion.create({
        data: {
          name,
          type,
          applyTo,
          code,
          value,
          isAutomatic,
          isStackable,
          promotionRule: {
            create: promotionRule,
          },
        },
      });
      return promotion;
    });
    return result;
  }
  async deactivePromotion(id: string): Promise<string> {
    const promo = await prisma.promotion.findUnique({
      where: { id: Number(id) },
    });

    const deactive = await prisma.promotion.update({
      where: { id: Number(id) },
      data: { isActive: !promo?.isActive },
    });

    return `${deactive.isActive ? 'Enable' : 'Disable'} ${deactive.name} successfully`;
  }
  async getPromotion(): Promise<GetPromotion[]> {
    return await prisma.promotion.findMany({
      select: {
        type: true,
        applyTo: true,
        name: true,
        code: true,
        value: true,
        isActive: true,
        isStackable: true,
        isAutomatic: true,
        promotionRule: true,
        promotionAssignments: {
          select: {
            targetId: true,
          },
        },
      },
    });
  }
  async promotionRuleCheck(price: PriceInput): Promise<{ price: Price }> {
    const { productInfo, variants, user } = price;

    const userCountOrder = await orderService.getCountOrder(user);
    const promotions = await this.getPromotion();

    let originalPrice = new Decimal(productInfo.basePrice);

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
        ...new Set(
          p.promotionAssignments.map((t) => t.targetId).filter(Boolean),
        ),
      ];
      if (p.applyTo === 'PRODUCT' && targetIds.includes(productInfo.id))
        return true;
      if (p.applyTo === 'BRAND' && targetIds.includes(productInfo.brandId))
        return true;
      if (
        p.applyTo === 'CATEGORY' &&
        targetIds.some((id) => productInfo.categoriesId.includes(Number(id)))
      )
        return true;
      if (
        p.applyTo === 'TAG' &&
        targetIds.some((id) => productInfo.tagsId.includes(Number(id)))
      )
        return true;

      return false;
    });

    let discountPercentage;

    if (applicablePromos.length === 0)
      return {
        price: {
          originalPrice: Rupiah(Number(originalPrice)).toString(),
          finalPrice: Rupiah(Number(originalPrice)).toString(),
          discountPercentage,
          hasDiscount: discountPercentage !== null,
          appliedPromotions: undefined,
        },
      };

    // ----------------------------------
    // Separate stackable vs non-stackable
    // ----------------------------------

    const stackablePromos = applicablePromos.filter((p) => p.isStackable);
    const nonStackablePromos = applicablePromos.filter((p) => !p.isStackable);

    let bestPrice = originalPrice;
    let bestDiscount = new Decimal(0);
    let bestApplied: AppliedPromotions[] = [];

    for (const promo of nonStackablePromos) {
      const { finalPrice, discountApplied, promoApplied } =
        await promotionHelper.calculatePromotionPrice(originalPrice, promo);

      if (discountApplied.greaterThan(bestDiscount)) {
        bestDiscount = discountApplied;
        bestPrice = finalPrice;
        bestApplied = [promoApplied];
      }
    }

    // ----------------------------------
    // Evaluate stackable combination
    // ----------------------------------

    if (stackablePromos.length > 0) {
      let combinedPrice = originalPrice;
      let combinedDiscount = new Decimal(0);
      const applied: AppliedPromotions[] = [];

      // ----------------------------------
      // Sort so FIXED applies before PERCENTAGE
      // ----------------------------------
      const sortedStackablePromos = [...stackablePromos].sort((a, b) => {
        if (a.type === 'FIXED_AMOUNT' && b.type === 'PERCENTAGE') return -1;
        if (a.type === 'PERCENTAGE' && b.type === 'FIXED_AMOUNT') return 1;
        return 0;
      });

      for (const promo of sortedStackablePromos) {
        const { finalPrice, discountApplied, promoApplied } =
          await promotionHelper.calculatePromotionPrice(combinedPrice, promo);
        combinedDiscount = combinedDiscount.plus(discountApplied);
        combinedPrice = finalPrice;
        applied.push(promoApplied);
      }

      if (combinedDiscount.greaterThan(bestDiscount)) {
        bestDiscount = combinedDiscount;
        bestPrice = combinedPrice;
        bestApplied = applied;
      }
    }

    discountPercentage = bestPrice.equals(0)
      ? undefined
      : '-' +
        bestDiscount.div(originalPrice).mul(100).toFixed(2).toString() +
        '%';

    return {
      price: {
        originalPrice: Rupiah(Number(originalPrice)).toString(),
        finalPrice: Rupiah(Number(bestPrice)).toString(), // price customer pays
        discountApplied: Rupiah(Number(bestDiscount)).toString(),
        discountPercentage,
        hasDiscount: discountPercentage !== null,
        appliedPromotions: bestApplied,
      },
    };
  }
}
