import IconDropdown from './components/iconDropDown';
import Logo from './components/logo';
import MobileMenu from './components/mobileMenu';
import NavLink from './components/navLink';
import useScrolled from './hooks/useScrolled';

export default function NavbarBottom() {
  const isScroll = useScrolled();

  return (
    <nav
      className={`hidden md:block sticky left-0 right-0 z-40 space-x-4 rounded-2xl  ${isScroll ? 'px-3 dark:text-[#ededed] dark:bg-black/80 text-black bg-[#ededed]/80 backdrop-blur-lg top-1' : 'py-5 top-0 px-0'}`}
    >
      <div className="flex justify-between items-center space-x-5">
        <div className="flex space-x-2 relative">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <Logo />
        </div>
        <div className="hidden lg:block">
          <NavLink classDiv="space-x-10" />
        </div>
        <IconDropdown />
      </div>
    </nav>
  );
}
