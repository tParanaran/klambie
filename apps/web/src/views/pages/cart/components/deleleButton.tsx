'use client';

import Loading from '@/views/components/loading';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function DeleteButton({ variantId }: { variantId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const DeleteCartHandler = async () => {};
  return (
    <>
      <button
        className="text-[#ededed] font-bold text-xl p-2 rounded-full bg-black/60 hover:scale-125"
        aria-label="Remove products"
        onClick={DeleteCartHandler}
      >
        <IoClose />
      </button>
      {isLoading && <Loading />}
    </>
  );
}
