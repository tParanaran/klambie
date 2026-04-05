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
} from '@/types/product.type';
import { prisma } from '../../lib/prisma';
import { GenerateSlug } from '@/utils/slug';
import { SKU } from '@/utils/sku';
import { PromotionService } from './promotion.service';
import { AttributeService } from './attribute.service';
import { initialCategories } from '@/utils/initialCategories';
import { SalesService } from './sales.service';
import FlattenCategories from '@/utils/categories';

const sku = new SKU();
const promotionService = new PromotionService();
const attributeService = new AttributeService();
const salesService = new SalesService();

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
    return { variants, hexUrl, tag, category, brand, img };
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
    totalItems: number;
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

    const takeLimit = limit || 24;
    const skipPage = page || 1;

    const data = await prisma.product.findMany({
      where: whereFilters,
      orderBy: prismaOrder,
      skip: skipPage != 1 ? (skipPage - 1) * takeLimit : 0,
      take: takeLimit,
      select: {
        id: true,
        name: true,
        basePrice: true,
        slug: true,
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

    const totalItems = await prisma.product.count({
      where: whereFilters,
    });

    let filters: Filters[] = initialCategories;

    if (hierarchyId) {
      filters = await attributeService.getCategoryFilters(hierarchyId);
    }

    if (sort === 'discount') {
      const discountedProducts = products.filter(
        (product) => product.hasDiscount,
      );
      return {
        products: discountedProducts,
        filters,
        totalItems: discountedProducts.length,
      };
    }

    return { products, filters, totalItems };
  }
  async getOneProduct(slug: string, user?: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        sku: true,
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

    if (!product) return null;

    const [products] = await Promise.all([this.getProductVariant(slug, user)]);

    const { productDetails, name, id, sku, productAttributes, sizingGuide } =
      product;

    const result: Product = {
      id,
      name,
      sku,
      productDetails,
      slug,
      attributes: productAttributes.map((atrr) => atrr.attribute),
      brand: products?.brand?.brandName ?? {
        name: 'Other',
        slug: 'other',
      },
      categories: products?.category?.categoriesName,
      tags: products?.tag?.tagsName,
      images: products?.img?.variantImages,
      variants: products?.variants,
    };

    return result;
  }
  async getProductDashboard({
    q,
    limit,
  }: GetProductDashboard): Promise<ProductDashboard[]> {
    const products = await prisma.product.findMany({
      select: {
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
          select: {
            id: true,
            sku: true,
            basePrice: true,
            stock: true,
            reservedStock: true,
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
      },
    });

    if (!products.length) return [];

    const variantIds = products.flatMap((p) =>
      p.productVariants.map((v) => v.id),
    );

    const soldMap = await salesService.getSoldQtyByVariant(variantIds);

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

    const result = products.map((p) => {
      let totalStock = 0;
      let totalSold = 0;
      let totalReserved = 0;

      const variants = p.productVariants.map((v) => {
        const soldQty = soldMap.get(v.id) || 0;

        totalStock += v.stock;
        totalSold += soldQty;
        totalReserved += v.reservedStock;

        const attributeText = v.productVariantAttributes
          .reverse()
          .map((a) => a.attributeValue.value)
          .join(' - ');

        const image = getVariantImage(v, p.images) || p.images[0].url;

        return {
          productVariantId: v.id,
          sku: v.sku,
          name: attributeText,
          stock: v.stock,
          reservedStock: v.reservedStock,
          price: v.basePrice,
          soldQty,
          image,
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
        image: p.images[0].url,
        productVariants: variants,
      };
    });

    return result;
  }
}
