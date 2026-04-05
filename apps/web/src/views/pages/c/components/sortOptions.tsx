import TagButton from '@/views/components/tagButton';
import { IoChevronDown } from 'react-icons/io5';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { useQueryParams } from '../hooks/useQueryParams';
import useFilteredParams from '../hooks/useFilteredParams';

interface ISortOptions {
  sortOptions: { label: string; value: string }[];
  style?: string;
}

export default function SortOptions({ sortOptions, style }: ISortOptions) {
  const { createParams, deleteParams } = useQueryParams();
  const { currentOrder, currentSort } = useFilteredParams();

  const handleClick = (value: string) => {
    if (value === 'discount') {
      currentSort === value
        ? deleteParams('sort', value)
        : createParams({ sort: value });
      return;
    }

    if (currentSort === value) {
      currentOrder === 'desc'
        ? createParams({ sort: '', order: '' }, { append: false })
        : createParams({ sort: value, order: 'desc' }, { append: false });
    } else {
      createParams({ sort: value, order: 'asc' }, { append: false });
    }
  };
  return (
    <>
      {sortOptions.map((sort, s) => (
        <TagButton
          key={s}
          className={`${style ? style : 'pr3!'}`}
          active={currentSort === sort.value}
          icon={
            sort.label === 'Discount' ? (
              <RiDiscountPercentLine className="text-lg" />
            ) : (
              <IoChevronDown
                className={`
                          inline-block text-lg transform transition-transform duration-300
                          ${currentOrder === 'asc' && currentSort === sort.value ? 'rotate-0' : 'rotate-180'}
                        `}
              />
            )
          }
          onClick={() => handleClick(sort.value)}
        >
          {s === 3 && currentSort === 'latest' && currentOrder === 'asc'
            ? 'Oldest'
            : sort.label}
        </TagButton>
      ))}
    </>
  );
}
