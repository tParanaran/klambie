'use client';
import { useEffect, useRef, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import CategoryContent from './categoryContent';
import { categories } from '@/utils/categories';

export default function CategoryMenu() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (
        (window.innerWidth < 768 && showMenu) ||
        (window.innerWidth > 1023 && showMenu)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMenu]);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="relative"
      onMouseEnter={showMenuHandler}
      onMouseLeave={showMenuHandler}
    >
      <button
        ref={menuRef}
        className="text-[32px] hover:bg-black rounded-md p-1 bg-black/90 text-[#ededed]"
        type="button"
        aria-label="Open Menu"
        onClick={showMenuHandler}
      >
        <BiCategory />
      </button>
      <AnchoredModalContainer
        open={showMenu}
        onClose={showMenuHandler}
        anchorRef={menuRef}
        align="left"
      >
        <div className="p-3 w-2xl max-h-[75vh] overflow-y-auto scrollbar-hide">
          <CategoryContent navLinks={categories} />
        </div>
      </AnchoredModalContainer>
    </div>
  );
}
