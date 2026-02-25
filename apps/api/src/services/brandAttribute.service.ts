import { ProductHelper } from '@/helpers/product.helper';
import { prisma } from 'lib/prisma';

type Payload = {
  data: string[];
};

type AttributeValue = {
  attributeId: number;
  hexUrls: string[];
  values: string[];
};

const productHelper = new ProductHelper();

export class BrandAttributeService {
  async createBrand(data: Payload): Promise<{ id: number }[]> {
    const result = await prisma.$transaction(async (tx) => {
      const brand = await productHelper.GetAndCreate(tx.brand, data.data);

      return brand;
    });

    return result;
  }
  async createAttribute(data: Payload): Promise<{ id: number }[]> {
    const result = await prisma.$transaction(async (tx) => {
      const attribute = await productHelper.GetAndCreate(
        tx.attribute,
        data.data,
      );

      return attribute;
    });

    return result;
  }
  async addAttributeValue(data: AttributeValue): Promise<number> {
    const { attributeId, values, hexUrls } = data;

    const result = await prisma.$transaction(async (tx) => {
      const attributeValue = await tx.attributeValue.createMany({
        data: values.map((value: string, idx: number) => ({
          attributeId,
          hexUrl: hexUrls[idx],
          value: value,
        })),
        skipDuplicates: true,
      });

      return attributeValue.count;
    });

    return result;
  }
}
