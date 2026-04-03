import { useQueryParams } from '../../c/hooks/useQueryParams';
import Link from 'next/link';
import useDetectIsMobile from '../../template/hooks/useDetectIsMobile';
import useScrollDirection from '../../template/hooks/useScrollDirection';
import useScrolled from '../../template/hooks/useScrolled';
import { sidebarItems } from '@/utils/dashboard';

export default function BottomNavbar() {
  const { pathname } = useQueryParams();
  const { isMobile } = useDetectIsMobile({ widthScreen: 390 });
  const scrollDir = useScrollDirection(0);
  const isScroll = useScrolled();

  const navbarItems = sidebarItems.filter(
    (item) => item.path !== '/dashboard' && pathname.startsWith(item.path),
  );

  console.log(navbarItems);

  return (
    <nav
      style={{
        zIndex: 20,
        right: isMobile ? 12 : 'fit',
      }}
      className={`fixed left-0 sm:left-20 transition-all duration-200 py-1.5 rounded-full overflow-x-scroll scrollbar-hide
        px-2 ${
          scrollDir === 'down'
            ? 'opacity-0 -translate-y-full pointer-events-none'
            : 'opacity-100 translate-y-0'
        } ${isScroll ? 'bg-secondary-opacity  backdrop-blur-xl shadow-xs top-16' : 'top-16 md:top-22'}`}
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
