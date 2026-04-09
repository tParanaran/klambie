import { sortDashboardOptions } from '@/utils/productDashboard';
import { useQueryParams } from '@/views/pages/c/hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';
import SortOptions from '@/views/pages/c/components/sortOptions';

export default function SortVariants() {
  const { clearAllParams } = useQueryParams();

  return (
    <div className="flex items-center justify-between mt-1 mb-2 text-xs">
      <div className="hidden sm:block mr-1">
        <TagButton
          className="px-3 flex-none"
          onClick={() => clearAllParams(false)}
        >
          Variants
        </TagButton>
      </div>

      <div className="flex text-center space-x-1">
        <SortOptions sortOptions={sortDashboardOptions} scroll={false} />

        <div className="w-fit hidden sm:block">
          <TagButton className="px-3" onClick={() => clearAllParams(false)}>
            Action
          </TagButton>
        </div>
      </div>
    </div>
  );
}
