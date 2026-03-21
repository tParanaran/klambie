import useScrolled from '../pages/template/hooks/useScrolled';

export default function NavbarTopContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScroll = useScrolled();

  return (
    <nav
      style={{
        height: isScroll ? 'auto' : 110,
      }}
      className={`sticky top-0 left-0 right-0 z-30 md:hidden px-3 sm:px-5 text-sm space-x-3  ${isScroll ? 'py-2 dark:text-[#ededed] dark:bg-[#1b1a1e]/80 text-black bg-[#ededed]/80 backdrop-blur-xl shadow-xs' : 'pt-5'} `}
    >
      {children}
    </nav>
  );
}
