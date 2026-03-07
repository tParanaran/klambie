'use client';
import { useState } from 'react';
import QuantityButton from '../../product/components/qtyButton';

export default function AddNewQty({
  quantity,
  inStock,
  stock,
}: {
  quantity: number;
  inStock: boolean;
  stock: number;
}) {
  const [newQty, setNewQty] = useState<number>(quantity);
  return (
    <>
      <QuantityButton
        quantity={newQty}
        stock={stock}
        inStock={inStock}
        onChange={setNewQty}
      />
    </>
  );
}
