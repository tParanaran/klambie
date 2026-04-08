'use client';

import Loading from '@/views/components/loading';
import { IoClose } from 'react-icons/io5';
import ToastMessage from '@/views/components/toastMessage';
import useDelete from '../hooks/useDelete';

export default function DeleteButton({
  variantId,
  inStock,
}: {
  variantId: number;
  inStock: boolean;
}) {
  const { DeleteCartHandler, isLoading, toast } = useDelete({ inStock });

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
