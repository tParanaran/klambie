'use client';
import { useCartQuery } from '../../product/hooks/useCartQuery';
import { ITotalPrice } from '../types';
import GrandPrice from './grand';
import Rupiah from '@/utils/rupiah';

export default function CartSummary({
  totalPrice,
  selectedCount,
}: {
  totalPrice: ITotalPrice;
  selectedCount: number;
}) {
  const total = useCartQuery();

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <h1 className="font-semibold">
          Subtotal <span className="text-sm">{selectedCount} product(s)</span>
        </h1>
        {totalPrice && <p>{Rupiah(totalPrice.subTotal ?? 0)}</p>}
      </div>

      {totalPrice && totalPrice.discountTotal ? (
        <div>
          <h1>Total Saving</h1>
          <div className="flex justify-between opacity-50 flex-wrap text-sm">
            <h1>Discount on Sale</h1>
            <p>- {Rupiah(totalPrice.discountTotal ?? 0)}</p>
          </div>
        </div>
      ) : null}

      {/* {detailsVoucher.length > 0 ? (
        <div className="my-2">
          <h1>Voucher Applied</h1>
          {detailsVoucher.map((item, idx) => (
            <div key={idx}>
              {item.value > 0 ? (
                <div className="flex justify-between opacity-50 flex-wrap text-sm">
                  <h1>{item.voucherName}</h1>
                  <p>- {CurrencyFormatter(item.value).toString()}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null} */}

      <div className="flex justify-between items-center flex-wrap">
        <h1>Shipping</h1>
        <p className="text-sm">Calculate after checkout</p>
      </div>
      <div className="flex justify-between flex-wrap">
        <h1 className="font-semibold">Total</h1>
        {totalPrice && <GrandPrice price={totalPrice} />}
      </div>
    </>
  );
}
