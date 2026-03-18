import TagButton from '@/views/components/tagButton';
import { HiOutlineHashtag } from 'react-icons/hi';
import useAttribute from '../hooks/useAttribute';
import { useQueryParams } from '../hooks/useQueryParams';

export default function TagParams({ isNewPath }: { isNewPath?: boolean }) {
  const { toggleParams, getParams, createNewRouteParams } = useQueryParams();
  const { tags } = useAttribute();
  return (
    <>
      {tags.map((tag) => (
        <TagButton
          key={tag.slug}
          icon={<HiOutlineHashtag className="ml-1 text-lg" />}
          onClick={
            isNewPath
              ? () => createNewRouteParams('tag', tag.slug, '/s')
              : () => toggleParams('tag', tag.slug, '', { append: false })
          }
          className="pl-0!"
          aria-label={`Select ${tag.name} tag`}
          active={getParams('tag') === tag.slug}
        >
          {tag.name}
        </TagButton>
      ))}
    </>
  );
}
