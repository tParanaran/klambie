import { useAuthStore } from '@/store/authStore';
import SearchBar from './components/searchBar';
import LinkButton from '@/views/components/link';
import NavbarTopContainer from '@/views/components/navbarTopContainer';
import LogoutButton from './components/logoutButton';
import NoticationButton from './components/notificationButton';
import { usePathname } from 'next/navigation';

export default function NavbarSearch() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <NavbarTopContainer>
      <div className="flex justify-between space-x-3 items-center">
        <div className="flex-2">
          <SearchBar />
        </div>
        {!user?.id ? (
          <LinkButton
            linkName={pathname === '/login' ? 'Register' : 'Login'}
            linkHref={pathname === '/login' ? '/register' : '/login'}
          />
        ) : (
          <h1 className="px-2 sm:px-5 py-2 font-semibold text-orange-800">
            Hi, {user?.name.split(' ')[0]}
          </h1>
        )}
        <NoticationButton />
        {user?.id && <LogoutButton iconClass={'text-2xl hover:scale-125'} />}
      </div>
    </NavbarTopContainer>
  );
}
