'use client';

import Container from '@/components/container';
import BannerWalkingText from '@/components/template/banner-walking-text';
import ContactWalkingText from '@/components/template/contact-walking-text';
import Footer from '@/components/template/footer';
import Navbar from '@/components/template/navbar';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerWalkingText />
      <Navbar />
      <Container>
        {children}
        <ToastContainer />
      </Container>
      <ContactWalkingText />
      <Footer />
    </>
  );
}
