import IconDropdown from './components/iconDropDown';
import Logo from './components/logo';
import useScrolled from './hooks/useScrolled';
import CategoryMenu from './components/categoryMenu';
import CategoryLinks from './components/categoryLinks';

export default function NavbarBottom() {
  const isScroll = useScrolled();

  return (
    <nav
      className={`hidden md:block sticky left-0 right-0 z-30 space-x-4 rounded-2xl text-secondary ${isScroll ? 'px-3 bg-secondary-opacity backdrop-blur-xl top-1 shadow-xs' : 'py-2 top-0 px-0'}`}
    >
      <div className="flex justify-between items-center space-x-5">
        <div className="flex space-x-2 relative">
          <div className="hidden md:block lg:hidden">
            <CategoryMenu />
          </div>
          <Logo />
        </div>
        <div className="hidden lg:block">
          <CategoryLinks />
        </div>
        <IconDropdown />
      </div>
    </nav>
  );
}
