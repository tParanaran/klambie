import Link from 'next/link';
import useAttribute from '../c/hooks/useAttribute';
import useScrollDirection from './hooks/useScrollDirection';
import useScrolled from './hooks/useScrolled';
import useDetectIsMobile from './hooks/useDetectIsMobile';
import { useQueryParams } from '../c/hooks/useQueryParams';

export default function NavbarDepartment() {
  const { pathname } = useQueryParams();
  const { categories } = useAttribute();
  const { isMobile } = useDetectIsMobile({ widthScreen: 390 });
  const scrollDir = useScrollDirection(0);
  const isScroll = useScrolled();

  return (
    <nav
      style={{
        top: isScroll ? 62 : 100,
        zIndex: 30,
        right: isMobile ? 12 : 'fit',
      }}
      className={`fixed left-3 sm:left-5 transition-all duration-200 py-1.5 md:hidden rounded-full overflow-x-scroll scrollbar-hide
        px-2 ${
          scrollDir === 'down'
            ? 'opacity-0 -translate-y-full pointer-events-none'
            : 'opacity-100 translate-y-0'
        } ${isScroll ? 'dark:bg-[#1b1a1e]/80 bg-[#ededed]/80 backdrop-blur-xl shadow-xs' : ''}`}
    >
      <div className="flex space-x-1">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/c/${cat.slug}`}
            className={`px-3 py-2  whitespace-nowrap rounded-lg uppercase text-xs sm:text-sm font-semibold ${pathname.includes(cat.slug) ? 'bg-black/90 dark:bg-orange-800 text-[#ededed]' : 'bg-black/15 dark:bg-white/10 '}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
