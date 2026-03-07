import { useEffect, useState } from 'react';
import { ICartItems } from '../types';

export default function useSelect(cartItems: ICartItems[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>(
    cartItems.map((item) => item.productVariantId),
  );

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.productVariantId));
    }
  };

  useEffect(() => {
    setSelectedItems((prevSelected) =>
      cartItems
        .map((item) => item.productVariantId)
        .filter((id) => prevSelected.includes(id)),
    );
  }, [cartItems]);

  return { toggleItem, toggleSelectAll, selectedItems };
}
