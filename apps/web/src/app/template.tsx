'use client';

import Footer from '@/components/footer/footer';
import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
}
