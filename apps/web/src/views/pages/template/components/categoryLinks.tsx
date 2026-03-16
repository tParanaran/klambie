import { navLinks } from '@/utils/navLink';
import { useEffect, useState } from 'react';
import React from 'react';
import AnchorIconDropdown from './dropdown';
import Link from 'next/link';
import CategoryContent from './categoryContent';

export default function CategoryLinks() {
  const initialDropdownState = navLinks.reduce(
    (acc, item) => {
      acc[item.name] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [dropdowns, setDropdowns] =
    useState<Record<string, boolean>>(initialDropdownState);

  const dropdownRefs = navLinks.reduce(
    (acc, item) => {
      acc[item.name] = React.createRef<HTMLButtonElement>();
      return acc;
    },
    {} as Record<string, React.RefObject<HTMLButtonElement>>,
  );

  const toggleDropdown = (name: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && dropdowns) {
        setDropdowns(initialDropdownState);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dropdowns]);

  return (
    <div className="flex space-x-8 font-semibold">
      {navLinks.map((cat, c) => {
        return (
          <AnchorIconDropdown
            key={cat.name}
            HandlerModal={() => toggleDropdown(cat.name)}
            showModal={dropdowns[cat.name]}
            ref={dropdownRefs[cat.name]}
            label={cat.name.toUpperCase()}
            align={c === 0 ? 'left' : 'center'}
          >
            <div className="p-2 w-2xl max-h-[75vh] min-h-96 h-fit overflow-y-auto scrollbar-hide">
              <div className="flex p-3 space-x-3 items-center">
                <h1 className="font-semibold text-lg">{cat.name}</h1>
                <Link
                  href={`/d/${cat.slug}`}
                  className="text-sm text-orange-800 dark:text-orange-600"
                >
                  Show All
                </Link>
              </div>
              <div className="ml-2">
                <CategoryContent
                  navLinks={cat.subcategories}
                  level={1}
                  slug={cat.slug}
                />
              </div>
            </div>
          </AnchorIconDropdown>
        );
      })}
    </div>
  );
}
