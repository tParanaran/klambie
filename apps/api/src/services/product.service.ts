import {
  AllProductsResponse,
  InsertProduct,
  OneProductResponse,
} from '@/types/product.type';
import { prisma } from 'lib/prisma';
import { CalculatePrice } from '@/utils/price';

export class ProductService {
  async newProduct(data: InsertProduct): Promise<{ message: string }> {
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
            barcode: null,
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
      return product.name;
    });

    return { message: `Create ${result} Successfully` };
  }
  async getAllProducts(): Promise<AllProductsResponse[]> {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        basePrice: true,
        comparePrice: true,
        slug: true,
        brand: {
          select: {
            name: true,
          },
        },
        productVariants: {
          select: {
            basePrice: true,
            comparePrice: true,
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
      const payload = {
        bPrice: p.basePrice,
        cPrice: p.comparePrice,
        variants: p.productVariants,
        discounts: null,
      };
      const { price } = CalculatePrice(payload);

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
  async getOneProduct(slug: string): Promise<OneProductResponse | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        basePrice: true,
        comparePrice: true,
        brand: {
          select: {
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
                department: true,
                collection: true,
                category: true,
                subcategory: true,
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
            comparePrice: true,
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

    const variants = product.productVariants.map((v) => {
      const payload = {
        bPrice: v.basePrice,
        cPrice: v.comparePrice,
        variants: null,
        discounts: null,
      };
      const { price } = CalculatePrice(payload);

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
    });

    const payload = {
      bPrice: product.basePrice,
      cPrice: product.comparePrice,
      variants: null,
      discounts: null,
    };
    const { price } = CalculatePrice(payload);
    const {
      productDetails,
      name,
      id,
      brand,
      images,
      productTags,
      productCategories,
    } = product;

    const result: OneProductResponse = {
      id,
      name,
      productDetails,
      price,
      brand: brand.name,
      categories: [
        ...new Set(
          productCategories.flatMap((c) => {
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
