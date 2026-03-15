'use client';
import { BiCategory } from 'react-icons/bi';
import { IoHeartOutline, IoPerson } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import BagButton from './components/bagButton';
import NavbarBottomContainer from '@/views/components/navbarBottomContainer';
import IconLink from './components/iconLink';
import { useRef, useState } from 'react';
import AnchoredModalContainer from '@/views/components/anchoredModalContainer';
import CategoryContent from './components/categoryContent';
import { navLinks } from '@/utils/navLink';

export default function NavbarMobile() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const className = 'flex flex-col items-center justify-center text-xs';
  const iconClass = 'text-2xl transition-transform hover:scale-125';

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <NavbarBottomContainer>
      <div className="flex items-center space-x-4 justify-between">
        <Link href={'/'} className={className}>
          <Image
            src="/icon.svg"
            alt="Klambie"
            height={20}
            width={20}
            className={iconClass}
          />
          <p>Klambie</p>
        </Link>
        <div className="relative">
          <button
            className={className}
            onClick={showMenuHandler}
            ref={menuRef}
            aria-label="Open category"
          >
            <BiCategory className={iconClass} />
            <p>Categories</p>
          </button>
          <AnchoredModalContainer
            open={showMenu}
            anchorRef={menuRef}
            align=""
            zIndex="z-10"
          >
            <div className="p-3 w-screen h-screen overflow-y-auto scrollbar-hide">
              <CategoryContent navLinks={navLinks} />
            </div>
          </AnchoredModalContainer>
        </div>

        <div>
          <BagButton />
        </div>

        <IconLink
          className={className}
          iconClass={iconClass}
          href={'/wishlist'}
          name={'Wishlist'}
          Icon={IoHeartOutline}
        />

        <IconLink
          className={className}
          iconClass={iconClass}
          href={'/account'}
          name={'Account'}
          Icon={IoPerson}
        />
      </div>
    </NavbarBottomContainer>
  );
}
