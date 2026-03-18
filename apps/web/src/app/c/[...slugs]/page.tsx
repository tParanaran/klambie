import axiosInstanceServer from '@/lib/axios/server';
import ErrorMessage from '@/views/components/error';
import CategoryView from '@/views/pages/c';

export default async function Categories({
  params,
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: { tag: string };
}) {
  const { slugs } = await params;
  const { tag } = await searchParams;

  let products = null;
  let filters = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/all`, {
      slugs,
      tag,
    });

    products = data.products;
    filters = data.filters;
  } catch (error: any) {
    error = error.message || 'Something went wrong while fetching data.';
    products = null;
  }

  const categoryView = { products, filters };

  return (
    <main>
      <CategoryView {...categoryView} />
      {error && <ErrorMessage error={error} />}
    </main>
  );
}
