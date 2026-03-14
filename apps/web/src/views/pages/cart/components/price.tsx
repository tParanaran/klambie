import Rupiah from '@/utils/rupiah';
import { IPrice } from '../types';

export default function CartPrice({
  price,
  hasDiscount,
}: {
  price: IPrice;
  hasDiscount: boolean;
}) {
  const { subtotal, discount, totalPrice } = price;

  return (
    <>
      {hasDiscount && (
        <p className="font-semibold text-orange-700">{Rupiah(totalPrice)}</p>
      )}

      {hasDiscount ? (
        <p className="font-semibold opacity-50 line-through">
          {Rupiah(subtotal)}
        </p>
      ) : (
        <p className="font-semibold text-orange-700">{Rupiah(totalPrice)}</p>
      )}

      {hasDiscount && (
        <p className="text-light text-xs text-[#ededed] bg-red-800 rounded-md py-1 px-2 w-fit">
          Saved {Rupiah(discount)}
        </p>
      )}
    </>
  );
}
