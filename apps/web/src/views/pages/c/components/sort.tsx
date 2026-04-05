'use client';
import TagButton from '@/views/components/tagButton';
import { IoChevronDown, IoClose, IoFilter } from 'react-icons/io5';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { useQueryParams } from '../hooks/useQueryParams';
import useFilteredParams from '../hooks/useFilteredParams';
import SortOptions from './sortOptions';

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
  const { clearAllParams } = useQueryParams();
  const { isFiltered } = useFilteredParams();

  return (
    <div className="flex space-x-1 items-center">
      {isFiltered && (
        <TagButton
          icon={<IoClose className="text-lg" />}
          onClick={clearAllParams}
          className="flex-none block sm:hidden pr-3!"
        >
          Clear Filter
        </TagButton>
      )}
      <div className="block sm:hidden">
        <button
          className="px-3 py-1 text-sm rounded-full mt-1 text-light flex items-center cursor-pointer bg-orange-800"
          onClick={handlerModal}
          aria-label="Filter modal"
        >
          <IoFilter className="text-lg mr-2" />
          Filter
        </button>
      </div>
      <SortOptions sortOptions={sortOptions} />
    </div>
  );
}
