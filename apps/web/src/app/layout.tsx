import './globals.css';
import 'swiper/css/bundle';
import type { Metadata } from 'next';
import { notoSans } from '@/utils/fonts';
import AuthProvider from '@/provider/authProvider';
import { Suspense } from 'react';
import Loading from '@/views/components/loading';

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
        <AuthProvider>
          {/* <Suspense fallback={<Loading />}></Suspense> */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
