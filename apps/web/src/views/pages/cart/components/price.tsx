import Rupiah from '@/utils/rupiah';
import { IPrice } from '../types';

export default function CartPrice({
  price,
  hasDiscount,
  isUnavailable = false,
}: {
  price: IPrice;
  hasDiscount: boolean;
  isUnavailable?: boolean;
}) {
  const { subtotal, discount, totalPrice } = price;

  const priceClass = `font-semibold  ${isUnavailable ? 'text-gray-400' : 'text-orange-700'}`;

  return (
    <>
      {hasDiscount && <p className={priceClass}>{Rupiah(totalPrice)}</p>}

      {hasDiscount ? (
        <p className="font-semibold opacity-50 line-through">
          {Rupiah(subtotal)}
        </p>
      ) : (
        <p className={priceClass}>{Rupiah(totalPrice)}</p>
      )}

      {hasDiscount && (
        <p
          className={`text-light text-xs text-light rounded-md py-1 px-2 w-fit  ${isUnavailable ? 'bg-gray-500' : 'bg-red-800'}`}
        >
          Saved {Rupiah(discount)}
        </p>
      )}
    </>
  );
}
