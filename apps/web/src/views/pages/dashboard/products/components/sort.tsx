import useFilteredParams from '@/views/pages/c/hooks/useFilteredParams';
import { useQueryParams } from '@/views/pages/c/hooks/useQueryParams';
import { IoChevronDown } from 'react-icons/io5';

interface ISortTable {
  sort: { label: string; value: string };

  style?: string;
}

export default function SortTable({ sort, style }: ISortTable) {
  const { createParams } = useQueryParams();
  const { currentOrderBy, currentSortBy } = useFilteredParams();

  const handleClick = (value: string) => {
    if (currentSortBy === value) {
      currentOrderBy === 'desc'
        ? createParams({ sortBy: '', orderBy: '' }, { append: false })
        : createParams({ sortBy: value, orderBy: 'desc' }, { append: false });
    } else {
      createParams({ sortBy: value, orderBy: 'asc' }, { append: false });
    }
  };
  return (
    <button
      className={`${currentSortBy === sort.value ? 'text-orange-700' : ''} ${style} flex items-center px-2 lg:px-5`}
      onClick={() => handleClick(sort.value)}
    >
      <p>{sort.label}</p>
      <IoChevronDown
        className={`text-xl transform transition-transform duration-300 text-orange-700 ${currentOrderBy === 'asc' && currentSortBy === sort.value ? 'rotate-0' : 'rotate-180'}`}
      />
    </button>
  );
}
