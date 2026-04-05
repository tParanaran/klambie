import TagButton from '@/views/components/tagButton';
import { IoChevronDown } from 'react-icons/io5';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import useFilteredParams from '../../c/hooks/useFilteredParams';

interface ISortTable {
  sort: { label: string; value: string };

  style?: string;
}

export default function SortTable({ sort, style }: ISortTable) {
  const { createParams } = useQueryParams();
  const { currentOrder, currentSort } = useFilteredParams();

  const handleClick = (value: string) => {
    if (currentSort === value) {
      currentOrder === 'desc'
        ? createParams({ sort: '', order: '' }, { append: false })
        : createParams({ sort: value, order: 'desc' }, { append: false });
    } else {
      createParams({ sort: value, order: 'asc' }, { append: false });
    }
  };
  return (
    <button
      className={`${currentSort === sort.value ? 'text-orange-700' : ''} ${style} flex items-center px-2`}
      onClick={() => handleClick(sort.value)}
    >
      <p>{sort.label}</p>
      <IoChevronDown
        className={`text-xl transform transition-transform duration-300 text-orange-700 ${currentOrder === 'asc' && currentSort === sort.value ? 'rotate-0' : 'rotate-180'}`}
      />
    </button>
  );
}
