import { ProductHelper } from '@/helpers/product.helper';
import { prisma } from 'lib/prisma';

type DataInput = {
  data: string[];
};

type AttributeValueInput = {
  attributeId: number;
  hexUrls: string[];
  values: string[];
};

type CategoryInput = {
  departments: string[];
  collections: string[];
  categories: string[];
  subcategories?: string[];
};

const productHelper = new ProductHelper();

export class AttributeService {
  async createBrand(input: DataInput): Promise<{ id: number }[]> {
    const result = await prisma.$transaction(async (tx) => {
      const brand = await productHelper.findOrCreate(tx.brand, input.data);

      return brand;
    });

    return result;
  }
  async createAttribute(input: DataInput): Promise<{ id: number }[]> {
    const result = await prisma.$transaction(async (tx) => {
      const attribute = await productHelper.findOrCreate(
        tx.attribute,
        input.data,
      );

      return attribute;
    });

    return result;
  }
  async createAttributeValue(input: AttributeValueInput): Promise<number> {
    const { attributeId, values, hexUrls } = input;

    const result = await prisma.$transaction(async (tx) => {
      const attributeValue = await tx.attributeValue.createMany({
        data: values.map((value: string, idx: number) => ({
          attributeId,
          hexUrl: hexUrls ? hexUrls[idx] : null,
          value: value,
        })),
        skipDuplicates: true,
      });

      return attributeValue.count;
    });

    return result;
  }
  async createTag(input: DataInput): Promise<{ id: number }[]> {
    const result = await prisma.$transaction(async (tx) => {
      const attribute = await productHelper.findOrCreate(tx.tag, input.data);

      return attribute;
    });

    return result;
  }
  async generateCategoryHierarchy(input: CategoryInput): Promise<number[]> {
    const result = await prisma.$transaction(async (tx) => {
      const lastHierarchyIds: number[] = [];

      for (const deptName of input.departments) {
        const deptHierarchy = await productHelper.findOrCreateCategoryHierarchy(
          tx,
          deptName,
          null,
          1,
        );

        for (const collName of input.collections) {
          const collHierarchy =
            await productHelper.findOrCreateCategoryHierarchy(
              tx,
              collName,
              deptHierarchy.id,
              2,
            );

          for (const catName of input.categories) {
            const catHierarchy =
              await productHelper.findOrCreateCategoryHierarchy(
                tx,
                catName,
                collHierarchy.id,
                3,
              );

            if (input.subcategories && input.subcategories.length > 0) {
              for (const subName of input.subcategories) {
                const subHierarchy =
                  await productHelper.findOrCreateCategoryHierarchy(
                    tx,
                    subName,
                    catHierarchy.id,
                    4,
                  );
                lastHierarchyIds.push(subHierarchy.id);
              }
            } else {
              lastHierarchyIds.push(catHierarchy.id);
            }
          }
        }
      }
      return lastHierarchyIds;
    });

    return result;
  }
}
