import TagButton from '@/views/components/tagButton';
import useFilteredParams from '../hooks/useFilteredParams';
import { IoClose } from 'react-icons/io5';
import { useQueryParams } from '../hooks/useQueryParams';

export default function AppliedFilter() {
  const { deleteParams } = useQueryParams();
  const {
    selectedAttributes,
    selectedTag,
    selectedBrands,
    selectedCategories,
    priceParams,
    tagParams,
  } = useFilteredParams();

  return (
    <>
      {priceParams && (
        <TagButton
          onClick={() => deleteParams('price', priceParams)}
          icon={<IoClose className="ml-1 text-lg" />}
          className="pr-2! pl-0!"
          aria-label={`Remove ${priceParams} filter`}
        >
          Rp {priceParams}
        </TagButton>
      )}

      {tagParams && (
        <TagButton
          onClick={() => deleteParams('tag', tagParams)}
          icon={<IoClose className="ml-1 text-lg" />}
          className="pr-2! pl-0!"
          aria-label={`Remove ${tagParams} filter`}
        >
          {selectedTag}
        </TagButton>
      )}

      {selectedCategories?.map((item) => (
        <TagButton
          key={item.slug}
          onClick={() => deleteParams('categoryId', String(item.id))}
          icon={<IoClose className="ml-1 text-lg" />}
          className="pr-2! pl-0!"
          aria-label={`Remove ${item.name} filter`}
        >
          {item.name}
        </TagButton>
      ))}
      {selectedBrands.map((item) => (
        <TagButton
          key={item.slug}
          onClick={() => deleteParams('brand', item.slug)}
          icon={<IoClose className="ml-1 text-lg" />}
          className="pr-2! pl-0!"
          aria-label={`Remove ${item.name} filter`}
        >
          {item.name}
        </TagButton>
      ))}

      {selectedAttributes.map((item) => (
        <TagButton
          key={item.slug}
          onClick={() => deleteParams('attributeId', String(item.id))}
          icon={<IoClose className="ml-1 text-lg" />}
          className="pr-2! pl-0!"
          aria-label={`Remove ${item.value} filter`}
        >
          {item.value}
        </TagButton>
      ))}
    </>
  );
}
