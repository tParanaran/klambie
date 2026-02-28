import { Promotion as Promotions } from '@/utils/price';
import { Prisma, Promotion } from 'generated/prisma/client';
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
  async getPromotion(): Promise<Promotions[]> {
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
}
