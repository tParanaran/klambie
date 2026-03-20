'use client';
import { useEffect, useRef, useState } from 'react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { ICategories } from '../types';
import { useQueryParams } from '../hooks/useQueryParams';
import TagButton from '@/views/components/tagButton';
import { useRouter } from 'next/navigation';

interface IDropdownSidebar {
  item: ICategories;
  level?: number;
  index: number;
  openIndex: number[][];
  keyword: string;
  setOpenIndex: React.Dispatch<React.SetStateAction<number[][]>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function DropdownSidebar({
  item,
  level = 0,
  index,
  openIndex,
  setOpenIndex,
  setKeyword,
  keyword,
}: IDropdownSidebar) {
  const { pathname, toggleParams, getAllParams, createParams } =
    useQueryParams();
  const router = useRouter();
  const hasSub = item.subcategories && item.subcategories.length > 0;
  const isOpen = openIndex[level]?.includes(index) ?? false;
  const submenuRef = useRef<HTMLDivElement>(null);
  const [submenuHeight, setSubmenuHeight] = useState<number>(0);
  const categoryId = getAllParams('categoryId');

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

  const handleNoSubParams = (href: string, categoryId?: number) => {
    if (pathname.startsWith('/c')) router.push(`${pathname}/${href}`);
    if (pathname.startsWith('/s')) {
      if (item.level < 3) setKeyword(href);
      createParams(
        {
          key: href.split('/'),
          ...(categoryId !== undefined
            ? { categoryId: String(categoryId) }
            : {}),
        },
        { append: false },
      );
    }
  };

  if (!hasSub)
    return (
      <>
        {item.level <= 3 && (
          <button
            onClick={() => handleNoSubParams(item.slug)}
            className={`w-full transition-colors py-2 duration-200 flex items-center justify-between ${isOpen ? 'text-orange-800 dark:text-orange-600 font-semibold' : ''} ${level > 0 ? 'ml-2 pr-2' : ''}`}
            aria-expanded={isOpen}
            aria-controls={`submenu-${level}-${index}`}
          >
            {item.name}

            <IoChevronForward
              className={`text-xl ml-3 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        )}
        {item.level > 3 && (
          <span className="inline-block mr-1 mb-1">
            <TagButton
              key={item.slug}
              onClick={() => toggleParams('categoryId', String(item.id))}
              aria-label={`Select ${item.name} filter`}
              active={categoryId?.includes(String(item.id))}
            >
              {item.name}
            </TagButton>
          </span>
        )}
      </>
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
              onClick={() =>
                handleNoSubParams(
                  `${keyword ? `${keyword}/${item.slug}` : item.slug}`,
                )
              }
              aria-label={`Select all ${item.name} filter`}
            >
              All
            </TagButton>
            {item.subcategories?.map((sub) => (
              <TagButton
                key={sub.slug}
                onClick={() => {
                  if (sub.level < 4) {
                    handleNoSubParams(
                      `${keyword ? `${keyword}/${item.slug}/${sub.slug}` : `${item.slug}/${sub.slug}`}`,
                    );
                  } else {
                    handleNoSubParams(
                      `${keyword ? `${keyword}/${item.slug}` : item.slug}`,
                      sub.id,
                    );
                  }
                }}
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
