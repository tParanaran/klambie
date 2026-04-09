import axiosInstanceServer from '@/lib/axios/server';
import ErrorMessage from '@/views/components/error';
import ProductsDahsboardView from '@/views/pages/dashboard/products';

export default async function Products({
  searchParams,
}: {
  searchParams: {
    q: string;
    limit: string;
    page: string;
    order: string;
    sort: string;
    orderBy: string;
    sortBy: string;
  };
}) {
  const { q, limit, page, sort, order, sortBy, orderBy } = await searchParams;

  let products = [];
  let pages = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/alldashboard`, {
      q,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      sort,
      order,
      sortBy,
      orderBy,
    });
    products = data.products;
    pages = data.pages;
  } catch (error: any) {
    products = [];
    error = error.message || 'Something went wrong while fetching data.';
  }
  const viewProps = { products, error, pages };

  return (
    <section>
      <ProductsDahsboardView {...viewProps} />
      {error && <ErrorMessage error={error} />}
    </section>
  );
}
