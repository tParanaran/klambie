import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { Parse } from '@/utils/parse';
import { getCookie } from 'cookies-next';
import { useMemo } from 'react';
import { ICartItem } from '../types/product.types';

export default function UseCart() {
  const user = useAuthStore((state) => state.user);
  const sessionId = getCookie('sessionId') as string | undefined;

  const indenity = useMemo(() => {
    return {
      userId: user?.id ?? null,
      sessionId: user ? null : sessionId,
    };
  }, [user, sessionId]);

  const addToCart = async (cartItem: ICartItem) => {
    if (!indenity.userId && !indenity.sessionId)
      return {
        success: false,
        message: `Cannot add into your cart.`,
      };

    try {
      const response = await axiosInstance.post('/cart/add', {
        productVariantId: cartItem.productVariantId,
        quantity: cartItem.quantity,
        unitPrice: Parse(cartItem.unitPrice),
      });

      if (!response) {
        return {
          success: false,
          message: `Cannot add into your cart.`,
        };
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: `Cannot add into your cart.`,
      };
    }
  };
  return { addToCart };
}
