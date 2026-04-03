import { prisma } from '../../lib/prisma';

export class OrderService {
  async getCountOrder(user?: number): Promise<number> {
    if (!user) return 0;

    const count = await prisma.order.count({
      where: { userId: user },
    });

    return count;
  }
}
