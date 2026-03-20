import CategoryView from '@/views/pages/c';

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = await searchParams;
  return (
    <main>
      <CategoryView products={[]} filters={[]} totalItems={0} />
    </main>
  );
}
