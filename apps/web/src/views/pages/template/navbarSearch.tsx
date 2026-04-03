import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { Suspense, useState } from 'react';
import SearchBar from './components/searchBar';
import LinkButton from '@/views/components/link';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import LogoutButton from './components/logoutButton';
import SearchRecent from './components/searchRecent';
import useMobileBehavior from './hooks/useMobile';
import useHandleClickOutside from './hooks/useHandleClickOutside';
import NavbarDepartment from './navbarDepartment';
import Notification from './notification';
interface IDropdown {
  search: boolean;
}

export default function NavbarSearch() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [dropdowns, setDropdowns] = useState<IDropdown>({
    search: false,
  });

  const toggleDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleClickOutside = () => {
    toggleDropdown('search');
  };

  const { dropdownRef, modalRef } = useHandleClickOutside({
    handleClickOutside,
  });

  useMobileBehavior({
    setShow: () => toggleDropdown('search'),
    show: dropdowns.search,
    ref: dropdownRef,
    isMobile: dropdowns.search,
  });

  return (
    <>
      <NavbarTopContainer>
        <div className="flex justify-between space-x-3 items-center">
          <Suspense fallback={<div style={{ width: '100%' }} />}>
            <div
              className="flex-2"
              ref={modalRef}
              onFocus={() => toggleDropdown('search')}
            >
              <SearchBar />
            </div>
          </Suspense>
          {!user?.id ? (
            <LinkButton
              linkName={pathname === '/login' ? 'Register' : 'Login'}
              linkHref={pathname === '/login' ? '/register' : '/login'}
            />
          ) : (
            <h1 className="px-2 sm:px-5 py-2 font-semibold text-orange-800 dark:text-orange-600">
              Hi, {user?.name.split(' ')[0]}
            </h1>
          )}

          <Notification />

          {user?.id && <LogoutButton iconClass={'text-2xl hover:scale-125'} />}
        </div>

        {dropdowns.search && (
          <div ref={dropdownRef}>
            <SearchRecent />
          </div>
        )}
      </NavbarTopContainer>

      {!dropdowns.search && <NavbarDepartment />}
    </>
  );
}
