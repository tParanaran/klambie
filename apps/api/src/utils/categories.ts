type CategoryNode = {
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  };
  parent?: CategoryNode | null;
};

export default function FlattenCategories(ch: CategoryNode): {
  categories: { name: string; slug: string }[];
  categoriesId: number[];
} {
  const chain: CategoryNode[] = [];
  let current: CategoryNode | null | undefined = ch;

  while (current) {
    chain.unshift(current);
    current = current.parent;
  }

  const seenNames = new Set<string>();

  return chain.reduce(
    (acc, node) => {
      const name = node.category?.name;
      const slug = node.category?.slug;
      const id = node.category?.id;

      if (name && slug && !seenNames.has(name)) {
        acc.categories.push({ name, slug });
        seenNames.add(name);
      }

      if (id !== undefined) {
        acc.categoriesId.push(id);
      }

      return acc;
    },
    {
      categories: [] as { name: string; slug: string }[],
      categoriesId: [] as number[],
    },
  );
}
