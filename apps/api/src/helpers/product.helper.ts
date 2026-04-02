import { GenerateSlug } from '@/utils/slug';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { PrismaClient } from 'generated/prisma/client';

export class ProductHelper {
  async findOrCreate<
    T extends {
      createMany: Function;
      findMany: Function;
    },
  >(delegate: T, data: string[]): Promise<{ id: number }[]> {
    await delegate.createMany({
      data: await Promise.all(
        data.map(async (name) => ({
          name,
          slug: await GenerateSlug(name),
        })),
      ),
      skipDuplicates: true,
    });

    return await delegate.findMany({
      where: { name: { in: data } },
      select: { id: true, name: true },
    });
  }
  async findOrCreateCategoryHierarchy(
    tx: Omit<
      PrismaClient<never, undefined, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
    >,
    name: string,
    parentId: number | null,
    level: number,
  ) {
    // Find or create category
    let category = await tx.category.findUnique({ where: { name } });
    if (!category)
      category = await tx.category.create({
        data: { name, slug: await GenerateSlug(name) },
      });

    // Find or create hierarchy
    let hierarchy = await tx.categoryHierarchy.findFirst({
      where: { categoryId: category.id, parentId },
    });
    if (!hierarchy) {
      hierarchy = await tx.categoryHierarchy.create({
        data: { categoryId: category.id, parentId, level, path: 'temp' },
      });
    }

    let path = '';
    if (!parentId) {
      path = hierarchy.id.toString();
    } else {
      const parent = await tx.categoryHierarchy.findUnique({
        where: { id: parentId },
        select: { path: true },
      });
      path = parent?.path + '.' + hierarchy.id;
    }

    hierarchy = await tx.categoryHierarchy.update({
      where: { id: hierarchy.id },
      data: { path },
    });

    return hierarchy;
  }
}
