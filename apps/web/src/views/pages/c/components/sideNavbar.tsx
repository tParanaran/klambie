'use client';
import { useState } from 'react';
import { ICategories } from '../types';
import { useQueryParams } from '../hooks/useQueryParams';
import { TbBrandBooking } from 'react-icons/tb';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import DropdownSidebar from './dropdownSidebar';
import TagButton from '@/views/components/tagButton';
import useAttribute from '../hooks/useAttribute';
import TagParams from './tagParams';
import PriceFilterForm from './priceFrom';
import useFilteredParams from '../hooks/useFilteredParams';
import AppliedFilter from './appliedFilter';

const container =
  'p-1.5 md:p-2 bg-black/5 dark:bg-white/10 rounded-2xl shadow-xs text-sm';
const header = 'mb-2 text-sm opacity-50';
const flexClass =
  'flex space-x-1 flex-wrap overflow-y-auto scrollbar-hide max-h-[26vh]';

export default function SideNavbar({ filters }: { filters?: ICategories[] }) {
  const [openIndex, setOpenIndex] = useState<number[][]>([]);
  const { toggleParams, clearAllParams } = useQueryParams();
  const { brands, attributes } = useAttribute();
  const { isFiltered, brandParams, attributeParams } = useFilteredParams();
  const [keyword, setKeyword] = useState<string>('');

  return (
    <>
      {isFiltered && (
        <div className={container}>
          <h1 className={header}>Applied Filters</h1>
          <div className={flexClass}>
            <AppliedFilter />
          </div>
          <TagButton className="ml-auto" onClick={clearAllParams}>
            Clear All
          </TagButton>
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
          {filters.map((item, i) => (
            <DropdownSidebar
              key={item.slug}
              item={item}
              index={i}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          ))}
        </div>
      )}

      <div className={container}>
        <h1 className={header}>Price</h1>
        <PriceFilterForm />
      </div>

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
    </>
  );
}
