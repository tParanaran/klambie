type CategoryNode = {
  category?: {
    id?: number;
    name?: string;
  };
  parent?: CategoryNode | null;
};

export default function FlattenCategories(ch: CategoryNode): {
  categories: string[];
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
      if (node.category?.name) {
        acc.categories.push(node.category.name);
      }

      if (node.category?.id !== undefined) {
        acc.categoriesId.push(node.category.id);
      }

      return acc;
    },
    { categories: [] as string[], categoriesId: [] as number[] },
  );
}
