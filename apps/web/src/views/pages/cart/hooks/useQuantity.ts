import { useState, useEffect, useRef } from 'react';
import { ICartItems, IVariantAttribute } from '../types';
import { useDebounce } from './useDebounce';
import axiosInstanceClient from '@/lib/axios/client';
import { ValidationError } from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IErrorsMessageHandle } from '../../product/components/errors';

interface IUseCart {
  cartItems?: ICartItems[];
  cartItemVariant?: IVariantAttribute;
  errorsRefs?: React.MutableRefObject<
    Record<number, IErrorsMessageHandle | null>
  >;
}

export default function useCartQuantities({
  cartItems,
  cartItemVariant,
  errorsRefs,
}: IUseCart) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const prevSynced = useRef<Record<number, number>>({});
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const initial: Record<number, number> = {};

    cartItems?.forEach((item) => {
      const qty = item.quantity ?? 1;
      initial[item.productVariantId] = qty;

      prevSynced.current[item.productVariantId] = qty;
    });

    setQuantities(initial);
  }, [cartItems]);

  const debouncedQuantities = useDebounce(quantities, 700);

  const updateQuantity = (variantId: number, newQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: newQty,
    }));
  };

  // Function to sync one quantity to backend
  const syncQuantity = async (variantId: number, newQty: number) => {
    try {
      const { data } = await axiosInstanceClient.patch(
        `/shop-cart/update-qty/${variantId}`,
        { data: { quantity: Number(newQty) } },
      );

      if (!data.success) {
        errorsRefs?.current[variantId]?.showMessage({ errors: [data.message] });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.setQueryData(['cartLastAdded'], data.addQuantity ?? 0);
      router.refresh();
      errorsRefs?.current[variantId]?.showMessage({ success: data.message });
    } catch (err: any) {
      const messages =
        err instanceof ValidationError
          ? [...new Set(err.errors)]
          : ['Something went wrong'];

      errorsRefs?.current[variantId]?.showMessage({ errors: messages });

      // revert optimistic quantity if needed
      setQuantities((prev) => ({
        ...prev,
        [variantId]: prevSynced.current[variantId] ?? 1,
      }));
    }
    prevSynced.current[variantId] = newQty;
  };

  // Sync debounced quantities to backend
  useEffect(() => {
    Object.entries(debouncedQuantities).forEach(([variantId, newQty]) => {
      const id = Number(variantId);

      if (
        prevSynced.current[id] !== newQty &&
        cartItemVariant?.variantId === id
      ) {
        syncQuantity(id, newQty);
      }
    });
  }, [debouncedQuantities, cartItemVariant]);

  return {
    quantities,
    updateQuantity,
  };
}
