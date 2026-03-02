import { IPrice } from '@/views/pages/product/types/product.types';

export default function ProductPrice({ price }: { price: IPrice }) {
  const { hasDiscount, finalPrice, originalPrice, discountPercentage } = price;
  return (
    <>
      <p className="font-semibold text-orange-700">
        {hasDiscount ? finalPrice : originalPrice}
      </p>

      {hasDiscount ? (
        <p className="font-semibold opacity-50 line-through">{originalPrice}</p>
      ) : null}

      {hasDiscount ? (
        <p className="text-light text-[#ededed] bg-red-700 rounded-md py-0.5 px-1 w-fit">
          {discountPercentage}
        </p>
      ) : null}
    </>
  );
}
