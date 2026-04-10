import useAttribute from './useAttribute';
import { useQueryParams } from './useQueryParams';

export default function useFilteredParams() {
  const { getAllParams, getParams } = useQueryParams();
  const { brands, attributes, tags, categories } = useAttribute();

  const categoryParams = getAllParams('categoryId');
  const tagParams = getParams('tag');
  const brandParams = getAllParams('brand');
  const attributeParams = getAllParams('attributeId');
  const priceParams = getParams('price');
  const statusParams = getParams('status');
  const activeParams = getParams('isActive');
  const currentOrder = getParams('order');
  const currentSort = getParams('sort');
  const currentOrderBy = getParams('orderBy');
  const currentSortBy = getParams('sortBy');

  const selectedCategories = categories.filter((item) =>
    categoryParams?.includes(String(item.id)),
  );
  const selectedBrands = brands.filter((item) =>
    brandParams?.includes(item.slug),
  );
  const selectedAttributes = attributes.flatMap((attr) =>
    attr.attributeValues.filter((val) =>
      attributeParams?.includes(String(val.id)),
    ),
  );
  const selectedTag = tags.filter((tag) => tag.slug === tagParams)[0]?.name;

  const isFiltered =
    (selectedCategories && selectedCategories?.length > 0) ||
    selectedBrands.length > 0 ||
    selectedAttributes.length > 0 ||
    priceParams ||
    tagParams;

  return {
    selectedAttributes,
    selectedTag,
    selectedBrands,
    selectedCategories,
    isFiltered,
    priceParams,
    attributeParams,
    brandParams,
    categoryParams,
    tagParams,
    currentOrder,
    currentSort,
    currentOrderBy,
    currentSortBy,
    statusParams,
    activeParams,
  };
}
