import { useEffect } from 'react';

interface IQuantityButton {
  quantity: number;
  stock: number;
  inStock: boolean;
  loading?: boolean;
  onChange: (qty: number) => void;
}
export default function QuantityButton({
  inStock,
  stock,
  onChange,
  quantity,
  loading,
}: IQuantityButton) {
  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= stock) {
      onChange(newQty);
    }
  };

  return (
    <div className="bg-black/10 flex w-fit items-center rounded-full my-1">
      <button
        disabled={quantity <= 1 || loading}
        className="py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleQuantityChange(quantity - 1)}
        aria-label="Drecease quantity"
      >
        -
      </button>
      <p className="p-2">{quantity}</p>
      <button
        disabled={quantity >= stock || !inStock || loading}
        className="py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
