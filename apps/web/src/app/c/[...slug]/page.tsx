import CategoryView from '@/views/pages/c';

export default async function Categories({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;

  return (
    <main>
      <CategoryView />
    </main>
  );
}
