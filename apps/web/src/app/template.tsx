'use client';

import Container from '@/views/components/container';
import BannerAnimation from '@/views/pages/template/bannerAnimation';
import ContactAnimation from '@/views/pages/template/contactAnimation';
import Footer from '@/views/pages/template/footer';
import Navbar from '@/views/pages/template/navbar';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerAnimation />
      <Navbar />
      <Container>
        {children}
        <ToastContainer />
      </Container>
      <ContactAnimation />
      <Footer />
    </>
  );
}
