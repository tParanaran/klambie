import Link from 'next/link';

const navbarHome = [
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
  { name: 'Shop Now', href: '/c' },
  { name: 'Contact Us', href: '/contact' },
];

export default function NavbarHome() {
  return (
    <div className="bg-[#ededed] dark:bg-[#1A1A1A] rounded-full h-9 sm:h-10 flex items-center w-fit overflow-x-scroll scrollbar-hide">
      {navbarHome.map((nav, n) => (
        <Link
          key={n}
          href={nav.href}
          className={`py-2.5 px-3 lg:px-6 text-orange-700  hover:bg-black hover:text-[#ededed] rounded-full text-xs md:text-sm uppercase flex-none ${nav.href === '/contact' ? 'block sm:hidden' : ''}`}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
