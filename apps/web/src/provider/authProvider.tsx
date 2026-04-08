'use client';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useToast } from '@/views/pages/dashboard/hooks/useToast';
import ToastMessage from '@/views/components/toastMessage';

type Token = {
  email: string;
  id: number;
  name: string;
  role: number;
  iat: number;
  exp: number;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onAuthSuccess, clearAuth } = useAuthStore();
  const { toast, showToast } = useToast();
  const redirect = useRouter();
  const access_token = getCookie('access_token') || '';
  const [queryClient] = useState(() => new QueryClient());

  const checkLogin = async () => {
    const token: Token = jwtDecode(access_token as string);

    if (Date.now() >= token.exp * 1000) {
      showToast({
        type: 'error',
        message: 'Login session was expired, pleasae login again',
      });
      clearAuth();
      redirect.push('/login');
    } else {
      onAuthSuccess({
        email: token.email,
        name: token.name,
        role: token.role,
        id: token.id,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (access_token) {
        checkLogin();
      }
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {toast.visible && (
        <ToastMessage {...toast} style="fixed bottom-3 right-3" />
      )}
    </QueryClientProvider>
  );
}
