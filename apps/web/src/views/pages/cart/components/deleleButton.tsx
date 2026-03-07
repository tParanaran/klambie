'use client';

import axiosInstanceClient from '@/lib/axios/client';
import { Notify } from '@/lib/notify';
import Loading from '@/views/components/loading';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DeleteButton({ variantId }: { variantId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const DeleteCartHandler = async (variantId: number) => {
    setIsLoading(true);
    try {
      await axiosInstanceClient.delete(`/shop-cart/delete/${variantId}`);
    } catch (error) {
      Notify(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: DeleteCartHandler,
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <>
      <button
        className="text-[#ededed] font-bold text-lg p-0.5 rounded-full bg-black/60 hover:scale-125"
        aria-label="Remove products"
        onClick={() => mutation.mutateAsync(variantId)}
      >
        <IoClose />
      </button>
      {isLoading && <Loading />}
    </>
  );
}
