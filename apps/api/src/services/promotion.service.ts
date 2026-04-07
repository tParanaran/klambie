import Decimal from 'decimal.js';
import { PromoResult } from '@/types/product.type';
import { Prisma, Promotion } from '@generated/prisma/client';
import { prisma } from '../../lib/prisma';
import {
  AppliedPromotion,
  PromoRule,
  PromoInput,
  Banner,
} from '@/types/promotion.type';
import { PromotionHelper } from '@/helpers/promotion.helper';
import { OrderService } from './order.service';

const promotionHelper = new PromotionHelper();
const orderService = new OrderService();

export class PromotionService {
  async getAllBanners(): Promise<Banner[]> {
    const banners = await prisma.banner.findMany({
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    });

    return banners.map((banner) => {
      const result: Banner = {
        id: banner.id,
        title: banner.title,
        image: banner.image,
        link: banner.link,
        active: banner.active,
        createdAt: banner.createdAt.toISOString(),
        categories: banner.categories.map((c) => c.slug),
        isSale: banner.isSale ?? false,
      };

      if (banner.validUntil)
        result.validUntil = banner.validUntil.toISOString();
      if (banner.discount) result.discount = banner.discount;
      if (banner.promoCode) result.promoCode = banner.promoCode;

      return result;
    });
  }
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
  async getPromotion(): Promise<PromoRule[]> {
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
  async promotionRuleCheck(input: PromoInput): Promise<PromoResult> {
    const { product, variants, user } = input;

    const userCountOrder = await orderService.getCountOrder(user);
    const promotions = await this.getPromotion();

    let originalPrice = new Decimal(product.basePrice);

    // ----------------------------------
    // Choose Cheapest In-Stock Variant
    // ----------------------------------

    if (variants && variants.length > 0) {
      const availableVariants = variants.filter(
        (v) => v.stock - v.reservedStock > 0,
      );

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

      const targetSet = new Set(
        p.promotionAssignments.map((t) => t.targetId).filter(Boolean),
      );

      if (p.applyTo === 'PRODUCT') {
        return targetSet.has(product.id);
      }

      if (p.applyTo === 'BRAND') {
        return targetSet.has(product?.brandId ?? 24);
      }

      if (p.applyTo === 'CATEGORY') {
        return product?.categoriesId?.some((id) => targetSet.has(id));
      }

      if (p.applyTo === 'TAG') {
        return product?.tagsId?.some((id) => targetSet.has(id));
      }
    });

    let discountPercentage = new Decimal(0);

    if (applicablePromos.length === 0)
      return {
        productVariantId: product.id,
        price: {
          originalPrice: new Decimal(originalPrice),
          finalPrice: new Decimal(originalPrice),
          discountApplied: new Decimal(0),
          discountPercentage,
        },
        hasDiscount: discountPercentage !== null,
      };

    // ----------------------------------
    // Separate stackable vs non-stackable
    // ----------------------------------

    const stackablePromos = applicablePromos.filter((p) => p.isStackable);
    const nonStackablePromos = applicablePromos.filter((p) => !p.isStackable);

    let bestPrice = originalPrice;
    let bestDiscount = new Decimal(0);
    let bestApplied: AppliedPromotion[] = [];

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
      const applied: AppliedPromotion[] = [];

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
      ? new Decimal(0)
      : new Decimal(bestDiscount.div(originalPrice).mul(100).toFixed(1));

    return {
      productVariantId: product.id,
      price: {
        originalPrice: new Decimal(originalPrice),
        finalPrice: new Decimal(bestPrice),
        discountApplied: new Decimal(bestDiscount),
        discountPercentage,
      },
      hasDiscount: discountPercentage !== null,
      appliedPromotion: bestApplied,
    };
  }
}
