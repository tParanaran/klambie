import { prisma } from '../../lib/prisma';
import { customAlphabet } from 'nanoid';

export class SKU {
  async generateProductSKU(name: string, id: number): Promise<string> {
    const brand = await prisma.brand.findUnique({ where: { id: id } });

    if (!brand) throw new Error('Brand not found');

    let sku: string = '';
    let exists = true;
    const nanoid = customAlphabet('1234567890', 5);

    while (exists) {
      const shortBrand = brand.name
        .replace(/\s+/g, '')
        .slice(0, 4)
        .toUpperCase();
      sku = `${shortBrand}-${nanoid().toUpperCase()}`;

      const found = await prisma.product.findUnique({
        where: { sku },
      });

      exists = !!found;
    }

    return sku;
  }
  async generateVariantSKU(
    productSku: string,
    attributeIds: number[],
  ): Promise<string> {
    const attrCode = attributeIds.join('-');

    let sku = '';
    let exists = true;
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 3);

    while (exists) {
      sku = `${productSku}-${attrCode}-${nanoid().toUpperCase()}`;
      const found = await prisma.productVariant.findUnique({ where: { sku } });
      exists = !!found;
    }

    return sku;
  }
}
