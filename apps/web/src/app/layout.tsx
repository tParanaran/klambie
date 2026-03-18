import './globals.css';
import 'swiper/css/bundle';
import type { Metadata } from 'next';
import { notoSans } from '@/utils/fonts';
import AuthProvider from '@/provider/authProvider';

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
      <AuthProvider>
        <body className={notoSans.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
