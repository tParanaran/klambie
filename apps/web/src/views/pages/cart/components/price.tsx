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
      {hasDiscount ? (
        <p className="font-semibold text-orange-700">{Rupiah(totalPrice)}</p>
      ) : null}

      {hasDiscount ? (
        <p className="font-semibold opacity-50 line-through">
          {Rupiah(subtotal)}
        </p>
      ) : (
        <p className="font-semibold text-orange-700">{Rupiah(totalPrice)}</p>
      )}

      {hasDiscount ? (
        <p className="text-light text-[#ededed] bg-red-700 rounded-md py-0.5 px-1 w-fit">
          -{Rupiah(discount)}
        </p>
      ) : null}
    </>
  );
}
