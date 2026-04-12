import { useQueryParams } from '../../c/hooks/useQueryParams';
import { sidebarItems } from '@/utils/dashboard';
import Link from 'next/link';

export default function BottomNavbar() {
  const { pathname } = useQueryParams();

  const navbarItems = sidebarItems.filter(
    (item) => item.path !== '/dashboard' && pathname.startsWith(item.path),
  );

  return (
    <nav className="transition-all duration-200 p-1 rounded-lg shadow-sm overflow-x-scroll scrollbar-hide backdrop-blur-xl mx-3 w-auto max-w-full sm:w-fit dark:bg-white/10  bg-light z-10">
      <div className="flex gap-1">
        {navbarItems[0]?.dropdown?.map((nav, n) => (
          <Link
            key={n}
            href={nav.path}
            className={`px-3 py-2 whitespace-nowrap rounded-lg uppercase text-sm font-semibold ${pathname === nav.path ? 'bg-dark shadow-sm dark:bg-orange-800 text-light' : 'opacity-50 hover:text-orange-700 '}`}
          >
            {nav.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
