import { AppliedPromotions, GetPromotion } from '@/types/promotion.type';
import Rupiah from '@/utils/rupiah';
import Decimal from 'decimal.js';

export class PromotionHelper {
  async calculatePromotionPrice(
    price: Decimal,
    promo: GetPromotion,
  ): Promise<{
    finalPrice: Decimal;
    discountApplied: Decimal;
    promoApplied: AppliedPromotions;
  }> {
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

    const promoApplied = {
      name: promo.name,
      badge:
        promo.type === 'PERCENTAGE'
          ? `${promo.value}% OFF`
          : `${promo.value} OFF`,
      discount: Rupiah(Number(discount)).toString(),
    };

    const finalPrice = Decimal.max(price.minus(discount), 0);
    return { finalPrice, discountApplied: discount, promoApplied };
  }
}
