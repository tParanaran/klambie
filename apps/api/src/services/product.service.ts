import { Product as product } from 'generated/prisma/client';
import { GetAllProducts, Product } from '@/types/product.type';
import { prisma } from 'lib/prisma';
import { Decimal } from 'decimal.js';

export class ProductService {
  async newProduct(
    data: Product,
  ): Promise<{ message: string; result: product }> {
    const { name, brandId, slug, sizingGuideId, basePrice } = data;
    const { productDetails, productCategories, productTags, images } = data;
    const { productAttributes, productVariants, comparePrice } = data;

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name,
          brandId,
          slug,
          sizingGuideId,
          basePrice,
          comparePrice,
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
            productId: product.id,
            sku: va.sku,
            basePrice: va.basePrice,
            stock: va.stock,
            comparePrice: va.comparePrice,
            isActive: true,
            productVariantAttributes: {
              create: va.attributeValueId.map((attributeValueId: number) => ({
                attributeValueId: attributeValueId,
              })),
            },
          },
        });
      }
      return product;
    });

    return { message: 'Create Product Successfully', result };
  }
  async getAllProducts(): Promise<GetAllProducts[]> {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        basePrice: true,
        comparePrice: true,
        brand: {
          select: {
            name: true,
          },
        },
        productVariants: {
          select: {
            basePrice: true,
            comparePrice: true,
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
                department: {
                  select: { name: true },
                },
                collection: {
                  select: { name: true },
                },
                category: {
                  select: { name: true },
                },
                subcategory: {
                  select: { name: true },
                },
              },
            },
          },
        },
        productTags: {
          select: {
            tag: {
              select: { name: true },
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

    const result = products.map((p) => {
      const allBasePrices = [
        p.basePrice,
        ...p.productVariants.map((v) => v.basePrice),
      ].filter(Boolean);
      const allComparePrices = [
        p.comparePrice,
        ...p.productVariants.map((v) => v.comparePrice),
      ].filter(Boolean);

      console.log(allBasePrices);
      console.log(allComparePrices);

      const minBasePrice = Decimal.min(...allBasePrices);
      const minComparePrice = Decimal.max(...allComparePrices);

      console.log(minBasePrice);
      console.log(minComparePrice);

      return {
        name: p.name,
        basePrice: String(minBasePrice),
        comparePrice:
          minComparePrice && !minComparePrice.isZero()
            ? String(minComparePrice)
            : null,
        discountPercentage:
          minComparePrice && !minComparePrice.isZero()
            ? minComparePrice
                .minus(minBasePrice)
                .dividedBy(minComparePrice)
                .times(100)
                .toFixed(1)
            : null,
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
            p.productCategories.flatMap((c) => {
              const ch = c.categoryHierarchy;
              return [
                ch.department.name,
                ch.collection.name,
                ch.category.name,
                ch.subcategory?.name,
              ].filter(Boolean);
            }),
          ),
        ],
        tags: [
          ...new Set(p.productTags.map((t) => t.tag.name).filter(Boolean)),
        ],
        images: [...new Set(p.images.map((i) => i.url).filter(Boolean))],
      };
    });

    return result;
  }
}
