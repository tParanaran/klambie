import { useState } from 'react';

interface IQuantityButton {
  quantity: number;
  stock: number;
  inStock: boolean;
  onChange: (qty: number) => void;
}
export default function QuantityButton({
  inStock,
  stock,
  onChange,
  quantity,
}: IQuantityButton) {
  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= stock) {
      onChange(newQty);
    }
  };

  return (
    <div className="my-5">
      <div className="bg-black/10 flex w-fit items-center rounded-full">
        <button
          disabled={quantity <= 1}
          className="py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleQuantityChange(quantity - 1)}
          aria-label="Drecease quantity"
        >
          -
        </button>
        <p className="p-2">{quantity}</p>
        <button
          disabled={quantity >= stock || !inStock}
          className="py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleQuantityChange(quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      {!inStock ? (
        <p className="text-sm my-2 text-orange-700">Out of Stock</p>
      ) : (
        <p className="text-sm my-2 opacity-50">Stock: {stock}</p>
      )}
    </div>
  );
}
