import { useState, useEffect, useRef } from 'react';
import { ICartItems, IVariantAttribute } from '../types';
import { useDebounce } from './useDebounce';
import axiosInstanceClient from '@/lib/axios/client';
import { ValidationError } from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useCartQuantities(
  cartItems?: ICartItems[],
  cartItem?: IVariantAttribute,
) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [messages, setMessages] = useState<
    Record<number, { success?: string; errors?: string[] }>
  >({});
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

  const debouncedQuantities = useDebounce(quantities, 1000);

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

      const isSuccess = data.success;
      const text = data.message;

      (setMessages((prev) => ({
        ...prev,
        [variantId]: isSuccess
          ? { success: '', errors: [] }
          : { success: '', errors: [] },
      })),
        setTimeout(
          () =>
            setMessages((prev) => ({
              ...prev,
              [variantId]: isSuccess
                ? { success: text, errors: [] }
                : { success: '', errors: [text] },
            })),
          0,
        ));

      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.setQueryData(['cartLastAdded'], data.addQuantity ?? 0);
        router.refresh();
      }
    } catch (err: any) {
      setMessages((prev) => ({
        ...prev,
        [variantId]: {
          success: '',
          errors:
            err instanceof ValidationError
              ? [...new Set(err.errors)]
              : ['Something went wrong'],
        },
      }));

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

      if (prevSynced.current[id] !== newQty && cartItem?.variantId === id) {
        syncQuantity(id, newQty);
      }
    });
  }, [debouncedQuantities, cartItem]);

  return {
    quantities,
    messages,
    setMessages,
    updateQuantity,
  };
}
