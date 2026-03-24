'use client';
import { antonFont } from '@/utils/fonts';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import Link from 'next/link';
import useAttribute from '../../c/hooks/useAttribute';
import { useRouter } from 'next/navigation';

export default function ShopByButton({ slug }: { slug: string }) {
  const router = useRouter();
  const { pathname, createLinkParams, getParams } = useQueryParams();
  const { tags } = useAttribute();

  return (
    <main className="mt-5 md:mt-10">
      <div className="overflow-y-scroll scrollbar-hide">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const target = pathname.includes(`/d/${slug}`)
                ? `/c/${slug}`
                : pathname;

              router.push(target, { scroll: false });
            }}
            aria-label={`All Products`}
            className={`${antonFont.className} uppercase flex-none px-3 py-1 rounded-full text-base sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
              getParams('tag') === undefined
                ? 'bg-orange-800 border-orange-800 text-[#ededed]'
                : 'border'
            }`}
          >
            All Collection
          </button>

          {tags.map((tag, idx) => (
            <Link
              href={createLinkParams('tag', tag.slug, { append: false })}
              aria-label={`${tag} Product`}
              key={idx}
              scroll={false}
              className={`${
                antonFont.className
              } uppercase px-3 py-1 rounded-full text-base flex-none sm:text-lg hover:bg-black hover:border-black hover:text-[#ededed] mt-2 ${
                getParams('tag') === tag.slug
                  ? 'bg-orange-800 border-orange-800 text-[#ededed]'
                  : 'border'
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
