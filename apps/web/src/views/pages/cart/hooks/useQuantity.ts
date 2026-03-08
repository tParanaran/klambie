import { useState, useEffect, useRef } from 'react';
import { ICartItems } from '../types';
import { useDebounce } from './useDebounce';
import axiosInstanceClient from '@/lib/axios/client';
import { ValidationError } from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useCartQuantities(cartItems?: ICartItems[]) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [messages, setMessages] = useState<
    Record<number, { success?: string; errors?: string[] }>
  >({});
  const messageTimers = useRef<Record<number, NodeJS.Timeout>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const prevSynced = useRef<Record<number, number>>({});
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const initial: Record<number, number> = {};
    cartItems?.forEach((item) => {
      initial[item.productVariantId] = item.quantity ?? 1;
    });
    setQuantities(initial);
  }, [cartItems]);

  const debouncedQuantities = useDebounce(quantities, 500);

  const updateQuantity = (variantId: number, newQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: newQty,
    }));
  };

  // Function to sync one quantity to backend
  const syncQuantity = async (variantId: number, newQty: number) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstanceClient.patch(
        `/shop-cart/update-qty/${variantId}`,
        { data: { quantity: Number(newQty) } },
      );

      const isSuccess = data.success;
      const text = data.message;

      setMessages((prev) => ({
        ...prev,
        [variantId]: isSuccess
          ? { success: text, errors: [] }
          : { success: '', errors: [text] },
      }));
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
    } finally {
      setIsLoading(false);
    }

    // Clear previous timer if exists
    if (messageTimers.current[variantId])
      clearTimeout(messageTimers.current[variantId]);

    // Auto-hide messages
    messageTimers.current[variantId] = setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [variantId]: { success: '', errors: [] },
      }));
      delete messageTimers.current[variantId];
    }, 3000);

    // mark as synced
    prevSynced.current[variantId] = newQty;
  };

  // Sync debounced quantities to backend
  useEffect(() => {
    Object.entries(debouncedQuantities).forEach(([variantId, newQty]) => {
      const id = Number(variantId);
      if (prevSynced.current[id] !== newQty) {
        syncQuantity(id, newQty);
      }
    });
  }, [debouncedQuantities]);

  return {
    quantities,
    updateQuantity,
    setQuantities,
    isLoading,
    messages,
  };
}
