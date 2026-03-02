import { useState } from 'react';

interface IQuantityButton {
  inStock: boolean;
  stock: number;
}

export default function QuantityButton({ inStock, stock }: IQuantityButton) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="my-5">
      <div>
        <div className="bg-black/10 flex w-fit items-center rounded-full">
          <button
            disabled={quantity <= 1}
            className="py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setQuantity(quantity - 1)}
            aria-label="Drecease quantity"
          >
            -
          </button>
          <p className="p-2">{quantity}</p>
          <button
            disabled={stock <= quantity}
            className="py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setQuantity(quantity + 1)}
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

      {quantity > stock && stock !== 0 ? (
        <p className="text-xs my-2 text-orange-700">
          Purchases exceed of available stock, Please contact us to ask more
          stock
        </p>
      ) : null}

      {quantity === stock ? (
        <p className="text-xs my-2 text-orange-700">
          You have reached the maksimun quantity available for this item. If you
          need more, please contact us
        </p>
      ) : null}
    </div>
  );
}
