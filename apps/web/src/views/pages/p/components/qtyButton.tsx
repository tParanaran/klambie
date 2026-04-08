import { useEffect } from 'react';

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
    <div className="bg-black/10 dark:bg-white/10 flex w-fit items-center rounded-full my-1">
      <button
        disabled={quantity <= 1 || !inStock}
        className="py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleQuantityChange(quantity - 1)}
        aria-label="Drecease quantity"
      >
        -
      </button>
      <p className="p-2">{quantity || 0}</p>
      <button
        disabled={quantity >= stock || !inStock}
        className="py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
