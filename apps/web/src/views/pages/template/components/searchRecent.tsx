import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchButton from './searchButton';

export default function SearchRecent() {
  const searchParams = useSearchParams();
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
          {' '}
          {recentSearches.map((search, idx) => (
            <SearchButton key={idx} searchQuery={search} />
          ))}
        </div>
      </div>
    );
}
