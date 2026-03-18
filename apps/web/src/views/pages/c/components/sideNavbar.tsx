'use client';
import { useState } from 'react';
import { ICategories } from '../types';
import DropdownSidebar from './dropdownSidebar';
import { useQueryParams } from '../hooks/useQueryParams';
import { IoClose } from 'react-icons/io5';
import TagButton from '@/views/components/tagButton';

export default function SideNavbar({ filters }: { filters?: ICategories[] }) {
  const [openIndex, setOpenIndex] = useState<number[][]>([]);
  const { getAllParams, deleteParams } = useQueryParams();
  const container =
    'p-2 md:p-3 bg-black/5 dark:bg-white/10 rounded-2xl shadow-xs text-sm';
  const header = 'font-semibold mb-2 text-base opacity-50';

  const categoryId = getAllParams('categoryId');
  const selectedCategories = filters?.filter((item) =>
    categoryId?.includes(String(item.id)),
  );
  const isFiltered = selectedCategories && selectedCategories?.length > 0;

  return (
    <aside className="w-44 md:w-52 lg:w-2xs mb-5 hidden sm:block">
      <nav className="sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-3">
        {isFiltered && (
          <div className={container}>
            <h1 className={header}>Applied Filter</h1>
            <div className="flex space-x-1 flex-wrap">
              {selectedCategories?.map((item) => (
                <TagButton
                  key={item.slug}
                  onClick={() => deleteParams('categoryId', String(item.id))}
                  icon={<IoClose className="mx-1 text-lg" />}
                  className="pr-3! pl-0!"
                  aria-label={`Remove ${item.name} filter`}
                >
                  {item.name}
                </TagButton>
              ))}
            </div>
          </div>
        )}
        <div className={container}>
          <h1 className={header}>Brand</h1>
        </div>
        {filters && filters.length > 0 && (
          <div className={container}>
            <h1 className={header}>Category</h1>
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
      </nav>
    </aside>
  );
}
