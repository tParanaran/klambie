'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoSearch } from 'react-icons/io5';

interface IButtonearch {
  searchQuery: string;
  iconClass?: string;
}

export default function SearchButton({ searchQuery, iconClass }: IButtonearch) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createTagSearch = useCallback(
    (query: string, value: string) => {
      const params = new URLSearchParams();
      params.set(query, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Link
      href={pathname + '?' + createTagSearch('search', searchQuery)}
      aria-label={searchQuery}
      className="px-3 py-1 rounded-full mt-1 bg-orange-800 text-[#ededed] flex items-center hover:bg-orange-700"
    >
      <IoSearch className={`${iconClass} mr-1`} /> {searchQuery}
    </Link>
  );
}
