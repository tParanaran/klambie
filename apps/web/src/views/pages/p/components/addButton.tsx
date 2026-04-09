'use client';
import Button from '@/views/components/button';
import { IoHeartOutline } from 'react-icons/io5';
import { useCartQuery } from '../hooks/useCartQuery';
import LinkButton from '@/views/components/link';
import { useRouter } from 'next/navigation';
import { Children } from 'react';

interface IAddToCartButton {
  isLoading: boolean;
  isDisabled: boolean;
  handleAddToCart: () => Promise<void>;
  children?: React.ReactNode;
}

export default function AddToCartButton({
  handleAddToCart,
  isLoading,
  isDisabled,
  children,
}: IAddToCartButton) {
  return (
    <div className="flex space-x-4 items-center justify-between">
      <IoHeartOutline className="text-2xl hover:scale-125" />
      <div className="flex-2">
        <div className="flex space-x-1">
          <Button
            onClick={handleAddToCart}
            loading={isLoading}
            className="bg-orange-800 w-fit"
            disabled={isDisabled}
          >
            Add
          </Button>
          {children}
          <Button
            onClick={() => console.log('Next Feature')}
            loading={isLoading}
            disabled={isDisabled}
            className="border border-orange-800 w-fit text-orange-800 dark:text-orange-600 dark:border-orange-600 hover:text-white hover:border-orange-700"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
