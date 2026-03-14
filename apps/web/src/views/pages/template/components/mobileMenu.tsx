'use client';
import { useNavbarStore } from '@/store/navbarStore';
import { useRef } from 'react';
import { BiCategory } from 'react-icons/bi';
import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import NavLink from './navLink';

export default function MobileMenu() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const { isOpen, isClose, isNavbar } = useNavbarStore();

  return (
    <div className="relative" onMouseEnter={isOpen} onMouseLeave={isClose}>
      <button
        ref={menuRef}
        className="text-[32px] hover:bg-black rounded-md p-1 bg-black/90 text-[#ededed]"
        type="button"
        aria-label="Open Menu"
        onClick={isOpen}
      >
        <BiCategory />
      </button>
      <AnchoredModalContainer
        open={isNavbar}
        onClose={isClose}
        anchorRef={menuRef}
        align="left"
      >
        <div className="p-5">
          <NavLink
            classDiv="flex gap-2 flex-wrap"
            classLink="flex nav-bg flex-1/3 hover:bg-orange-700 hover:text-[#ededed] w-auto h-18 justify-center items-center rounded-2xl"
          />
        </div>
      </AnchoredModalContainer>
    </div>
  );
}
