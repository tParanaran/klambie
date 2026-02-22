'use client';
import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { Notify } from '@/lib/notify';
import { useRouter } from 'next/navigation';

type Token = {
  email: string;
  username: string;
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
  const redirect = useRouter();
  const access_token = getCookie('access_token') || '';

  const checkLogin = async () => {
    const token: Token = jwtDecode(access_token as string);

    if (Date.now() >= token.exp * 1000) {
      Notify('Login session was expired, pleasae login again');
      clearAuth();
      redirect.push('/login');
    } else {
      onAuthSuccess({
        email: token.email,
        name: token.name,
        role: token.role,
        username: token.username,
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
  return <>{children}</>;
}
