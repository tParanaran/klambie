import { useEffect, useState } from 'react';
import { ICartItems, ITotalPrice } from '../types';
import { useDebounce } from './useDebounce';
import axiosInstanceClient from '@/lib/axios/client';
import { useToast } from '../../dashboard/hooks/useToast';

export interface ICartItemIds {
  variantId: number;
  quantity: number;
}

export default function useSelect({ cartItems }: { cartItems: ICartItems[] }) {
  const { toast, showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState<ICartItemIds[]>(
    cartItems.map((item) => ({
      variantId: item.productVariantId,
      quantity: item.quantity,
    })),
  );

  const [totalPrice, setTotalPrice] = useState<ITotalPrice | null>(null);

  const toggleItem = (id: number, qty: number) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.variantId === id);

      if (exists) {
        return prev.filter((item) => item.variantId !== id);
      } else {
        return [...prev, { variantId: id, quantity: qty }];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        cartItems.map((item) => ({
          variantId: item.productVariantId,
          quantity: item.quantity,
        })),
      );
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setSelectedItems([]);
      return;
    }

    setSelectedItems((prevSelected) =>
      cartItems
        .map((item) => ({
          variantId: item.productVariantId,
          quantity: item.quantity,
        }))
        .filter((item) =>
          prevSelected.some((prev) => prev.variantId === item.variantId),
        ),
    );
  }, [cartItems]);

  const debouncedQuantities = useDebounce(selectedItems, 700);

  useEffect(() => {
    if (debouncedQuantities.length === 0) {
      return setTotalPrice(null);
    }

    const fetchTotal = async () => {
      try {
        const res = await axiosInstanceClient.post('/shop-cart/select', {
          cartItemIds: debouncedQuantities,
        });

        setTotalPrice({ ...res.data });
      } catch (error) {
        showToast({
          type: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Something went wrong while calculate total price',
        });
      }
    };

    fetchTotal();
  }, [debouncedQuantities]);

  return { toggleItem, toggleSelectAll, selectedItems, totalPrice, toast };
}
