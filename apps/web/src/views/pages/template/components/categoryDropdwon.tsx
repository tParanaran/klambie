import { useState, useRef, useEffect } from 'react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import Link from 'next/link';
import { ICategories } from '../../c/types';

interface IDropdownCategory {
  item: ICategories;
  level?: number;
  index: number;
  openIndex: (number | null)[];
  setOpenIndex: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  setSideModalItem: React.Dispatch<React.SetStateAction<ICategories | null>>;
  setSlugModal: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function DropdownCategory({
  item,
  level = 0,
  index,
  openIndex,
  setOpenIndex,
  setSideModalItem,
  setSlugModal,
}: IDropdownCategory) {
  const hasSub = item.subcategories && item.subcategories.length > 0;
  const isOpen = openIndex[level] === index;
  const submenuRef = useRef<HTMLDivElement>(null);
  const [submenuHeight, setSubmenuHeight] = useState<number>(0);

  useEffect(() => {
    if (submenuRef.current) {
      setSubmenuHeight(submenuRef.current.scrollHeight);
    }
  }, [isOpen]);

  const handleClick = () => {
    if (level === 0) {
      setSlugModal(item.slug);
    }
    if (level === 1 && hasSub) {
      setSideModalItem(item);
      setOpenIndex((prev) => {
        const newState = [...prev];
        newState[level] = isOpen ? null : index;
        return newState.slice(0, level + 1);
      });
      return;
    }

    if (!hasSub) return;

    setOpenIndex((prev) => {
      const newState = [...prev];
      newState[level] = isOpen ? null : index;
      return newState.slice(0, level + 1);
    });
  };

  return (
    <div className="relative lg:bg-black/5 lg:dark:bg-white/10 lg:rounded-lg">
      {level === 0 && (
        <button
          onClick={handleClick}
          className={`w-full uppercase bg-black/15 dark:bg-white/5 font-semibold h-16 text-left transition-colors duration-200 p-3 flex items-center ${isOpen ? ' rounded-t-lg' : ' rounded-lg'}`}
          aria-expanded={isOpen}
          aria-controls={`submenu-${level}-${index}`}
        >
          {item.name}
          {hasSub && (
            <IoChevronDown
              className={`text-xl ml-3 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          )}
        </button>
      )}

      {level > 0 && (
        <button
          onClick={handleClick}
          className={`w-full transition-colors duration-200 p-3 md:py-2 flex justify-between ${isOpen ? 'bg-orange-800 text-[#ededed] font-bold' : ''}`}
          aria-expanded={isOpen}
          aria-controls={`submenu-${level}-${index}`}
        >
          <p className="ml-2">{item.name}</p>
          {hasSub && (
            <IoChevronForward
              className={`text-xl transition-transform duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          )}
        </button>
      )}

      {hasSub && level < 1 && (
        <div
          id={`submenu-${level}-${index}`}
          ref={submenuRef}
          style={{
            maxHeight: isOpen ? submenuHeight : 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
          className="flex flex-col rounded-b-lg bg-black/5 dark:bg-white/10"
        >
          <Link
            href={`/d/${item.slug}`}
            className="w-full transition-colors duration-200 p-3 md:py-2 text-left"
          >
            <p className="ml-2 text-orange-800 dark:text-orange-600">
              Show All
            </p>
          </Link>
          {item.subcategories!.map((subItem, subIndex) => (
            <DropdownCategory
              key={subItem.slug}
              item={subItem}
              level={level + 1}
              index={subIndex}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              setSideModalItem={setSideModalItem}
              setSlugModal={setSlugModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
