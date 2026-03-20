'use client';
import TagButton from '@/views/components/tagButton';
import { IoChevronDown, IoClose, IoFilter } from 'react-icons/io5';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { useQueryParams } from '../hooks/useQueryParams';
import useFilteredParams from '../hooks/useFilteredParams';

interface ISortProduct {
  handlerModal: () => void;
}

const sortOptions = [
  {
    label: 'Discount',
    value: 'discount',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
  {
    label: 'Latest',
    value: 'latest',
  },
];

export default function SortProduct({ handlerModal }: ISortProduct) {
  const { createParams, deleteParams, clearAllParams } = useQueryParams();
  const { currentOrder, currentSort, isFiltered } = useFilteredParams();

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
    <div className="flex space-x-1 items-center">
      {isFiltered && (
        <TagButton
          icon={<IoClose className="text-lg" />}
          onClick={clearAllParams}
          className="flex-none block sm:hidden"
        >
          Clear Filter
        </TagButton>
      )}
      <div className="block sm:hidden">
        <button
          className="px-3 py-1 text-sm rounded-full mt-1 text-[#ededed] flex items-center cursor-pointer bg-orange-800"
          onClick={handlerModal}
          aria-label="Filter modal"
        >
          <IoFilter className="text-lg mr-2" />
          Filter
        </button>
      </div>
      {sortOptions.map((sort, s) => (
        <TagButton
          key={s}
          active={currentSort === sort.value}
          className="sm:px-3!"
          icon={
            s === 0 ? (
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
    </div>
  );
}
