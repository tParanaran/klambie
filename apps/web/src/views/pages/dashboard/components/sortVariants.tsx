import { sortDashboardOptions } from '@/utils/productDashboard';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';
import SortOptions from '../../c/components/sortOptions';

export default function SortVariants() {
  const { clearAllParams } = useQueryParams();
  return (
    <div className="flex items-center justify-between py-2 text-xs">
      <div className="hidden sm:block">
        <TagButton
          className="px-3 bg-black/15! dark:bg-white/10! text-dark flex-none"
          onClick={clearAllParams}
        >
          Variants
        </TagButton>
      </div>
      <div className="flex text-center space-x-1">
        <SortOptions
          sortOptions={sortDashboardOptions}
          style="bg-black/15! dark:bg-white/10! text-dark pr-3!"
        />
        <div className="w-fit hidden sm:block">
          <TagButton
            className="px-3 bg-black/15! dark:bg-white/10! text-dark"
            onClick={clearAllParams}
          >
            Action
          </TagButton>
        </div>
      </div>
    </div>
  );
}
