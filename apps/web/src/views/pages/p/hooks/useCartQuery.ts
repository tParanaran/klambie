'use client';
import axiosInstanceClient from '@/lib/axios/client';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

export function useCartQuery() {
  const user = useAuthStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ['cart', user?.id ?? 'guest'],
    queryFn: () =>
      axiosInstanceClient.get('/shop-cart/count').then((res) => res.data),
    enabled: true,
  });

  const total = data?.total ?? null;

  return total;
}
