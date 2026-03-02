import { ProductHelper } from '@/helpers/product.helper';
import { GenerateSlug } from '@/utils/slug';
import { Tag } from 'generated/prisma/client';
import { prisma } from 'lib/prisma';

type DataInput = {
  data: string[];
};

type BrandInput = {
  slug: string;
  data: {
    bio: string;
    logo: string;
  };
};

type AttributeValue = {
  slug: string;
  data: { hexUrl: string };
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
  async updateBrand(input: BrandInput): Promise<string> {
    const { slug, data } = input;

    const brand = await prisma.brand.update({
      where: {
        slug,
      },
      data: data,
    });

    return `Update ${brand.name} brand details successfully`;
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
  async createAttributeValue(input: AttributeValueInput): Promise<string> {
    const { attributeId, values, hexUrls } = input;

    const attributeValue = await prisma.attributeValue.createMany({
      data: await Promise.all(
        values.map(async (value: string, idx: number) => ({
          attributeId,
          hexUrl: hexUrls ? hexUrls[idx] : null,
          slug: await GenerateSlug(value),
          value: value,
        })),
      ),
      skipDuplicates: true,
    });

    return `${attributeValue.count === 0 ? 'Attribute already exist' : `Create ${attributeValue.count} attribute successfully`} `;
  }
  async updateAttributeValue(input: AttributeValue): Promise<string> {
    const { slug, data } = input;

    const brand = await prisma.attributeValue.update({
      where: {
        slug,
      },
      data: data,
    });

    return `Update ${brand.value} brand details successfully`;
  }
  async fetchTag(): Promise<Tag[]> {
    const tag = await prisma.tag.findMany();
    return tag;
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
  async getAllHierarchyIds(slug: string): Promise<number[]> {
    const rootCategory = await prisma.category.findUnique({
      where: { slug: slug },
      include: { categoryHierarchies: true },
    });

    if (!rootCategory) return [];

    let allIds = rootCategory.categoryHierarchies.map((ch) => ch.id);
    let queue = [...allIds];

    while (queue.length) {
      const children = await prisma.categoryHierarchy.findMany({
        where: { parentId: { in: queue } },
        select: { id: true },
      });

      const childIds = children.map((c) => c.id);
      allIds.push(...childIds);
      queue = childIds;
    }

    return allIds;
  }
}
