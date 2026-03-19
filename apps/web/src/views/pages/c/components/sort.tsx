import TagButton from '@/views/components/tagButton';
import { IoChevronDown } from 'react-icons/io5';
import { useQueryParams } from '../hooks/useQueryParams';

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

export default function SortProduct() {
  const { getParams, createParams } = useQueryParams();
  const currentOrder = getParams('order');
  const currentSort = getParams('sort');

  const handleClick = (value: string) => {
    if (currentSort === value) {
      if (currentOrder === 'desc') {
        createParams({ sort: '', order: '' }, { append: false });
      } else {
        createParams({ sort: value, order: 'desc' }, { append: false });
      }
    } else {
      createParams({ sort: value, order: 'asc' }, { append: false });
    }
  };

  return (
    <div className="flex space-x-1 items-center">
      {sortOptions.map((sort, s) => (
        <TagButton
          key={s}
          active={currentSort === sort.value}
          icon={
            <IoChevronDown
              className={`
                  inline-block text-lg transform transition-transform duration-300
                  ${currentOrder === 'asc' && currentSort === sort.value ? 'rotate-0' : 'rotate-180'}
                `}
            />
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
