import axiosInstanceServer from '@/lib/axios/server';
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
  let totalItems = 0;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/alldashboard`, {
      q,
      limit: Number(limit),
      page: Number(page),
      sort,
      order,
      sortBy,
      orderBy,
    });
    products = data.products;
    totalItems = data.totalItems;
  } catch (error: any) {
    products = [];
    error = error.message || 'Something went wrong while fetching data.';
  }
  const viewProps = { products, error, totalItems };

  return (
    <section>
      <ProductsDahsboardView {...viewProps} />
    </section>
  );
}
