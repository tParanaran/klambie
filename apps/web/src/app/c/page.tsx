import axiosInstanceServer from '@/lib/axios/server';
import parseSearchParams, { ISearchParams } from '@/utils/searchParams';
import ErrorMessage from '@/views/components/error';
import CategoryView from '@/views/pages/c';

export default async function Categories({
  params,
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: ISearchParams;
}) {
  const { slugs } = await params;
  const parsedParams = await parseSearchParams(searchParams);

  let products = [];
  let totalItems = 0;
  let filters = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/all`, {
      slugs,
      ...parsedParams,
    });

    products = data.products;
    filters = data.filters;
    totalItems = data.totalItems;
  } catch (error: any) {
    error = error.message || 'Something went wrong while fetching data.';
    products = [];
  }

  const categoryView = { products, filters, totalItems };

  return (
    <main>
      <CategoryView {...categoryView} />
      {error && <ErrorMessage error={error} />}
    </main>
  );
}
