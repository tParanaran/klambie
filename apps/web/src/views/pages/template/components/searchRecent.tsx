import { useEffect, useState } from 'react';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';
import { IoSearch } from 'react-icons/io5';

export default function SearchRecent() {
  const { searchParams, createNewRouteParams } = useQueryParams();
  const [recentSearches, setRecentSearch] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]',
    );
    setRecentSearch(storedSearches);
  }, [searchParams]);

  const deleteRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearch([]);
  };

  if (recentSearches.length > 0)
    return (
      <div>
        <div className="flex justify-between space-x-2">
          {' '}
          <h3 className="text-xs text-zinc-500 mr-2 w-fit my-auto">Recent </h3>
          <button
            onClick={deleteRecentSearches}
            aria-label="Clear recent search"
            className="text-end my-auto"
          >
            <p className="text-sm text-orange-700">Clear All</p>
          </button>
        </div>

        <div className="flex space-x-1 flex-wrap items-center text-sm">
          {recentSearches.map((search, i) => (
            <TagButton
              key={i}
              icon={<IoSearch className="ml-1" />}
              className="pr-3! pl-0!"
              aria-label={`Search ${search}`}
              onClick={() => createNewRouteParams('q', search, '/s')}
            >
              {search}
            </TagButton>
          ))}
        </div>
      </div>
    );
}
