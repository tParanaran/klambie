import { Promotion, Prisma } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';

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
}
