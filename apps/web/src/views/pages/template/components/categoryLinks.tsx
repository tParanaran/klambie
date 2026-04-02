import { useEffect, useState } from 'react';
import React from 'react';
import AnchorIconDropdown from './dropdown';
import Link from 'next/link';
import CategoryContent from './categoryContent';
import useAttribute from '../../c/hooks/useAttribute';

export default function CategoryLinks() {
  const { categories } = useAttribute();

  const initialDropdownState = categories.reduce(
    (acc, item) => {
      acc[item.name] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [dropdowns, setDropdowns] =
    useState<Record<string, boolean>>(initialDropdownState);

  const dropdownRefs = categories.reduce(
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
      {categories.map((cat, c) => {
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
              {' '}
              <Link href={`/d/${cat.slug}`}>
                <div className="flex space-x-3 items-center p-3">
                  <h1 className="font-semibold text-lg">{cat.name}</h1>
                  <p className="text-sm text-orange-800 dark:text-orange-600">
                    Shop All
                  </p>
                </div>
              </Link>
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
