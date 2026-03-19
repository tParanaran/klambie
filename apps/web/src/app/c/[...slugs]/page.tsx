import axiosInstanceServer from '@/lib/axios/server';
import { normalizeParams } from '@/utils/params';
import ErrorMessage from '@/views/components/error';
import CategoryView from '@/views/pages/c';

interface IsearchParams {
  tag?: string;
  brand?: string | string[];
  categoryId?: string | string[];
  attributeId?: string | string[];
  order?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export default async function Categories({
  params,
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: IsearchParams;
}) {
  const { slugs } = await params;
  const { tag, brand, categoryId, attributeId, order, sort, limit, page } =
    await searchParams;

  const brands = normalizeParams(brand);
  const categoryIds = normalizeParams(categoryId, true);
  const attributeIds = normalizeParams(attributeId, true);

  let includeDescendants = categoryIds.length > 0 ? false : true;
  let products = [];
  let totalItems = 0;
  let filters = null;
  let error;

  try {
    const { data } = await axiosInstanceServer.post(`/product/all`, {
      slugs,
      sort,
      order,
      tag,
      brands,
      categoryIds,
      attributeIds,
      includeDescendants,
      limit: parseInt(limit as string),
      page: parseInt(page as string),
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
