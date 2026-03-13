'use client';

import { useEffect, useState } from 'react';

export default function NavbarTopContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const changeNavbar = () => {
    const scrolled = window.scrollY >= 20;
    setIsScroll((prev) => (prev !== scrolled ? scrolled : prev));
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavbar, { passive: true });
    return () => window.removeEventListener('scroll', changeNavbar);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-20 md:hidden px-3 sm:px-10 text-sm space-x-3  ${isScroll ? 'py-3 bg-white' : 'py-5'}`}
    >
      {children}
    </nav>
  );
}
