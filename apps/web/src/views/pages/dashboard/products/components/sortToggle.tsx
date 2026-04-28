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
      if (isScroll) {
        if (!statusParams) {
          createParams({ status: 'ACTIVE' }, { append: false }, isScroll);
        } else if (statusParams === 'ACTIVE') {
          createParams({ status: 'DRAFT' }, { append: false }, isScroll);
        } else if (statusParams === 'DRAFT') {
          createParams({ status: 'ARCHIVE' }, { append: false }, isScroll);
        } else {
          clearAllParams(isScroll);
        }
      } else {
        if (!activeParams) {
          createParams({ isActive: 'true' }, { append: false }, isScroll);
        } else if (activeParams === 'true') {
          createParams({ isActive: 'false' }, { append: false }, isScroll);
        } else {
          clearAllParams(isScroll);
        }
      }

      return;
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
    ? ['ACTIVE', 'DRAFT', 'ARCHIVE'].includes(statusParams!)
    : ['true', 'false'].includes(activeParams!);

  let statusLabel = 'Status';
  if (isScroll && statusParams) {
    if (statusParams === 'ACTIVE') statusLabel = 'Active';
    else if (statusParams === 'DRAFT') statusLabel = 'Draft';
    else if (statusParams === 'ARCHIVE') statusLabel = 'Archive';
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
