import { useState, useEffect } from 'react';
import { ICartItems } from '../types';

export type CartItem = {
  productVariantId: number;
  quantity?: number;
  stockAvailable: number;
};

export default function useCartQuantities(cartItems: ICartItems[]) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    cartItems.forEach((item) => {
      initialQuantities[item.productVariantId] = item.quantity ?? 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const updateQuantity = (variantId: number, newQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: newQty,
    }));
  };

  return { quantities, updateQuantity };
}
