export default function flattenCategories(ch: any): string[] {
  const categories: string[] = [];

  let current = ch;
  while (current) {
    if (current.category?.name) categories.push(current.category.name);
    current = current.parent;
  }
  return categories.reverse();
}
