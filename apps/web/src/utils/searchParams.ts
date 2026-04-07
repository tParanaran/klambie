import { normalizeParams } from './params';

export interface ISearchParams {
  tag?: string;
  brand?: string | string[];
  categoryId?: string | string[];
  attributeId?: string | string[];
  order?: string;
  sort?: string;
  page?: string;
  limit?: string;
  price?: string;
  q?: string;
  key: string | string[];
}

export default async function parseSearchParams(searchParams: ISearchParams) {
  const {
    tag,
    brand,
    categoryId,
    attributeId,
    order,
    sort,
    limit,
    page,
    price,
    q,
    key,
  } = await searchParams;

  const brands = normalizeParams(brand);
  const keys = normalizeParams(key);
  const categoryIds = normalizeParams(categoryId, true);
  const attributeIds = normalizeParams(attributeId, true);

  return {
    sort,
    order,
    tag,
    brands,
    categoryIds,
    attributeIds,
    limit: parseInt(limit as string) || 18,
    page: parseInt(page as string) || 1,
    price,
    q,
    keys,
  };
}
