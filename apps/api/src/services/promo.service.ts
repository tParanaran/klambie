import { Promotion, Prisma } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';

export class PromoService {
  async createPromo(data: Prisma.PromotionCreateInput): Promise<Promotion> {
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
}
