'use client';
import { antonFont } from '@/utils/fonts';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAttribute from '../../c/hooks/useAttribute';

export default function ShopByButton({ slug }: { slug: string }) {
  const router = useRouter();
  const { pathname, createLinkParams, getParams } = useQueryParams();
  const { tags } = useAttribute();

  const classLink = `${antonFont.className} uppercase flex-none px-3 py-1 rounded-full text-base flex-none sm:text-lg bg-hover-dark hover:border-black text-hover-light mt-2`;

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
            className={`${classLink} ${
              getParams('tag') === undefined
                ? 'bg-orange-800 border-orange-800 text-light'
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
              className={`${classLink}
               ${
                 getParams('tag') === tag.slug
                   ? 'bg-orange-800 border-orange-800 text-light'
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
