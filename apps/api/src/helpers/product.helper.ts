import { GenerateSlug } from '@/utils/slug';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { PrismaClient } from '@generated/prisma/client';
import { ProductDashboard } from '@/types/product.type';
import { ValidateStock } from '@/types/cart.types';

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
  async baseSelect(sort?: string, order?: string, isActive?: string) {
    const variantOrder: any = {};

    if (sort === 'price') {
      variantOrder.basePrice = order || 'asc';
    } else if (sort === 'stock') {
      variantOrder.stock = order || 'desc';
    } else if (sort === 'order') {
      variantOrder.reservedStock = order || 'desc';
    } else if (sort === 'sales') {
      variantOrder.soldQty === order || 'desc';
    }

    const whereClause: any = {};

    if (isActive) {
      whereClause.isActive = isActive === 'true' ? true : false;
    }

    return {
      id: true,
      name: true,
      sku: true,
      slug: true,
      basePrice: true,
      status: true,
      brand: {
        select: { name: true },
      },
      images: {
        select: {
          url: true,
          attributeValueId: true,
        },
      },
      productVariants: {
        where: whereClause,
        orderBy: variantOrder,
        select: {
          id: true,
          sku: true,
          basePrice: true,
          isActive: true,
          stock: true,
          reservedStock: true,
          soldQty: true,
          productVariantAttributes: {
            select: {
              attributeValue: {
                select: {
                  id: true,
                  value: true,
                  attribute: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  async mapProducts(products: any[]): Promise<ProductDashboard[]> {
    const getVariantImage = (
      variant: any,
      images: { url: string; attributeValueId: number | null }[],
    ): string | null => {
      const attributeValueIds = variant.productVariantAttributes.map(
        (a: any) => a.attributeValue.id,
      );

      const variantImage = images.find(
        (img) =>
          img.attributeValueId &&
          attributeValueIds.includes(img.attributeValueId),
      );

      if (variantImage) return variantImage.url;

      const productImage = images.find((img) => !img.attributeValueId);

      return productImage ? productImage.url : null;
    };

    return products.map((p) => {
      let totalStock = 0;
      let totalSold = 0;
      let totalReserved = 0;

      const variants = p.productVariants.map((v: any) => {
        totalStock += v.stock;
        totalSold += v.soldQty;
        totalReserved += v.reservedStock;

        const name = v.productVariantAttributes
          .map((a: any) => a.attributeValue.value)
          .join(' - ');

        return {
          productVariantId: v.id,
          sku: v.sku,
          name,
          stock: v.stock,
          reservedStock: v.reservedStock,
          isActive: v.isActive,
          price: v.basePrice,
          soldQty: v.soldQty,
          image: getVariantImage(v, p.images) || p.images[0].url,
        };
      });

      return {
        productId: p.id,
        name: p.name,
        brand: p.brand?.name || 'Other',
        sku: p.sku,
        status: p.status,
        slug: p.slug,
        price: p.basePrice,
        stock: totalStock,
        reservedStock: totalReserved,
        soldQty: totalSold,
        image: p.images?.[0]?.url || null,
        productVariants: variants,
      };
    });
  }
  async getPagination({
    page = 1,
    limit = 10,
    totalItems,
  }: {
    page?: number;
    limit?: number;
    totalItems: number;
  }) {
    const take = limit;
    const totalPages = Math.ceil(totalItems / take);

    const currentPage = page;
    const safePage = currentPage > totalPages ? totalPages || 1 : currentPage;

    const skip = (safePage - 1) * take;

    return {
      take,
      skip,
      currentPages: safePage,
      totalPages,
    };
  }
  async validateStock({
    status,
    isActive,
    stock,
    reservedStock,
  }: ValidateStock) {
    const isProductActive = status === 'ACTIVE';
    const isVariantActive = isActive !== false;
    const isInStock = stock - reservedStock > 0;
    const availableStock = stock - reservedStock;

    const inStock = isProductActive && isVariantActive && isInStock;

    return { availableStock, inStock };
  }
}
