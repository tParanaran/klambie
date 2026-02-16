'use client';
import { useEffect, useState } from 'react';
import { useNavbarStore } from '@/store/navbar-store';
import { useProfileStore } from '@/store/profile-store';
import Logo from './components/logo';
import IconLink from './components/iconLink';
import MobileButton from './components/mobileButton';
import MobileMenu from './components/mobileMenu';
import ProfileMenu from './components/profileMenu';
import NavLink from './components/navLink';
import BackgroundModal from '@/views/components/backgoundModal';

export default function NavbarBottom() {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const navbar = useNavbarStore();
  const profile = useProfileStore();
  //   const searchStore = useSearchStore();

  const changeNavbar = () => {
    if (window.scrollY >= 30) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    // searchStore.isSearchHandleClose();
    window.addEventListener('scroll', changeNavbar);
    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto py-6">
      <div
        className={`lg:max-w-7xl lg:mx-auto z-30 right-0 left-0 transition-transform delay-150 duration-300 ease-in-out
        ${isScroll ? `fixed top-1 text-[#ededed]` : `top-14`}`}
      >
        <div
          className={`mx-3 sm:mx-10 ${
            isScroll
              ? 'bg-black/70 backdrop-blur-lg py-2.5 px-3 lg:px-4 rounded-full sm:rounded-2xl'
              : null
          }`}
        >
          <nav className="hidden lg:flex justify-between items-center space-x-5">
            <Logo />
            <NavLink classDiv="space-x-10" classLink="" />
            <IconLink />
          </nav>
          <nav className="flex lg:hidden justify-between items-center overflow-hidden">
            <div className="flex space-x-1 items-center overflow-hidden">
              <MobileButton />
              <Logo />
            </div>{' '}
            <IconLink />
          </nav>
        </div>
      </div>
      {/* {searchStore.isSearch && (
        <>
          <SearchModal
            isScroll={isScroll}
            categories={categories}
            brands={brands}
          />{' '}
          <BackgroundModal
            setIsModal={searchStore.isSearchHandleClose}
            classZIndex="z-20"
            classBackground="bg-none"
          />
        </>
      )} */}
      {navbar.isNavbar && (
        <>
          {' '}
          <MobileMenu isScroll={isScroll} />{' '}
          <BackgroundModal
            setIsModal={navbar.isClose}
            classZIndex="z-20 lg:hidden"
            classBackground="bg-none"
          />{' '}
        </>
      )}
      {profile.isProfile && (
        <>
          <ProfileMenu isScroll={isScroll} />
          <BackgroundModal
            setIsModal={profile.isClose}
            classZIndex="z-20"
            classBackground="bg-none"
          />
        </>
      )}
    </div>
  );
}
