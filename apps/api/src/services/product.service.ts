import flattenCategories from '@/utils/categories';
import {
  AllProductsResponse,
  InsertProduct,
  OneProductResponse,
} from '@/types/product.type';
import { prisma } from 'lib/prisma';
import { GenerateSlug } from '@/utils/slug';
import { SKU } from '@/utils/sku';
import { PromotionService } from './promotion.service';

const sku = new SKU();
const promotionService = new PromotionService();

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
          productTags: {
            create: productTags.map((id: number) => ({
              tagId: id,
            })),
          },
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
  async getAllProducts(user?: number): Promise<AllProductsResponse[]> {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        basePrice: true,
        slug: true,
        brand: {
          select: {
            name: true,
            id: true,
          },
        },
        productVariants: {
          select: {
            basePrice: true,
            stock: true,
            productVariantAttributes: {
              select: {
                attributeValue: {
                  select: {
                    hexUrl: true,
                  },
                },
              },
            },
          },
        },
        productCategories: {
          select: {
            categoryHierarchy: {
              select: {
                category: { select: { name: true, id: true } },
                parent: {
                  select: {
                    category: { select: { name: true, id: true } },
                    parent: {
                      select: {
                        category: { select: { name: true, id: true } },
                        parent: {
                          select: {
                            category: { select: { name: true, id: true } },
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
        productTags: {
          select: {
            tag: {
              select: { name: true, id: true },
            },
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    const result = await Promise.all(
      products.map(async (p) => {
        const inputPrice = {
          variants: p.productVariants,
          user: user,
          productInfo: {
            id: p.id,
            basePrice: p.basePrice,
            brandId: p.brand.id,
            categoriesId: [
              ...new Set(
                p.productCategories.flatMap(
                  (pc) => flattenCategories(pc.categoryHierarchy).categoriesId,
                ),
              ),
            ],
            tagsId: [
              ...new Set(p.productTags.map((t) => t.tag.id).filter(Boolean)),
            ],
          },
        };

        const { price } = await promotionService.promotionRuleCheck(inputPrice);

        return {
          name: p.name,
          slug: p.slug,
          price,
          brand: p.brand.name,
          variants: [
            ...new Set(
              p.productVariants.flatMap((v) =>
                v.productVariantAttributes
                  .map((a) => a.attributeValue.hexUrl)
                  .filter(Boolean),
              ),
            ),
          ],
          categories: [
            ...new Set(
              p.productCategories.flatMap(
                (pc) => flattenCategories(pc.categoryHierarchy).categories,
              ),
            ),
          ],
          tags: [
            ...new Set(p.productTags.map((t) => t.tag.name).filter(Boolean)),
          ],
          images: [...new Set(p.images.map((i) => i.url).filter(Boolean))],
        };
      }),
    );

    return result;
  }
  async getOneProduct(
    slug: string,
    user?: number,
  ): Promise<OneProductResponse | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        basePrice: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        productDetails: {
          select: {
            description: true,
            length: true,
            material: true,
            feature: true,
            weight: true,
            width: true,
            height: true,
            volume: true,
            care: true,
          },
        },
        sizingGuide: {
          select: {
            guideData: true,
          },
        },
        productCategories: {
          select: {
            categoryHierarchy: {
              select: {
                category: { select: { name: true, id: true } },
                parent: {
                  select: {
                    category: { select: { name: true, id: true } },
                    parent: {
                      select: {
                        category: { select: { name: true, id: true } },
                        parent: {
                          select: {
                            category: { select: { name: true, id: true } },
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
        productTags: {
          select: {
            tag: {
              select: { name: true, id: true },
            },
          },
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
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!product) return null;

    const {
      productDetails,
      name,
      id,
      brand,
      images,
      productTags,
      sizingGuide,
      productCategories,
    } = product;

    const variants = await Promise.all(
      product.productVariants.map(async (v) => {
        const inputPrice = {
          variants: null,
          user: user,
          productInfo: {
            id: v.id,
            basePrice: v.basePrice,
            brandId: product.brand.id,
            categoriesId: [
              ...new Set(
                productCategories.flatMap(
                  (pc) => flattenCategories(pc.categoryHierarchy).categoriesId,
                ),
              ),
            ],
            tagsId: [
              ...new Set(productTags.map((t) => t.tag.id).filter(Boolean)),
            ],
          },
        };
        const { price } = await promotionService.promotionRuleCheck(inputPrice);

        return {
          id: v.id,
          sku: v.sku,
          price,
          stock: v.stock,
          inStock: v.stock > 0,
          attributes: v.productVariantAttributes.map((va) => ({
            id: va.attributeValue.id,
            value: va.attributeValue.value,
            hexUrl: va.attributeValue.hexUrl,
          })),
        };
      }),
    );

    const result: OneProductResponse = {
      id,
      name,
      productDetails,
      brand: brand.name,
      categories: [
        ...new Set(
          productCategories.flatMap(
            (pc) => flattenCategories(pc.categoryHierarchy).categories,
          ),
        ),
      ],
      tags: [...new Set(productTags.map((t) => t.tag.name).filter(Boolean))],
      images: images.map((i) => ({
        attributeId: i.attributeValueId,
        url: i.url,
      })),
      variants,
    };

    return result;
  }
}
