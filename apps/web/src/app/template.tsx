'use client';

import { ToastContainer } from 'react-toastify';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
}
