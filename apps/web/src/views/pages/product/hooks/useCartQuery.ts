import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { fetchCart } from '@/api/product';

export const useCartQuery = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['cart', user?.id ?? 'guest'],
    queryFn: fetchCart,
    enabled: true,
  });
};
