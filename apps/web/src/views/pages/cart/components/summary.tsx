'use client';
import { useCartQuery } from '../../p/hooks/useCartQuery';
import { ITotalPrice } from '../types';
import Rupiah from '@/utils/formatValue';

export default function CartSummary({
  totalPrice,
  selectedCount,
}: {
  totalPrice: ITotalPrice | null;
  selectedCount: number;
}) {
  const total = useCartQuery();

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <h1 className="font-semibold">
          Subtotal <span className="text-sm">{selectedCount} product(s)</span>
        </h1>
        <p>{Rupiah(totalPrice?.subTotal ?? '0')}</p>
      </div>

      {totalPrice?.discountTotal ? (
        <div>
          <h1>Total Saving</h1>
          <div className="flex justify-between opacity-50 flex-wrap text-sm">
            <h1>Discount on Sale</h1>
            <p>- {Rupiah(totalPrice.discountTotal ?? '0')}</p>
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
        <div className="text-orange-700 text-end">
          <p className="my-auto font-semibold">
            {Rupiah(totalPrice?.grandTotal ?? '0')}
          </p>
          {totalPrice?.discountTotal ? (
            <p className="text-xs">
              Saved {Rupiah(totalPrice.discountTotal ?? '0')}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
