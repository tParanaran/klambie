'use client';
import { ICategories } from '../../c/types';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import DropdownCategory from './categoryDropdwon';
import useHandleClickOutside from '../hooks/useHandleClickOutside';
import Link from 'next/link';

interface ICategoryContent {
  slug?: string;
  level?: number;
  navLinks?: ICategories[];
  isMobile?: boolean;
}

export default function CategoryContent({
  level,
  navLinks,
  slug,
  isMobile = false,
}: ICategoryContent) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<(number | null)[]>([]);
  const [sideModalItem, setSideModalItem] = useState<ICategories | null>(null);
  const [slugModal, setSlugModal] = useState<string>(slug || '');

  const handleClickOutside = () => {
    setOpenIndex([]);
    setSideModalItem(null);
  };

  const { dropdownRef, modalRef } = useHandleClickOutside({
    handleClickOutside,
  });

  useEffect(() => {
    setSideModalItem(null);
    setOpenIndex([]);
  }, [pathname]);

  return (
    <>
      <div
        ref={dropdownRef}
        className={`flex flex-col gap-2  ${isMobile ? 'w-auto sm:w-[16rem] mt-16 ml-3 mr-3 sm:ml-10' : 'w-2xs'}`}
      >
        {navLinks?.map((item, i) => (
          <DropdownCategory
            slug={slugModal}
            key={item.slug}
            item={item}
            level={level}
            index={i}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            setSideModalItem={setSideModalItem}
            setSlugModal={setSlugModal}
          />
        ))}
      </div>

      {/* Side modal */}
      {sideModalItem && (
        <>
          {/* Side panel */}
          <div
            ref={modalRef}
            className={`fixed h-fit z-30 transform transition-transform duration-300 ease-out translate-x-0 ${isMobile ? 'pt-16 bg-[#ededed] dark:bg-black sm:bg-transparent!  sm:right-10 top-0 w-full h-full sm:w-[45%] px-3 sm:px-0' : 'w-xs top-3 right-3 '}`}
          >
            <div className="flex py-3 justify-between items-center">
              <h2 className="font-semibold">{sideModalItem.name}</h2>
              <button onClick={() => setSideModalItem(null)}>
                <IoClose className="text-2xl hover:scale-125" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/c/${slug || slugModal}/${sideModalItem.slug}`}
                className={`font-semibold rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10 text-orange-800 dark:text-orange-600 ${isMobile ? 'py-3 px-8 text-base' : 'px-4 py-2 text-sm'}`}
              >
                <p>Shop All</p>
              </Link>
              {sideModalItem.subcategories?.map((subItem, i) => (
                <Link
                  href={`/c/${slug || slugModal}/${sideModalItem.slug}/${subItem.slug}`}
                  key={i}
                  className={`px-4 py-2 rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10 ${isMobile ? 'py-3 px-8 text-base' : 'px-4 py-2 text-sm'}`}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
