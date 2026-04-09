'use client';

import ToastMessage from '@/views/components/toastMessage';
import useActions from '../hooks/useActions';

export default function Status({
  status,
  productId,

  isVariant = false,
}: {
  status: string;
  productId: number;

  isVariant?: boolean;
}) {
  const { archive, toast, updateVariant } = useActions(productId);

  return (
    <>
      <button
        className={`cursor-pointer py-1 px-2 w-16 text-center mx-auto rounded-full text-xs ${status === 'ACTIVE' ? 'text-red-700 bg-red-700/20' : status === 'ARCHIVE' ? 'text-yellow-700 bg-yellow-600/20' : 'text-gray-500 bg-gray-500/20'}`}
        onClick={() => {
          isVariant
            ? updateVariant({ isActive: status === 'ACTIVE' ? false : true })
            : archive();
        }}
        aria-label="Change status product"
      >
        <p>{status}</p>
      </button>
      {toast.visible && (
        <ToastMessage {...toast} style="right-3 bottom-3 fixed z-50" />
      )}
    </>
  );
}
