import TagButton from '@/views/components/tagButton';
import { useQueryParams } from '../hooks/useQueryParams';
import SortProduct from './sort';

export default function TopNavbar({ totalFound }: { totalFound: number }) {
  const { pathname } = useQueryParams();
  const segments = (pathname.match(/[^\/]+/g) || []).map((s) =>
    s ? s[0].toUpperCase() + s.slice(1) : '',
  );

  return (
    <>
      <div className="space-x-1 p-2 lg:w-2xs md:w-3xs w-50 flex-wrap hidden sm:flex">
        {segments?.map((segment, s) => (
          <TagButton
            key={s}
            className="text-xs!"
            href={
              s === 0
                ? `/d/${segments[1].toLowerCase()}`
                : `/${segments
                    .slice(0, s + 1)
                    .join('/')
                    .toLowerCase()}`
            }
          >
            {s === 0 ? 'Home' : segment}
          </TagButton>
        ))}
      </div>
      <div className="flex lg:flex-row flex-col justify-between flex-2 overflow-x-scroll scrollbar-hide">
        <div className="space-x-1 ml-2">
          {segments.length > 1 && (
            <h1 className="sm:text-lg md:text-xl font-semibold inline-block">
              {segments.length > 3
                ? `${segments[3]} ${segments[1]}'s ${segments[2]}`
                : segments.slice(1, 3).join("'s ")}
            </h1>
          )}
          <p className="text-black/50 text-sm inline-block">
            {totalFound} items found
          </p>
        </div>

        <div className="ml-auto mt-2 lg:my-0">
          <SortProduct />
        </div>
      </div>
    </>
  );
}
