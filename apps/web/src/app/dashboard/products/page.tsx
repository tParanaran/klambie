import axiosInstanceServer from '@/lib/axios/server';
import ProductsDahsboardView from '@/views/pages/dashboard/products';

export default async function Products({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = await searchParams;

  let products = [];
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/alldashboard`, {
      q,
      limit: 5,
    });
    products = data;
  } catch (error: any) {
    products = [];
    error = error.message || 'Something went wrong while fetching data.';
  }
  const viewProps = { products, error };

  return (
    <section>
      <ProductsDahsboardView {...viewProps} />
    </section>
  );
}
