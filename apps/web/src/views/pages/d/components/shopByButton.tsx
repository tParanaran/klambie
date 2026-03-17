'use client';
import { antonFont } from '@/utils/fonts';
import { ITag } from '../../p/types/product.types';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import Link from 'next/link';

export default function ShopByButton({ tags }: { tags: ITag[] }) {
  const { pathname, createParams, getParams } = useQueryParams();

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
            getParams('tag') === undefined
              ? 'bg-orange-800 border-orange-800 text-[#ededed]'
              : 'border'
          }`}
        >
          All
        </Link>

        {tags?.map((tag, idx) => (
          <Link
            href={createParams('tag', tag.slug, { append: false })}
            aria-label={`${tag} Product`}
            key={idx}
            scroll={false}
            className={`${
              antonFont.className
            } uppercase px-4 py-1.5 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
              getParams('tag') === tag.slug
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
