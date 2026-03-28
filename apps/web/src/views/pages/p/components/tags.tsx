'use client';
import { IoSparkles } from 'react-icons/io5';
import { ITag } from '../types/product.types';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';

export default function Tags({ tags }: { tags: ITag[] }) {
  const { pathname, createLinkParams } = useQueryParams();

  const isPathname = pathname.startsWith('/c') || pathname.startsWith('/d');

  return (
    <>
      {tags.map((tag, t) => (
        <TagButton
          key={tag.slug}
          href={
            isPathname
              ? createLinkParams('tag', `${tag.slug}`, { append: false })
              : createLinkParams('tag', `${tag.slug}`, { append: false }, '/c')
          }
          icon={<IoSparkles className="mr-0.5 text-xs" />}
          className={`${t % 2 === 0 ? 'bg-orange-700! text-light!' : `bg-gray-50! text-active`} mb-0.5! text-xs! px-2!`}
          aria-label={`Select ${tag.name}`}
          scroll={pathname.startsWith('/d') ? false : true}
        >
          {tag.name}
        </TagButton>
      ))}
    </>
  );
}
