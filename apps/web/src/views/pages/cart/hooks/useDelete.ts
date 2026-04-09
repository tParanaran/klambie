import { useState } from 'react';
import { useToast } from '../../dashboard/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axiosInstanceClient from '@/lib/axios/client';

export default function useDelete() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast, showToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const DeleteCartHandler = async (
    productIds: number | number[],
    inStock: boolean,
  ) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstanceClient.delete(`/shop-cart/delete`, {
        data: { productIds },
      });

      if (data && inStock) {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.setQueryData(['cartLastAdded'], (old: number = 0) => {
          return old - data.deleteItems || 0;
        });
      }

      router.refresh();

      showToast({
        type: data.type,
        message: data.message,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while delete item',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, toast, DeleteCartHandler };
}
