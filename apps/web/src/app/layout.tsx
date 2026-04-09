import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import type { Metadata } from 'next';
import { notoSans } from '@/utils/fonts';
import { Suspense } from 'react';
import AuthProvider from '@/provider/authProvider';
import ToastWrapper from '@/views/components/toastWrapper';

export const metadata: Metadata = {
  title: 'Klambie',
  description: 'Klambie Clothing Online Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <ToastWrapper />
        <AuthProvider>
          <Suspense>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
