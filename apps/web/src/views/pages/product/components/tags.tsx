'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoSparkles } from 'react-icons/io5';
import { ITag } from '../types/product.types';

export default function Tags({
  tags,
  categories,
}: {
  tags: ITag[];
  categories: { name: string; slug: string }[];
}) {
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
    <>
      {tags.map((tag, t) => (
        <Link
          href={
            categories !== undefined
              ? '/d/' +
                categories[0].name.toLowerCase() +
                '?' +
                createTagSearch('tag', `${tag.slug}`)
              : pathname + '?' + createTagSearch('tag', `${tag.slug}`)
          }
          key={t}
          aria-label={tag.name}
          className={`${
            t % 2 === 0
              ? 'bg-orange-800/80 text-white'
              : 'bg-gray-200/80 text-orange-700'
          } rounded-full py-1 px-2 w-fit flex items-center mb-1 font-semibold`}
        >
          <IoSparkles className="mr-0.5 text-xs" /> {tag.name}
        </Link>
      ))}
    </>
  );
}
