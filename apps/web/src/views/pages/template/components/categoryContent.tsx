import { NavItem } from '@/utils/navLink';
import { useEffect, useRef, useState } from 'react';
import DropdownCategory from './categoryDropdwon';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

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
      <div ref={dropdownRef} className={`flex flex-col gap-2 w-2xs`}>
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
            className="fixed top-3 right-3 h-fit w-xs z-50 transform transition-transform duration-300 ease-out translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex py-3 justify-between items-center">
              <h2 className="font-semibold">{sideModalItem.name}</h2>
              <button onClick={() => setSideModalItem(null)}>
                <IoClose className="text-2xl hover:scale-125" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                onClick={() =>
                  handleNavigate(
                    `/c/${slug || slugModal}/${sideModalItem.name}`,
                  )
                }
                className="px-4 py-2 font-semibold rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10 text-orange-800"
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
                  className="px-4 py-2 rounded-lg hover:bg-orange-800 hover:text-[#ededed] bg-black/10 dark:bg-white/10"
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
