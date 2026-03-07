import { Parse } from '@/utils/parse';
import { ICartItem } from '../types/product.types';
import axiosInstanceClient from '@/lib/axios/client';

export default function useCart() {
  const addToCart = async (cartItem: ICartItem) => {
    try {
      const response = await axiosInstanceClient.post('/shop-cart/add', {
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
