import { GenerateSlug } from '@/utils/slug';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { Prisma, PrismaClient } from '@generated/prisma/client';
import {
  ExistingProduct,
  InsertProduct,
  ProductDashboard,
} from '@/types/product.type';
import { ValidateStock } from '@/types/cart.types';
import { SKU } from '@/utils/sku';

const sku = new SKU();

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
      type: true,
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
        type: p.type,
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
  async buildProductData(data: InsertProduct) {
    const baseData: any = {
      name: data.name ?? '',
      status: data.status,
      brandId: data.brandId ?? 0,
      sizingGuideId: data.sizingGuideId ? data.sizingGuideId : 1,
      slug: await GenerateSlug(data.name ?? 'draft'),
      sku: await sku.generateProductSKU(
        data.name ?? 'draft',
        data.brandId ?? 0,
      ),
      type: data.type,
      basePrice: data.basePrice ?? 0,
    };

    if (data.productDetails) {
      baseData.productDetails = {
        create: data.productDetails,
      };
    }

    if (data.productAttributes?.length) {
      baseData.productAttributes = {
        create: data.productAttributes.map((attr) => ({
          attributeId: attr.attributeId,
          imageBased: attr.imageBased ?? false,
          values: {
            create: attr.values.map((valueId: number) => ({
              attributeValueId: valueId,
            })),
          },
        })),
      };
    }

    if (data.productCategories?.length) {
      baseData.productCategories = {
        create: data.productCategories.map((path: string) => {
          const ids = path.split('.').map(Number);
          return {
            categoryHierarchyId: ids[ids.length - 1],
          };
        }),
      };
    }

    if (data.productTags?.length) {
      baseData.productTags = {
        create: data.productTags.map((id: number) => ({
          tagId: id,
        })),
      };
    }

    if (data.images?.length) {
      baseData.images = {
        create: data.images,
      };
    }

    return baseData;
  }
  async buildUpdateData(data: InsertProduct) {
    return {
      name: data.name,
      status: data.status,
      brandId: data.brandId,
      sizingGuideId: data.sizingGuideId,
      type: data.type,
      basePrice: data.basePrice,
      slug: data.name ? await GenerateSlug(data.name) : undefined,
      sku: await sku.generateProductSKU(
        data.name ?? 'draft',
        data.brandId ?? 0,
      ),

      productDetails: data.productDetails
        ? {
            upsert: {
              update: data.productDetails,
              create: data.productDetails,
            },
          }
        : undefined,

      productAttributes: {
        deleteMany: {},
        create:
          data.productAttributes?.map((attr) => ({
            attributeId: attr.attributeId,
            imageBased: attr.imageBased ?? false,
            values: {
              create: attr.values.map((v) => ({
                attributeValueId: v,
              })),
            },
          })) ?? [],
      },

      productCategories: {
        deleteMany: {},
        create:
          data.productCategories?.map((path) => {
            const ids = path.split('.').map(Number);
            return { categoryHierarchyId: ids.at(-1)! };
          }) ?? [],
      },

      productTags: {
        deleteMany: {},
        create: data.productTags?.map((id) => ({ tagId: id })) ?? [],
      },

      images: {
        deleteMany: {},
        create: data.images ?? [],
      },
    };
  }
  async buildDraftVariants(product: ExistingProduct, data?: InsertProduct) {
    if (!data?.productVariants.length) return undefined;

    const create = await Promise.all(
      data.productVariants.map(async (va) => {
        const attrs = va.attributeValueId ?? [];
        const hasAttributes = attrs.length > 0;

        return {
          barcode: va.barcode ?? null,
          basePrice: va.basePrice ?? 0,
          stock: va.stock ?? 0,
          isActive: data.status === 'DRAFT' ? false : true,

          sku: hasAttributes
            ? await sku.generateVariantSKU(product.sku, attrs)
            : null,

          ...(hasAttributes && {
            productVariantAttributes: {
              create: attrs.map((id) => ({
                attributeValueId: id,
              })),
            },
          }),
        };
      }),
    );

    return {
      deleteMany: {},
      create,
    };
  }
  async buildActiveVariants(
    tx: Prisma.TransactionClient,
    product: ExistingProduct,
    data: InsertProduct,
  ) {
    if (!data.productVariants) return;

    const getKey = (ids: number[] = []) =>
      [...ids].sort((a, b) => a - b).join('-');

    const existingMap = new Map(
      product.productVariants.map((v: any) => [
        getKey(v.productVariantAttributes.map((a: any) => a.attributeValueId)),
        v,
      ]),
    );

    const incomingMap = new Map(
      data.productVariants.map((v) => [getKey(v.attributeValueId), v]),
    );

    const toDelete: number[] = [];
    const toCreate: any[] = [];
    const toCreateMeta: any[] = [];
    const toUpdate: any[] = [];

    for (const [key, existing] of existingMap) {
      if (!incomingMap.has(key)) {
        toDelete.push(existing.id);
      }
    }

    for (const [key, incoming] of incomingMap) {
      const existing = existingMap.get(key);
      const attrs = incoming.attributeValueId ?? [];
      const hasAttr = attrs.length > 0;

      if (!existing) {
        const skuCode = hasAttr
          ? await sku.generateVariantSKU(product.sku, attrs)
          : null;

        toCreate.push({
          productId: product.id,
          barcode: incoming.barcode ?? null,
          basePrice: incoming.basePrice ?? 0,
          stock: incoming.stock ?? 0,
          isActive: true,
          sku: skuCode,
        });

        toCreateMeta.push({
          sku: skuCode,
          attrs,
        });
      } else {
        toUpdate.push({
          where: { id: existing.id },
          data: {
            barcode: incoming.barcode ?? existing.barcode,
            basePrice: incoming.basePrice ?? existing.basePrice,
            ...(incoming.stock !== undefined && {
              stock: incoming.stock,
            }),
          },
        });
      }
    }

    if (toDelete.length) {
      await tx.productVariant.deleteMany({
        where: { id: { in: toDelete } },
      });
    }

    if (toCreate.length) {
      await tx.productVariant.createMany({
        data: toCreate,
        skipDuplicates: true,
      });

      const createdVariants = await tx.productVariant.findMany({
        where: {
          productId: product.id,
          sku: { in: toCreateMeta.map((v) => v.sku).filter(Boolean) },
        },
      });

      const attrRows = createdVariants.flatMap((variant) => {
        const meta = toCreateMeta.find((m) => m.sku === variant.sku);
        if (!meta) return [];

        return meta.attrs.map((attrId: number) => ({
          productVariantId: variant.id,
          attributeValueId: attrId,
        }));
      });

      if (attrRows.length) {
        await tx.productVariantAttribute.createMany({
          data: attrRows,
          skipDuplicates: true,
        });
      }
    }

    for (const update of toUpdate) {
      await tx.productVariant.update(update);
    }
  }
}
