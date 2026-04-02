import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import SearchBar from './components/searchBar';
import LinkButton from '@/views/components/link';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import LogoutButton from './components/logoutButton';
import SearchRecent from './components/searchRecent';
import AnchorIconDropdown from './components/dropdown';
import NotificationContent from './notification';
import useMobileBehavior from './hooks/useMobile';
import useHandleClickOutside from './hooks/useHandleClickOutside';
import useDetectIsMobile from './hooks/useDetectIsMobile';
import NavbarDepartment from './navbarDepartment';
interface IDropdown {
  search: boolean;
  notification: boolean;
}

export default function NavbarSearch() {
  const notificationRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [dropdowns, setDropdowns] = useState<IDropdown>({
    search: false,
    notification: false,
  });
  const { isMobile } = useDetectIsMobile({});

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
    setShow: () => toggleDropdown('notification'),
    show: dropdowns.notification,
    ref: notificationRef,
    isMobile: isMobile,
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
          <AnchorIconDropdown
            HandlerModal={() => toggleDropdown('notification')}
            showModal={dropdowns.notification}
            ref={notificationRef}
            Icon={IoNotifications}
            align={isMobile ? 'default' : 'right'}
            zIndex={isMobile ? 'z-10' : 'z-30'}
          >
            <div
              className={`overflow-y-auto scrollbar-hide p-3 ${isMobile ? 'w-screen h-screen mt-14 max-h-[93vh]' : 'w-sm h-fit max-h-[75vh]'}`}
            >
              <NotificationContent />
            </div>
          </AnchorIconDropdown>
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
