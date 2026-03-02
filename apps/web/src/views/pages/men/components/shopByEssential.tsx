'use client';
import { antonFont } from '@/utils/fonts';
import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ITag {
  id: number;
  name: string;
  slug: string;
}

export default function ShopByEssenstials({ tags }: { tags: ITag[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getParams = searchParams.get('shopBy')?.toString();

  const createTagSearch = useCallback(
    (query: string, value: string) => {
      const params = new URLSearchParams();
      params.set(query, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <main className="my-5">
      <h1 className={`${antonFont.className} text-2xl uppercase`}>
        Shop By Essentials
      </h1>
      <div className="flex space-x-2 flex-wrap my-5">
        <Link
          href={'/men'}
          aria-label={`All Products`}
          className={`${antonFont.className} uppercase px-4 py-2 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 border`}
        >
          All
        </Link>

        {tags.map((tag, idx) => (
          <Link
            href={pathname + '?' + createTagSearch('tag', `${tag.slug}`)}
            aria-label={`${tag} Tags Product`}
            key={idx}
            scroll={false}
            className={`${
              antonFont.className
            } uppercase px-4 py-2 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
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
