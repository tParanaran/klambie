'use client';
import { useState } from 'react';
import { ICategories } from '../types';
import { useQueryParams } from '../hooks/useQueryParams';
import { IoClose } from 'react-icons/io5';
import { TbBrandBooking } from 'react-icons/tb';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import DropdownSidebar from './dropdownSidebar';
import TagButton from '@/views/components/tagButton';
import useAttribute from '../hooks/useAttribute';
import TagParams from './tagParams';

const container =
  'p-1.5 md:p-2 bg-black/5 dark:bg-white/10 rounded-2xl shadow-xs text-sm';
const header = 'mb-2 text-sm opacity-50';
const flexClass =
  'flex space-x-1 flex-wrap overflow-y-auto scrollbar-hide max-h-[22vh]';

export default function SideNavbar({ filters }: { filters?: ICategories[] }) {
  const [openIndex, setOpenIndex] = useState<number[][]>([]);
  const { getAllParams, deleteParams, toggleParams } = useQueryParams();
  const { brands, attributes } = useAttribute();

  const categoryParams = getAllParams('categoryId');
  const brandParams = getAllParams('brand');
  const attributeParams = getAllParams('attributeId');

  const selectedCategories = filters?.filter((item) =>
    categoryParams?.includes(String(item.id)),
  );
  const selectedBrands = brands.filter((item) =>
    brandParams?.includes(item.slug),
  );
  const selectedAttributes = attributes.flatMap((attr) =>
    attr.attributeValues.filter((val) =>
      attributeParams?.includes(String(val.id)),
    ),
  );

  const isFiltered =
    (selectedCategories && selectedCategories?.length > 0) ||
    selectedBrands.length > 0 ||
    selectedAttributes.length > 0;

  return (
    <aside className="w-50 md:w-3xs lg:w-2xs mb-5 hidden sm:block">
      <nav className="sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-3 scrollbar-hide">
        {isFiltered && (
          <div className={container}>
            <h1 className={header}>Applied Filters</h1>
            <div className={flexClass}>
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
            </div>{' '}
          </div>
        )}
        <div className={container}>
          <h1 className={header}>Tags</h1>
          <div className={flexClass}>
            <TagParams />
          </div>
        </div>
        <div className={container}>
          <h1 className={header}>Brands</h1>
          <div className={flexClass}>
            {brands.map((brand) => (
              <TagButton
                key={brand.slug}
                icon={<TbBrandBooking className="ml-1 text-lg" />}
                onClick={() => toggleParams('brand', brand.slug)}
                className="pl-0!"
                aria-label={`Select ${brand.name} brand`}
                active={brandParams?.includes(brand.slug)}
              >
                {brand.name}
              </TagButton>
            ))}
          </div>
        </div>
        {filters && filters.length > 0 && (
          <div className={container}>
            <h1 className={header}>Categories</h1>
            {filters?.map((item, i) => (
              <DropdownSidebar
                key={item.slug}
                item={item}
                index={i}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
        )}

        {attributes.map((attr) => (
          <div className={container} key={attr.slug}>
            <h1 className={header}>{attr.name}</h1>
            <div className={flexClass}>
              {attr.attributeValues.map((val) => (
                <TagButton
                  key={val.slug}
                  icon={
                    attr.id === 2 && (
                      <AiOutlineFieldNumber className="ml-1 text-lg" />
                    )
                  }
                  onClick={() => toggleParams('attributeId', String(val.id))}
                  className={
                    val.hexUrl ? 'text-black/70' : attr.id === 2 ? 'pl-0!' : ''
                  }
                  hexUrl={val.hexUrl}
                  aria-label={`Select ${val.value} attribute.`}
                  active={attributeParams?.includes(String(val.id))}
                >
                  {val.value}
                </TagButton>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
