import ToggleButton from './toggleButton';
import { useQueryParams } from '@/views/pages/c/hooks/useQueryParams';
import { IoChevronDown } from 'react-icons/io5';
import { sortDashboardOptions } from '@/utils/productDashboard';

type ViewMode = 'CARD' | 'TABLE';

export default function sortToggle({
  view = 'CARD',
  sort,
  order,
  currentOrder,
  currentSort,
  isScroll,
}: {
  view?: ViewMode;
  sort: string;
  order: string;
  currentOrder?: string;
  currentSort?: string;
  isScroll?: boolean;
}) {
  const { createParams } = useQueryParams();

  const handleClick = (value: string) => {
    if (currentSort === value) {
      currentOrder === 'desc'
        ? createParams({ [sort]: '', [order]: '' }, { append: false }, false)
        : createParams(
            { [sort]: value, [order]: 'desc' },
            { append: false },
            isScroll ?? false,
          );
    } else {
      createParams({ [sort]: value, [order]: 'asc' }, { append: false }, false);
    }
  };

  return (
    <div
      className={`flex items-center dark:bg-white/10 rounded-xl p-1 w-fit shadow-sm ${view === 'TABLE' ? 'bg-black/10' : 'bg-light'}`}
    >
      {sortDashboardOptions.map((opt, o) => (
        <ToggleButton
          key={o}
          setToggle={() => handleClick(opt.value)}
          Icon={IoChevronDown}
          isToggle={currentSort === opt.value}
          label={opt.label}
          style={view === 'TABLE' ? 'bg-black/10! dark:bg-white' : ''}
          isRotate={currentOrder === 'asc' && currentSort === opt.value}
        />
      ))}
    </div>
  );
}
