'use client';
import { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { ICategories } from '../types';
import { useQueryParams } from '../hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';

interface IDropdownSidebar {
  item: ICategories;
  level?: number;
  index: number;
  openIndex: number[][];
  setOpenIndex: React.Dispatch<React.SetStateAction<number[][]>>;
}

export default function DropdownSidebar({
  item,
  level = 0,
  index,
  openIndex,
  setOpenIndex,
}: IDropdownSidebar) {
  const { pathname, toggleParams, getAllParams } = useQueryParams();
  const hasSub = item.subcategories && item.subcategories.length > 0;
  const isOpen = openIndex[level]?.includes(index) ?? false;
  const submenuRef = useRef<HTMLDivElement>(null);
  const [submenuHeight, setSubmenuHeight] = useState<number>(0);
  const categoryId = getAllParams('categoryId');

  useEffect(() => {
    if (!submenuRef.current) return;
    requestAnimationFrame(() => {
      setSubmenuHeight(submenuRef.current!.scrollHeight);
    });
  }, [isOpen, openIndex]);

  const handleClick = () => {
    if (!hasSub) return;

    setOpenIndex((prev) => {
      const newState = [...prev];
      if (!newState[level]) newState[level] = [];
      if (newState[level].includes(index)) {
        newState[level] = newState[level].filter((i) => i !== index);
      } else {
        newState[level] = [...newState[level], index];
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!submenuRef.current) return;
    requestAnimationFrame(() => {
      setSubmenuHeight(submenuRef.current!.scrollHeight);
    });
  }, [isOpen, openIndex, hasSub]);

  if (!hasSub)
    return (
      <span className="inline-block mr-1 mb-1">
        <TagButton
          key={item.slug}
          href={item.level > 4 ? `${pathname}/${item.slug}` : undefined}
          onClick={
            item.level > 3
              ? () => toggleParams('categoryId', String(item.id))
              : undefined
          }
          aria-label={`Select ${item.name} filter`}
          active={categoryId?.includes(String(item.id))}
        >
          {item.name}
        </TagButton>
      </span>
    );

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`w-full transition-colors py-2 duration-200 flex items-center justify-between ${isOpen ? 'text-orange-800 dark:text-orange-600 font-semibold' : ''} ${level > 0 ? 'ml-2 pr-2' : ''}`}
        aria-expanded={isOpen}
        aria-controls={`submenu-${level}-${index}`}
      >
        {item.name}

        <IoChevronDown
          className={`text-xl ml-3 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {hasSub && (
        <div
          ref={submenuRef}
          style={{
            maxHeight: isOpen ? submenuHeight : 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          <div className="flex flex-wrap space-x-1 my-1">
            <TagButton
              href={`${pathname}/${item.slug}`}
              aria-label={`Select all ${item.name} filter`}
            >
              All
            </TagButton>
            {item.subcategories?.map((sub) => (
              <TagButton
                key={sub.slug}
                href={`${pathname}/${item.slug}${sub.level < 4 ? `/${sub.slug}` : `?categoryId=${sub.id}`}`}
                aria-label={`Select ${sub.name} filter`}
                active={categoryId?.includes(String(sub.id))}
              >
                {sub.name}
              </TagButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
