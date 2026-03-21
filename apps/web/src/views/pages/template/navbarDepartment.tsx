import Link from 'next/link';
import useAttribute from '../c/hooks/useAttribute';
import useScrollDirection from './hooks/useScrollDirection';
import useScrolled from './hooks/useScrolled';
import useDetectIsMobile from './hooks/useDetectIsMobile';

export default function NavbarDepartment() {
  const { categories } = useAttribute();
  const scrollDir = useScrollDirection(0);
  const isScroll = useScrolled();
  const { isMobile } = useDetectIsMobile({ widthScreen: 390 });

  return (
    <nav
      style={{
        top: isScroll ? 62 : 100,
        zIndex: isScroll ? 20 : 10,
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
            href={`/d/${cat.slug}`}
            className="px-3 py-2  whitespace-nowrap bg-black/15 dark:bg-white/10 rounded-lg uppercase text-xs sm:text-sm font-semibold"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
