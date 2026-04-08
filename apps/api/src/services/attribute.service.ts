import { ProductHelper } from '@/helpers/product.helper';
import {
  Filters,
  GroupedAttributes,
  VariantProduct,
} from '@/types/product.type';
import { GenerateSlug } from '@/utils/slug';
import { Tag } from '@generated/prisma/client';
import { prisma } from '@lib/prisma';

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
  async getAllBrands(): Promise<
    {
      [k: string]: string | number | Date | null | boolean;
    }[]
  > {
    const data = await prisma.brand.findMany();
    const brands = data.map((item) => {
      return Object.fromEntries(
        Object.entries(item).filter(([_, value]) => value !== null),
      );
    });
    return brands;
  }
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
  async getAllAttributeValue() {
    const attributesWithValues = await prisma.attribute.findMany({
      include: {
        attributeValues: true,
      },
    });

    const attributes = attributesWithValues.map((attr) => ({
      ...attr,
      attributeValues: attr.attributeValues.map((val) => {
        return Object.fromEntries(
          Object.entries(val).filter(
            ([key, v]) => v !== null && key !== 'attributeId',
          ),
        );
      }),
    }));

    return attributes;
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
  async getAllHierarchyIds(
    values: (string | number)[],
  ): Promise<number | null> {
    if (!values.length) return null;
    const isSlug = typeof values[0] === 'string';

    let currentHierarchies = await prisma.categoryHierarchy.findMany({
      where: isSlug
        ? { category: { slug: values[0] as string }, parentId: null }
        : { category: { id: values[0] as number }, parentId: null },
      select: { id: true },
    });

    if (!currentHierarchies.length) return null;

    for (let i = 1; i < values.length; i++) {
      const val = values[i];
      currentHierarchies = await prisma.categoryHierarchy.findMany({
        where: isSlug
          ? {
              parentId: { in: currentHierarchies.map((h) => h.id) },
              category: { slug: val as string },
            }
          : {
              parentId: { in: currentHierarchies.map((h) => h.id) },
              id: val as number,
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
  async getCategoryFilters(categoryId: number): Promise<Filters[]> {
    const parent = await prisma.categoryHierarchy.findUnique({
      where: { id: categoryId },
      select: {
        path: true,
        level: true,
        category: { select: { name: true, slug: true, id: true } },
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
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { path: 'asc' },
    });

    const pathMap = new Map<string, any>();

    const root = {
      id: parent.category.id,
      name: parent.category.name,
      level: parent.level,
      slug: parent.category.slug,
      subcategories: [],
    };
    pathMap.set(parent.path, root);

    for (const item of descendants) {
      const node = {
        id: item.category.id,
        name: item.category.name,
        level: item.level,
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
  async getAllCategoryTree(): Promise<Filters[]> {
    const categories = await prisma.categoryHierarchy.findMany({
      select: {
        id: true,
        path: true,
        level: true,
        category: {
          select: {
            name: true,
            slug: true,
            id: true,
          },
        },
      },
      orderBy: { path: 'asc' },
    });

    const pathMap = new Map<string, any>();
    const roots: Filters[] = [];

    for (const item of categories) {
      if (!item.category) continue;
      const node: Filters = {
        id: item.category.id,
        name: item.category.name,
        slug: item.category.slug,
        level: item.level,
        subcategories: [],
      };

      pathMap.set(item.path, node);

      const parentPath = item.path.split('.').slice(0, -1).join('.');
      if (parentPath && pathMap.has(parentPath)) {
        pathMap.get(parentPath).subcategories.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
  async groupedAttributes(variants: VariantProduct[]) {
    const map = new Map<number, GroupedAttributes>();

    const validValueIds = new Set<number>();

    variants.forEach((v) => {
      if (!v.inStock) return;

      v.attributes.forEach((a) => {
        validValueIds.add(a.id);
      });
    });

    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        const attributeId = attr.attribute.id;

        if (!map.has(attributeId)) {
          map.set(attributeId, {
            attributeId,
            attributeName: attr.attribute.name,
            values: [],
          });
        }

        const group = map.get(attributeId)!;

        const existing = group.values.find((v) => v.id === attr.id);

        if (!existing) {
          group.values.push({
            id: attr.id,
            variantId: variant.id,
            value: attr.value,
            hexUrl: attr.hexUrl,
            inStock: variant.inStock,
            isDisabled: !validValueIds.has(attr.id),
          });
        }
      });
    });

    return Array.from(map.values()).reverse();
  }
}
