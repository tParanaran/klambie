import ToggleButton from './toggleButton';
import { useQueryParams } from '@/views/pages/c/hooks/useQueryParams';
import { IoChevronDown } from 'react-icons/io5';
import { TbStatusChange } from 'react-icons/tb';
import { sortDashboardOptions } from '@/utils/productDashboard';
import useFilteredParams from '@/views/pages/c/hooks/useFilteredParams';

type ViewMode = 'CARD' | 'TABLE';

export default function sortToggle({
  view = 'CARD',
  sort = 'sort',
  order = 'order',
  currentOrder,
  currentSort,
  isScroll = false,
}: {
  view?: ViewMode;
  sort?: string;
  order?: string;
  currentOrder?: string;
  currentSort?: string;
  isScroll?: boolean;
}) {
  const { createParams, clearAllParams } = useQueryParams();
  const { statusParams, activeParams } = useFilteredParams();

  const handleClick = (value: string) => {
    if (value === 'status') {
      if (statusParams === 'ACTIVE' || activeParams === 'true') {
        createParams(
          isScroll ? { status: 'ARCHIVE' } : { isActive: 'false' },
          { append: false },
          isScroll,
        );
      } else if (statusParams === 'ARCHIVE' || activeParams === 'false') {
        clearAllParams(isScroll);
      } else {
        createParams(
          isScroll ? { status: 'ACTIVE' } : { isActive: 'true' },
          { append: false },
          isScroll,
        );
      }
    } else {
      if (currentSort === value) {
        currentOrder === 'desc'
          ? clearAllParams(isScroll)
          : createParams(
              { [sort]: value, [order]: 'desc' },
              { append: false },
              isScroll,
            );
      } else {
        createParams(
          { [sort]: value, [order]: 'asc' },
          { append: false },
          isScroll,
        );
      }
    }
  };

  const isToggle = isScroll
    ? ['ACTIVE', 'ARCHIVE'].includes(statusParams!)
    : ['true', 'false'].includes(activeParams!);

  let statusLabel = 'Status';
  if (isScroll && statusParams) {
    statusLabel = statusParams === 'ARCHIVE' ? 'Archive' : 'Active';
  } else if (!isScroll && activeParams) {
    statusLabel = activeParams === 'false' ? 'Archive' : 'Active';
  }

  return (
    <div
      className={`flex items-center dark:bg-white/10 rounded-lg gap-0.5 p-1 w-fit shadow-sm ${view === 'TABLE' ? 'bg-black/10' : 'bg-light'}`}
    >
      {sortDashboardOptions.map((opt, o) => (
        <ToggleButton
          key={o}
          setToggle={() => handleClick(opt.value)}
          Icon={opt.value === 'status' ? TbStatusChange : IoChevronDown}
          isToggle={
            currentSort === opt.value || (opt.value === 'status' && isToggle)
          }
          label={opt.label === 'Status' ? statusLabel : opt.label}
          style={view === 'TABLE' ? 'bg-black/20! dark:bg-white!' : ''}
          isRotate={currentOrder === 'asc' && currentSort === opt.value}
        />
      ))}
    </div>
  );
}
