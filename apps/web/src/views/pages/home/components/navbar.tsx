'use client';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import LogoutButton from '../../template/components/logoutButton';

export default function NavbarHome() {
  const { user } = useAuthStore();

  const navbarHome = user
    ? [
        { name: 'Shop Now', href: '/c' },
        {
          name: user.id !== 6969 ? 'Dashboard' : 'Order',
          href: user.id !== 6969 ? '/dashboard' : '/order',
        },
        { name: 'Contact Us', href: '/contact' },
      ]
    : [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
        { name: 'Shop Now', href: '/c' },
        { name: 'Contact Us', href: '/contact' },
      ];

  return (
    <div className="bg-primary rounded-full h-9 md:h-10 flex items-center w-fit overflow-x-scroll scrollbar-hide">
      {navbarHome.map((nav, n) => (
        <Link
          key={n}
          href={nav.href}
          className={`py-2.5 px-3 lg:px-6 text-active  bg-hover-dark text-hover-light rounded-full text-xs md:text-sm uppercase flex-none ${nav.href === '/contact' ? 'block sm:hidden' : ''}`}
        >
          {nav.name}
        </Link>
      ))}
      {user && (
        <LogoutButton
          iconClass={'hidden'}
          name="Logout"
          className="py-2.5 px-3 lg:px-6 text-active  bg-hover-dark text-hover-light rounded-full text-xs md:text-sm uppercase flex-none"
        />
      )}
    </div>
  );
}
