import { NavItem } from '@/utils/navLink';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import DropdownCategory from './categoryDropdwon';

interface ICategoryContent {
  slug?: string;
  level?: number;
  navLinks?: NavItem[];
  isMobile?: boolean;
}

export default function CategoryContent({
  level,
  navLinks,
  slug,
  isMobile = false,
}: ICategoryContent) {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<(number | null)[]>([]);
  const [sideModalItem, setSideModalItem] = useState<NavItem | null>(null);
  const [slugModal, setSlugModal] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sideModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        sideModalRef.current &&
        !sideModalRef.current.contains(event.target as Node)
      ) {
        setOpenIndex([]);
        setSideModalItem(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    setSideModalItem(null);
    setOpenIndex([]);
    router.push(path);
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={`flex flex-col gap-2  ${isMobile ? 'w-auto sm:w-[16rem] mt-16 ml-3 mr-3 sm:ml-10' : 'w-2xs'}`}
      >
        {navLinks?.map((item, i) => (
          <DropdownCategory
            key={i}
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
            ref={sideModalRef}
            className={`fixed h-fit z-50 transform transition-transform duration-300 ease-out translate-x-0 ${isMobile ? 'pt-16 bg-white sm:bg-transparent sm:right-10 top-0 w-full h-full sm:w-[45%] px-3 sm:px-0' : 'w-xs top-3 right-3 '}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex py-3 justify-between items-center">
              <h2 className="font-semibold">{sideModalItem.name}</h2>
              <button onClick={() => setSideModalItem(null)}>
                <IoClose className="text-2xl hover:scale-125" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleNavigate(
                    `/c/${slug || slugModal}/${sideModalItem.name}`,
                  )
                }
                className={`font-semibold rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10 text-orange-800 ${isMobile ? 'py-4 px-8 text-base' : 'px-4 py-2 text-sm'}`}
              >
                <p>Show All</p>
              </button>
              {sideModalItem.subcategories?.map((subItem, i) => (
                <button
                  key={i}
                  onClick={() =>
                    handleNavigate(
                      `/c/${slug || slugModal}/${sideModalItem.name}/${subItem.name}`,
                    )
                  }
                  className={`px-4 py-2 rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10 ${isMobile ? 'py-4 px-8 text-base' : 'px-4 py-2 text-sm'}`}
                >
                  {subItem.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
