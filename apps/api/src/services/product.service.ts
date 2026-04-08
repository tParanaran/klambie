import {
  Products,
  Brand,
  Category,
  Images,
  InsertProduct,
  Product,
  Tag,
  VariantProduct,
  Filters,
  GetAllProducts,
  ProductDashboard,
  GetProductDashboard,
  Pagination,
  GroupedAttributes,
} from '@/types/product.type';
import { prisma } from '../../lib/prisma';
import { GenerateSlug } from '@/utils/slug';
import { SKU } from '@/utils/sku';
import { PromotionService } from './promotion.service';
import { AttributeService } from './attribute.service';
import { initialCategories } from '@/utils/initialCategories';
import FlattenCategories from '@/utils/categories';
import { ProductHelper } from '@/helpers/product.helper';

const sku = new SKU();
const productHelper = new ProductHelper();
const promotionService = new PromotionService();
const attributeService = new AttributeService();

export class ProductService {
  async newProduct(data: InsertProduct): Promise<{ message: string }> {
    const { name, brandId, sizingGuideId, basePrice } = data;
    const { productDetails, productCategories, productTags, images } = data;
    const { productAttributes, productVariants } = data;

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name,
          brandId,
          slug: await GenerateSlug(name),
          sku: await sku.generateProductSKU(name, brandId),
          sizingGuideId,
          basePrice,
          productDetails: {
            create: productDetails,
          },
          productAttributes: {
            create: productAttributes,
          },
          productCategories: {
            create: productCategories.map((id: number) => ({
              categoryHierarchyId: id,
            })),
          },
          ...(productTags &&
            productTags.length > 0 && {
              productTags: {
                create: productTags.map((id: number) => ({
                  tagId: id,
                })),
              },
            }),
          images: {
            create: images,
          },
        },
      });

      for (const va of productVariants) {
        await tx.productVariant.create({
          data: {
            barcode: null,
            productId: product.id,
            sku: await sku.generateVariantSKU(product.sku, va.attributeValueId),
            basePrice: va.basePrice,
            stock: va.stock,
            isActive: true,
            productVariantAttributes: {
              create: va.attributeValueId.map((attributeValueId: number) => ({
                attributeValueId: attributeValueId,
              })),
            },
          },
        });
      }
      return product.name;
    });

    return { message: `Create ${result} Successfully` };
  }
  async getImages(slug: string): Promise<Images | null> {
    const img = await prisma.product.findUnique({
      where: { slug },
      select: {
        images: true,
      },
    });

    if (!img) return null;

    const images = [...new Set(img.images.map((i) => i.url).filter(Boolean))];
    const variantImages = img.images.map((i) => ({
      attributeId: i.attributeValueId,
      url: i.url,
    }));

    return { images, variantImages };
  }
  async getBrand(slugProduct: string): Promise<Brand | null> {
    const brand = await prisma.product.findUnique({
      where: { slug: slugProduct },
      select: {
        brand: {
          select: {
            name: true,
            slug: true,
            id: true,
          },
        },
      },
    });
    if (!brand) return null;

    const { id, name, slug } = brand.brand;

    return {
      brandId: id,
      brandName: { name, slug },
    };
  }
  async getProductTag(slug: string): Promise<Tag | null> {
    const tag = await prisma.product.findUnique({
      where: { slug },
      select: {
        productTags: {
          select: {
            tag: {
              select: { name: true, id: true, slug: true },
            },
          },
        },
      },
    });

    if (!tag) return null;
    const tagsId = [
      ...new Set(tag.productTags.map((t) => t.tag.id).filter(Boolean)),
    ];

    const tagsName = [
      ...new Set(
        tag.productTags
          .map((t) => ({ name: t.tag.name, slug: t.tag.slug }))
          .filter(Boolean),
      ),
    ];

    return { tagsId, tagsName };
  }
  async getProductCategory(slug: string): Promise<Category | null> {
    const category = await prisma.product.findUnique({
      where: { slug },
      select: {
        productCategories: {
          select: {
            categoryHierarchy: {
              select: {
                category: { select: { name: true, id: true, slug: true } },
                parent: {
                  select: {
                    category: { select: { name: true, id: true, slug: true } },
                    parent: {
                      select: {
                        category: {
                          select: { name: true, id: true, slug: true },
                        },
                        parent: {
                          select: {
                            category: {
                              select: { name: true, id: true, slug: true },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!category) return null;
    const categoriesId = [
      ...new Set(
        category.productCategories.flatMap(
          (pc) => FlattenCategories(pc.categoryHierarchy).categoriesId,
        ),
      ),
    ];
    const categories = category.productCategories.flatMap(
      (pc) => FlattenCategories(pc.categoryHierarchy).categories,
    );

    const categoriesName = categories.filter(
      (cat, index, self) =>
        index === self.findIndex((c) => c.name === cat.name),
    );

    return { categoriesId, categoriesName };
  }
  async getProductVariant(
    slug: string,
    user?: number,
  ): Promise<{
    variants: VariantProduct[];
    groupedAttributes: GroupedAttributes[];
    hexUrl: string[];
    tag: Tag | null;
    category: Category | null;
    brand: Brand | null;
    img: Images | null;
  } | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        productVariants: {
          select: {
            id: true,
            sku: true,
            barcode: true,
            basePrice: true,
            stock: true,
            reservedStock: true,
            productVariantAttributes: {
              select: {
                attributeValue: {
                  select: {
                    value: true,
                    id: true,
                    hexUrl: true,
                    attribute: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!product) return null;

    const [category, tag, brand, img] = await Promise.all([
      this.getProductCategory(slug),
      this.getProductTag(slug),
      this.getBrand(slug),
      this.getImages(slug),
    ]);

    const hexUrl = [
      ...new Set(
        product.productVariants.flatMap((v) =>
          v.productVariantAttributes
            .map((a) => a.attributeValue.hexUrl)
            .filter((url): url is string => !!url),
        ),
      ),
    ];

    const variants: VariantProduct[] = await Promise.all(
      product.productVariants.map(async (v) => {
        const promoInput = {
          user: user,
          product: {
            id: v.id,
            basePrice: v.basePrice,
            quantity: 1,
            brandId: brand?.brandId,
            categoriesId: category?.categoriesId,
            tagsId: tag?.tagsId,
          },
        };
        const { hasDiscount, appliedPromotion, price } =
          await promotionService.promotionRuleCheck(promoInput);

        const availableStock = v.stock - v.reservedStock;

        return {
          id: v.id,
          sku: v.sku,
          price,
          hasDiscount,
          appliedPromotion,
          availableStock,
          inStock: availableStock > 0,
          attributes: v.productVariantAttributes.map((va) => ({
            id: va.attributeValue.id,
            value: va.attributeValue.value,
            hexUrl: va.attributeValue.hexUrl,
            attribute: {
              id: va.attributeValue.attribute.id,
              name: va.attributeValue.attribute.name,
            },
          })),
        };
      }),
    );

    const groupedAttributes =
      await attributeService.groupedAttributes(variants);

    return { variants, groupedAttributes, hexUrl, tag, category, brand, img };
  }
  async getAllProducts({
    slugs,
    tag,
    user,
    includeDescendants = true,
    brands,
    attributeIds,
    categoryIds,
    order,
    sort,
    limit,
    page,
    price,
    q,
  }: GetAllProducts): Promise<{
    products: Products[];
    filters: Filters[];
    pages: Pagination;
  } | null> {
    let hierarchyIds: number[] = [];
    let hierarchyId: number | null = null;

    slugs = slugs || [];

    if (slugs.length > 0) {
      hierarchyId = await attributeService.getAllHierarchyIds(slugs);
      if (hierarchyId) {
        hierarchyIds = [hierarchyId];

        if (includeDescendants) {
          const descendants =
            await attributeService.getAllDescendantHierarchyIds(hierarchyId);
          hierarchyIds =
            descendants.length > 0
              ? [hierarchyId, ...descendants]
              : [hierarchyId];
        }
      }
    }

    hierarchyIds = Array.from(new Set(hierarchyIds));

    let priceFilter = {};

    if (price) {
      const [min, max] = price.split('-').map(Number);

      priceFilter = {
        basePrice: {
          ...(min ? { gte: min } : {}),
          ...(max ? { lte: max } : {}),
        },
      };
    }

    const prismaOrder: any = {};
    if (sort) {
      switch (sort) {
        case 'price':
          prismaOrder.basePrice = order || 'asc';
          break;
        case 'latest':
          prismaOrder.createdAt = order || 'desc';
          break;
        // case 'rating':
        //   prismaOrder.rating = order || 'desc';
        //   break; NEXT FEATURE
      }
    }

    const whereFilters: any = {
      status: 'ACTIVE',
      ...priceFilter,
      ...(hierarchyIds.length > 0
        ? {
            productCategories: {
              some: {
                categoryHierarchyId: { in: hierarchyIds },
              },
            },
          }
        : {}),
      ...(categoryIds && categoryIds.length > 0
        ? {
            productCategories: {
              some: {
                categoryHierarchy: {
                  categoryId: { in: categoryIds },
                },
              },
            },
          }
        : {}),
      ...(tag && {
        productTags: {
          some: {
            tag: {
              slug: tag,
            },
          },
        },
      }),
      ...(brands && brands.length > 0
        ? { brand: { slug: { in: brands } } }
        : {}),
      ...(attributeIds && attributeIds.length > 0
        ? {
            productVariants: {
              some: {
                productVariantAttributes: {
                  some: {
                    attributeValueId: { in: attributeIds },
                  },
                },
              },
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { slug: { contains: q } },
              {
                brand: {
                  is: {
                    name: { contains: q },
                  },
                },
              },
              {
                productDetails: {
                  is: {
                    description: { contains: q },
                  },
                },
              },
              {
                productDetails: {
                  is: {
                    feature: { contains: q },
                  },
                },
              },
              {
                productDetails: {
                  is: {
                    material: { contains: q },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const totalItems = await prisma.product.count({
      where: whereFilters,
    });

    const { skip, take, totalPages, currentPages } =
      await productHelper.getPagination({
        page,
        limit,
        totalItems,
      });

    const data = await prisma.product.findMany({
      where: whereFilters,
      orderBy: prismaOrder,
      skip,
      take,
      select: {
        id: true,
        name: true,
        basePrice: true,
        slug: true,
        type: true,
        productVariants: {
          select: {
            basePrice: true,
            stock: true,
            reservedStock: true,
          },
        },
      },
    });

    if (!data) return null;

    const products: Products[] = await Promise.all(
      data.map(async (p) => {
        const [product] = await Promise.all([
          this.getProductVariant(p.slug, user),
        ]);

        const promoInput = {
          variants: p.productVariants,
          user: user,
          product: {
            id: p.id,
            basePrice: p.basePrice,
            quantity: 1, // Default
            brandId: product?.brand?.brandId,
            categoriesId: product?.category?.categoriesId,
            tagsId: product?.tag?.tagsId,
          },
        };

        const { hasDiscount, appliedPromotion, price } =
          await promotionService.promotionRuleCheck(promoInput);

        return {
          name: p.name,
          slug: p.slug,
          price,
          hasDiscount,
          appliedPromotion,
          type: p.type,
          brand: product?.brand?.brandName ?? {
            name: 'Other',
            slug: 'other',
          },
          hexUrl: product?.hexUrl,
          categories: product?.category?.categoriesName,
          tags: product?.tag?.tagsName,
          images: product?.img?.images,
        };
      }),
    );

    let filters: Filters[] = initialCategories;

    if (hierarchyId) {
      filters = await attributeService.getCategoryFilters(hierarchyId);
    }

    if (sort === 'discount') {
      const discountedProducts = products.filter(
        (product) => product.hasDiscount,
      );

      const totalItems = discountedProducts.length;

      const { totalPages, currentPages } = await productHelper.getPagination({
        totalItems,
        limit,
        page,
      });
      return {
        products: discountedProducts,
        filters,
        pages: { totalItems, totalPages, currentPages },
      };
    }

    return {
      products,
      filters,
      pages: { totalItems, totalPages, currentPages },
    };
  }
  async getOneProduct(
    slug: string,
    user?: number,
  ): Promise<{
    product: Product;
    groupedAttributes: GroupedAttributes[];
  } | null> {
    const data = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        sku: true,
        type: true,
        productDetails: true,
        sizingGuide: {
          select: {
            guideData: true,
          },
        },
        productAttributes: {
          select: {
            attribute: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!data) return null;

    const [products] = await Promise.all([this.getProductVariant(slug, user)]);

    if (!products) return null;

    const {
      productDetails,
      name,
      id,
      sku,
      productAttributes,
      type,
      sizingGuide,
    } = data;

    const product: Product = {
      id,
      name,
      sku,
      type,
      productDetails,
      slug,
      attributes: productAttributes.map((atrr) => atrr.attribute),
      brand: products?.brand?.brandName ?? {
        name: 'Other',
        slug: 'other',
      },
      categories: products.category?.categoriesName,
      tags: products.tag?.tagsName,
      images: products.img?.variantImages,
      variants: products.variants,
    };

    const groupedAttributes = await attributeService.groupedAttributes(
      product.variants,
    );

    return { product, groupedAttributes };
  }
  async getProductDashboard({
    q,
    limit,
    page,
    order,
    sort,
    sortBy,
    orderBy,
  }: GetProductDashboard): Promise<{
    products: ProductDashboard[];
    pages: Pagination;
  }> {
    const whereClause: any = {};

    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { sku: { contains: q } },
        {
          brand: {
            name: { contains: q },
          },
        },
      ];
    }
    const isAggregateSort =
      sortBy === 'stock' || sortBy === 'order' || sortBy === 'sales';

    if (isAggregateSort) {
      const fieldMap = {
        stock: 'stock',
        order: 'reservedStock',
        sales: 'soldQty',
      };

      const field = fieldMap[sortBy];

      let filteredProductIds: number[] | undefined;

      if (q) {
        const filteredProducts = await prisma.product.findMany({
          where: whereClause,
          select: { id: true },
        });

        filteredProductIds = filteredProducts.map((p) => p.id);
      }

      const grouped = await prisma.productVariant.groupBy({
        by: ['productId'],
        where: filteredProductIds
          ? { productId: { in: filteredProductIds } }
          : undefined,
        _sum: {
          [field]: true,
        },
        orderBy: {
          _sum: {
            [field]: orderBy || 'desc',
          },
        },
      });

      const totalItems = grouped.length;

      const { take, currentPages, totalPages } =
        await productHelper.getPagination({
          page,
          limit,
          totalItems,
        });

      const paginatedIds = grouped
        .slice((currentPages - 1) * take, currentPages * take)
        .map((g) => g.productId);

      const rawProducts = await prisma.product.findMany({
        where: {
          id: { in: paginatedIds },
        },
        select: await productHelper.baseSelect(sort, order),
      });

      const sortedProducts = paginatedIds.map((id) =>
        rawProducts.find((p) => p.id === id),
      );

      return {
        products: await productHelper.mapProducts(sortedProducts),
        pages: { totalItems, totalPages, currentPages },
      };
    }

    let prismaOrder: any = {};

    if (sortBy === 'price') {
      prismaOrder = { basePrice: orderBy || 'asc' };
    }

    const totalItems = await prisma.product.count({
      where: whereClause,
    });

    const { take, skip, currentPages, totalPages } =
      await productHelper.getPagination({ page, limit, totalItems });

    const products = await prisma.product.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: prismaOrder,
      select: await productHelper.baseSelect(sort, order),
    });

    return {
      products: await productHelper.mapProducts(products),
      pages: { totalItems, totalPages, currentPages },
    };
  }
  async toggleProductStatus(
    id: number,
    data: { isArchive: boolean },
  ): Promise<{ message: string }> {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const { isArchive } = data;

    let newStatus: 'ACTIVE' | 'ARCHIVE';

    if (isArchive) {
      newStatus = 'ARCHIVE';
    } else {
      newStatus = product.status === 'ACTIVE' ? 'ARCHIVE' : 'ACTIVE';
    }

    await prisma.product.update({
      where: { id },
      data: { status: newStatus },
    });

    return { message: `Status updated to ${newStatus}` };
  }
  async updateProduct(
    id: number,
    data: Partial<InsertProduct>,
  ): Promise<{ message: string }> {
    const {
      name,
      brandId,
      sizingGuideId,
      basePrice,
      productDetails,
      productCategories,
      productTags,
      images,
      productAttributes,
    } = data;

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          ...(name && {
            name,
            slug: await GenerateSlug(name),
          }),
          ...(brandId && { brandId }),
          ...(sizingGuideId && { sizingGuideId }),
          ...(basePrice !== undefined && { basePrice }),

          ...(productDetails && {
            productDetails: {
              deleteMany: {},
              create: productDetails,
            },
          }),

          ...(productAttributes && {
            productAttributes: {
              deleteMany: {},
              create: productAttributes,
            },
          }),

          ...(productCategories && {
            productCategories: {
              deleteMany: {},
              create: productCategories.map((id: number) => ({
                categoryHierarchyId: id,
              })),
            },
          }),

          ...(productTags && {
            productTags: {
              deleteMany: {},
              create: productTags.map((id: number) => ({
                tagId: id,
              })),
            },
          }),

          ...(images && {
            images: {
              deleteMany: {},
              create: images,
            },
          }),
        },
      });

      return product.name;
    });

    return { message: `Update ${result} successfully` };
  }
  async updateVariant(
    id: number,
    data: { stock: number; basePrice: number },
  ): Promise<{ message: string }> {
    const result = await prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.update({
        where: { id },
        data: { ...data },
        select: {
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
      });

      return variant.productVariantAttributes
        .reverse()
        .map((a) => a.attributeValue.value)
        .join(' - ');
    });

    return { message: `Update ${result} variant successfully` };
  }
  async deleteProduct(id: number): Promise<{ message: string }> {
    const result = await prisma.product.delete({
      where: { id },
    });

    return { message: `Delete ${result.name} successfully` };
  }
  async deleteVariant(variantId: number) {
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      select: {
        productId: true,
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
    });

    if (!variant) {
      throw new Error('Variant not found');
    }

    const totalVariants = await prisma.productVariant.count({
      where: {
        productId: variant.productId,
      },
    });

    if (totalVariants <= 1) {
      throw new Error('Cannot delete the only variant of this product');
    }

    const attributeText = variant.productVariantAttributes
      .reverse()
      .map((a) => a.attributeValue.value)
      .join(' - ');

    await prisma.productVariant.delete({
      where: { id: variantId },
    });

    return { message: `Delete variant ${attributeText} successfully` };
  }
}
