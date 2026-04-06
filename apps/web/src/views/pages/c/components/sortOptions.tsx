import TagButton from '@/views/components/tagButton';
import { IoChevronDown } from 'react-icons/io5';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { useQueryParams } from '../hooks/useQueryParams';
import useFilteredParams from '../hooks/useFilteredParams';

interface ISortOptions {
  sortOptions: { label: string; value: string }[];
  scroll?: boolean;
}

export default function SortOptions({ sortOptions, scroll }: ISortOptions) {
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
        ? createParams({ sort: '', order: '' }, { append: false }, scroll)
        : createParams(
            { sort: value, order: 'desc' },
            { append: false },
            scroll,
          );
    } else {
      createParams({ sort: value, order: 'asc' }, { append: false }, scroll);
    }
  };
  return (
    <>
      {sortOptions.map((sort, s) => (
        <TagButton
          key={s}
          className="pr3!"
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
          scroll={scroll}
        >
          {s === 3 && currentSort === 'latest' && currentOrder === 'asc'
            ? 'Oldest'
            : sort.label}
        </TagButton>
      ))}
    </>
  );
}
