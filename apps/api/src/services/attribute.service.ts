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
  async getAllHierarchyIds(slugs: string[]): Promise<number | null> {
    if (!slugs.length) return null;

    let currentHierarchies = await prisma.categoryHierarchy.findMany({
      where: { category: { slug: slugs[0] }, parentId: null },
      select: { id: true },
    });

    if (!currentHierarchies.length) return null;

    for (let i = 1; i < slugs.length; i++) {
      const nextSlug = slugs[i];
      currentHierarchies = await prisma.categoryHierarchy.findMany({
        where: {
          parentId: { in: currentHierarchies.map((h) => h.id) },
          category: { slug: nextSlug },
        },
        select: { id: true },
      });

      if (!currentHierarchies.length) return null;
    }

    return currentHierarchies[0]?.id ?? null;
  }
  async getAllDescendantHierarchyIds(parentId: number): Promise<number[]> {
    const parent = await prisma.categoryHierarchy.findUnique({
      where: { id: parentId },
      select: { path: true },
    });

    if (!parent) return [];

    const descendants = await prisma.categoryHierarchy.findMany({
      where: { path: { startsWith: parent.path + '.' } },
      select: { id: true },
    });

    return descendants.map((d) => d.id);
  }
  async getCategoryFilters(categoryId: number) {
    const parent = await prisma.categoryHierarchy.findUnique({
      where: { id: categoryId },
      select: {
        path: true,
        level: true,
        category: { select: { name: true, slug: true } },
      },
    });

    if (!parent) throw new Error('Category not found');

    const descendants = await prisma.categoryHierarchy.findMany({
      where: {
        path: {
          startsWith: parent.path + '.',
        },
      },
      select: {
        id: true,
        path: true,
        level: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { path: 'asc' },
    });

    const pathMap = new Map<string, any>();

    const root = {
      id: categoryId,
      name: parent.category.name,
      slug: parent.category.slug,
      subcategories: [],
    };
    pathMap.set(parent.path, root);

    for (const item of descendants) {
      const node = {
        id: item.id,
        name: item.category.name,
        slug: item.category.slug,
        subcategories: [],
      };
      pathMap.set(item.path, node);

      const parentPath = item.path.split('.').slice(0, -1).join('.');
      const parentNode = pathMap.get(parentPath);
      if (parentNode) {
        parentNode.subcategories.push(node);
      }
    }

    return root.subcategories;
  }
}
