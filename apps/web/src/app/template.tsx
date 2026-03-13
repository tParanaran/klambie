'use client';

import Container from '@/views/components/container';
import BannerAnimation from '@/views/pages/template/bannerAnimation';
import ContactAnimation from '@/views/pages/template/contactAnimation';
import Footer from '@/views/pages/template/footer';
import Navbar from '@/views/pages/template/navbar';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {' '}
      <ToastContainer />
      {mounted && <BannerAnimation />}
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Container>{children}</Container>
      {mounted && <ContactAnimation />}
      <Footer />
    </div>
  );
}
