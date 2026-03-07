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

  return chain.reduce(
    (acc, node) => {
      if (node.category?.name && node.category?.slug) {
        acc.categories.push({
          name: node.category.name,
          slug: node.category.slug,
        });
      }

      if (node.category?.id !== undefined) {
        acc.categoriesId.push(node.category.id);
      }

      return acc;
    },
    {
      categories: [] as { name: string; slug: string }[],
      categoriesId: [] as number[],
    },
  );
}
