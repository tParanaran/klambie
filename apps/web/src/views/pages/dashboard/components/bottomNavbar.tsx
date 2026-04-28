import { useQueryParams } from '../../c/hooks/useQueryParams';
import { sidebarItems } from '@/utils/dashboard';
import Link from 'next/link';

export default function BottomNavbar() {
  const { pathname } = useQueryParams();

  const navbarItems = sidebarItems.filter(
    (item) => item.path !== '/dashboard' && pathname.startsWith(item.path),
  );

  return (
    <nav className="bg-light dark:bg-black rounded-full h-9 md:h-10 flex items-center w-fit overflow-x-scroll scrollbar-hide ransition-all duration-200 mx-auto mb-1">
      {navbarItems[0]?.dropdown?.map((nav, n) => (
        <Link
          key={n}
          href={nav.path}
          className={`py-2.5 px-3 lg:px-6 rounded-full text-xs md:text-sm uppercase flex-none ${pathname === nav.path ? 'bg-dark shadow-sm dark:bg-orange-800 text-light' : 'text-active hover:opacity-50'}`}
        >
          {nav.title}
        </Link>
      ))}
    </nav>
  );
}
