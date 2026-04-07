import axiosInstanceServer from '@/lib/axios/server';
import parseSearchParams, { ISearchParams } from '@/utils/searchParams';
import CategoryView from '@/views/pages/c';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const parsedParams = await parseSearchParams(searchParams);

  let products = [];
  let pages = null;
  let filters = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/all`, {
      slugs: parsedParams.keys,
      ...parsedParams,
    });

    products = data.products;
    filters = data.filters;
    pages = data.pages;
  } catch (error: any) {
    error = error.message || 'Something went wrong while fetching data.';
    products = [];
  }

  const categoryView = { products, filters, pages, query: parsedParams.q };

  return (
    <main>
      <CategoryView {...categoryView} />
    </main>
  );
}
