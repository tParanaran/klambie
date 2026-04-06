import { useQueryParams } from '../../c/hooks/useQueryParams';
import { sidebarItems } from '@/utils/dashboard';
import Link from 'next/link';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';

export default function BottomNavbar() {
  const { pathname } = useQueryParams();
  const { isMobile } = useDetectIsMobile({ widthScreen: 390 });

  const navbarItems = sidebarItems.filter(
    (item) => item.path !== '/dashboard' && pathname.startsWith(item.path),
  );

  return (
    <nav
      style={{
        zIndex: 20,
        right: isMobile ? 12 : 'fit',
      }}
      className={`fixed left-0 md:left-20 lg:left-auto ml-4 transition-all duration-200 py-1.5 rounded-full overflow-x-scroll scrollbar-hide
        px-2 backdrop-blur-xl top-18 sm:top-19 md:top-23`}
    >
      <div className="flex space-x-1">
        {navbarItems[0]?.dropdown?.map((nav, n) => (
          <Link
            key={n}
            href={nav.path}
            className={`px-3 py-2 whitespace-nowrap rounded-full uppercase text-xs sm:text-sm font-semibold ${pathname === nav.path ? 'bg-dark dark:bg-orange-800 text-light' : 'bg-black/15 dark:bg-white/10 '}`}
          >
            {nav.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
