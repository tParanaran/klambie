import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import SearchBar from './components/searchBar';
import LinkButton from '@/views/components/link';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import LogoutButton from './components/logoutButton';
import SearchRecent from './components/searchRecent';

export default function NavbarSearch() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  const handlerFocus = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchRef.current &&
        recentRef.current &&
        !searchRef.current.contains(target) &&
        !recentRef.current.contains(target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarTopContainer>
      <div className="flex justify-between space-x-3 items-center">
        <div className="flex-2" ref={searchRef} onFocus={handlerFocus}>
          <SearchBar />
        </div>
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
        <IoNotifications className="text-2xl hover:scale-125" />
        {user?.id && <LogoutButton iconClass={'text-2xl hover:scale-125'} />}
      </div>
      {showSearch && (
        <div ref={recentRef}>
          <SearchRecent />
        </div>
      )}
    </NavbarTopContainer>
  );
}
