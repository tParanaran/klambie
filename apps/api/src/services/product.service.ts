import { Product as product } from 'generated/prisma/client';
import { Product } from '@/types/product.type';
import { prisma } from 'lib/prisma';

export class AddProduct {
  async newProduct(
    data: Product,
  ): Promise<{ message: string; result: product }> {
    const { name, brandId, slug, sizingGuideId, basePrice } = data;
    const { productDetails, productCategories, productTags, images } = data;
    const { productAttributes, productVariants, comparePrice } = data;

    console.log(data);

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
            create: productAttributes.map((id: number) => ({
              attributeId: id,
            })),
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
            create: images.map((url: string) => ({ url: url })),
          },
        },
      });

      for (const va of productVariants) {
        await tx.productVariant.create({
          data: {
            productId: product.id,
            sku: va.sku,
            price: va.price,
            stock: va.stock,
            comparePrice: va.comparePrice,
            isActive: true,
            productImages: {
              create: va.productImages.map((url: string) => ({ url: url })),
            },
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
}
