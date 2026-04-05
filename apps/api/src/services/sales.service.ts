import { prisma } from '@lib/prisma';

export class SalesService {
  async getSoldQtyByVariant(
    variantIds: number[],
  ): Promise<Map<number, number>> {
    if (!variantIds.length) return new Map();

    const data = await prisma.orderItem.groupBy({
      by: ['productVariantId'],
      where: {
        productVariantId: { in: variantIds },
        order: {
          status: 'COMPLETED',
        },
      },
      _sum: {
        quantity: true,
      },
    });

    const map = new Map<number, number>();

    data.forEach((item) => {
      map.set(item.productVariantId, item._sum.quantity || 0);
    });

    return map;
  }
  async getTopSellingProducts(limit = 10) {
    const data = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: { status: 'COMPLETED' },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: limit,
    });

    return data;
  }
  async getSalesChart({ type = 'daily' }: { type?: 'daily' | 'monthly' }) {
    const groupBy = type === 'monthly' ? { month: true } : { day: true };

    const raw = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        ${
          type === 'monthly'
            ? 'DATE_TRUNC(\'month\', o."createdAt")'
            : 'DATE_TRUNC(\'day\', o."createdAt")'
        } as date,
        SUM(oi."quantity") as total_qty,
        SUM(oi."totalPrice") as revenue
      FROM "order_item" oi
      JOIN "Order" o ON oi."orderId" = o.id
      WHERE o.status = 'COMPLETED'
      GROUP BY date
      ORDER BY date ASC
    `);

    return raw;
  }
}
