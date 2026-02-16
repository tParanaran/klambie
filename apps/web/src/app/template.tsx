'use client';

import Container from '@/components/container';
import BannerAnimation from '@/components/template/bannerAnimation';
import ContactAnimation from '@/components/template/contactAnimation';
import Footer from '@/components/template/footer';
import Navbar from '@/components/template/navbar';
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
