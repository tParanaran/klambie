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
import useMobileBehavior from './hooks/useMobile';
import { categories } from '@/utils/navLink';

export default function NavbarMobile() {
  const categoryRef = useRef<HTMLButtonElement>(null);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const className = 'flex flex-col items-center justify-center text-xs';
  const iconClass = 'text-2xl transition-transform hover:scale-125';

  const showMenuHandler = () => {
    setShowCategory(!showCategory);
  };

  useMobileBehavior({
    setShow: setShowCategory,
    ref: categoryRef,
    show: showCategory,
  });

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
            ref={categoryRef}
            aria-label="Open category"
          >
            <BiCategory className={iconClass} />
            <p>Categories</p>
          </button>
          <AnchoredModalContainer
            open={showCategory}
            anchorRef={categoryRef}
            onClose={showMenuHandler}
            align="default"
            zIndex="20"
          >
            <div className="w-screen h-screen overflow-y-auto scrollbar-hide max-h-[92vh] sm:max-h-[95vh] pb-[10%]">
              <CategoryContent navLinks={categories} isMobile={true} />
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
