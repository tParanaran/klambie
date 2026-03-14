'use client';

import Container from '@/views/components/container';
import BannerAnimation from '@/views/pages/template/bannerAnimation';
import ContactAnimation from '@/views/pages/template/contactAnimation';
import Footer from '@/views/pages/template/footer';
import NavbarProduct from '@/views/pages/template/navbaProduct';
import Navbar from '@/views/pages/template/navbar';
import NavbarCart from '@/views/pages/template/navbarCart';
import NavbarMobile from '@/views/pages/template/navbarMobile';
import NavbarSearch from '@/views/pages/template/navbarSearch';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cartNavbar = pathname.startsWith('/cart');
  const productNavbar = pathname.startsWith('/p');
  const mobileNavbar =
    pathname.startsWith('/cart') || pathname.startsWith('/p');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {' '}
      <ToastContainer />
      {mounted && <BannerAnimation />}
      {cartNavbar && <NavbarCart />}
      {productNavbar && <NavbarProduct />}
      {!mobileNavbar && <NavbarSearch />}
      <Container>
        <Navbar />
        {children}
      </Container>
      {mounted && <ContactAnimation />}
      {!mobileNavbar && <NavbarMobile />}
      <Footer />
    </div>
  );
}
