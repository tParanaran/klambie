import { ProductHelper } from '@/helpers/product.helper';
import { prisma } from 'lib/prisma';

type Payload = {
  departments: string[];
  collections: string[];
  categories: string[];
  subcategories?: string[];
};

const productHelper = new ProductHelper();

export class CategoryService {
  async createHierarchy(data: Payload): Promise<number> {
    const result = await prisma.$transaction(async (tx) => {
      const departments = await productHelper.GetAndCreate(
        tx.department,
        data.departments,
      );

      const collections = await productHelper.GetAndCreate(
        tx.collection,
        data.collections,
      );

      const categories = await productHelper.GetAndCreate(
        tx.category,
        data.categories,
      );

      let subcategories: { id: number }[] | null[] =
        data.subcategories !== undefined && data.subcategories.length > 0
          ? await productHelper.GetAndCreate(tx.subcategory, data.subcategories)
          : [null];

      let count = 0;

      for (const dep of departments) {
        for (const col of collections) {
          for (const cat of categories) {
            let findHierarchy = await tx.categoryHierarchy.findFirst({
              where: {
                departmentId: dep.id,
                collectionId: col.id,
                categoryId: cat.id,
              },
            });

            if (!findHierarchy) {
              for (const sub of subcategories) {
                await tx.categoryHierarchy.create({
                  data: {
                    departmentId: dep.id,
                    collectionId: col.id,
                    categoryId: cat.id,
                    subcategoryId: sub ? sub.id : null,
                  },
                });
                count++;
              }
            }
          }
        }
      }
      return count;
    });

    return result;
  }
}
