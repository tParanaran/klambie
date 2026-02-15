'use client';

import Container from '@/components/container';
import BannerWalkingText from '@/components/template/banner-walking-text';
import ContactWalkingText from '@/components/template/contact-walking-text';
import Footer from '@/components/template/footer';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerWalkingText />
      <Container>
        {children}
        <ToastContainer />
      </Container>
      <ContactWalkingText />
      <Footer />
    </>
  );
}
