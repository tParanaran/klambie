'use client';

import axiosInstanceClient from '@/lib/axios/client';
import Loading from '@/views/components/loading';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../dashboard/hooks/useToast';
import ToastMessage from '@/views/components/toastMessage';

export default function DeleteButton({
  variantId,
  inStock,
}: {
  variantId: number;
  inStock: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast, showToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const DeleteCartHandler = async (variantId: number) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstanceClient.delete(
        `/shop-cart/delete/${variantId}`,
      );

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

  return (
    <>
      <button
        className="text-light font-bold text-lg p-1 rounded-full bg-black/60 hover:scale-125"
        aria-label="Remove products"
        onClick={() => DeleteCartHandler(variantId)}
      >
        <IoClose />
      </button>
      {isLoading && <Loading />}
      {toast.visible && (
        <ToastMessage {...toast} style="fixed bottom-3 right-3" />
      )}
    </>
  );
}
