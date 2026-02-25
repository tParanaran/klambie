export class ProductHelper {
  async GetAndCreate(model: any, data: string[]): Promise<{ id: number }[]> {
    await model.createMany({
      data: data.map((name) => ({ name })),
      skipDuplicates: true,
    });

    return await model.findMany({
      where: { name: { in: data } },
      select: { id: true, name: true },
    });
  }
}
