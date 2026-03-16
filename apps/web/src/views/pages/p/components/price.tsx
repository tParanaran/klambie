import Rupiah from '@/utils/rupiah';
import { IPrice } from '@/views/pages/p/types/product.types';

interface IProductPrice {
  price: IPrice;
  hasDiscount: boolean;
}

export default function ProductPrice({ price, hasDiscount }: IProductPrice) {
  const { finalPrice, originalPrice, discountPercentage } = price;

  return (
    <>
      <p className="font-semibold text-orange-700">
        {hasDiscount ? Rupiah(finalPrice) : Rupiah(originalPrice)}
      </p>

      {hasDiscount ? (
        <p className="font-semibold opacity-50 line-through">
          {Rupiah(originalPrice)}
        </p>
      ) : null}

      {hasDiscount ? (
        <p className="text-light text-[#ededed] bg-red-700 rounded-md py-0.5 px-1 w-fit">
          -{discountPercentage}%
        </p>
      ) : null}
    </>
  );
}
