'use client';
import { IoSparkles } from 'react-icons/io5';
import { ITag } from '../types/product.types';
import { useQueryParams } from '../../c/hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';

export default function Tags({ tags }: { tags: ITag[] }) {
  const { createLinkParams } = useQueryParams();

  return (
    <>
      {tags.map((tag, t) => (
        <TagButton
          key={tag.slug}
          href={createLinkParams('tag', `${tag.slug}`, { append: false })}
          icon={<IoSparkles className="mr-0.5 text-xs" />}
          className={`${t % 2 === 0 ? 'bg-orange-700! text-[#ededed]!' : `bg-gray-50! text-[#FF4500]!`} mb-1! text-xs! px-2!`}
          aria-label={`Select ${tag.name}`}
        >
          {tag.name}
        </TagButton>
      ))}
    </>
  );
}
