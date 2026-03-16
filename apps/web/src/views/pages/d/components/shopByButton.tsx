'use client';
import { antonFont } from '@/utils/fonts';
import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import { ITag } from '../../p/types/product.types';

export default function ShopByButton({ tags }: { tags: ITag[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getParams = searchParams.get('tag')?.toString();

  const createTagSearch = useCallback(
    (query: string, value: string) => {
      const params = new URLSearchParams();
      params.set(query, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <main className="my-3">
      <h1 className={`${antonFont.className} text-xl sm:text-2xl uppercase`}>
        Shop By Essentials
      </h1>
      <div className="flex space-x-2 flex-wrap my-2">
        <Link
          href={pathname}
          aria-label={`All Products`}
          scroll={false}
          className={`${antonFont.className} uppercase px-4 py-1.5 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
            getParams === undefined
              ? 'bg-orange-800 border-orange-800 text-[#ededed]'
              : 'border'
          }`}
        >
          All
        </Link>

        {tags.map((tag, idx) => (
          <Link
            href={pathname + '?' + createTagSearch('tag', `${tag.slug}`)}
            aria-label={`${tag} Product`}
            key={idx}
            scroll={false}
            className={`${
              antonFont.className
            } uppercase px-4 py-1.5 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
              getParams === tag.slug
                ? 'bg-orange-800 border-orange-800 text-[#ededed]'
                : 'border'
            }`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
