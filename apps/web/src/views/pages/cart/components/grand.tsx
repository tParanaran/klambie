import Rupiah from '@/utils/rupiah';
import { ITotalPrice } from '../types';

export default function GrandPrice({ price }: { price: ITotalPrice | null }) {
  return (
    <div className="text-orange-700 text-end">
      <p className="my-auto font-semibold">
        {Rupiah(price?.grandTotal ?? '0')}
      </p>
      {price?.discountTotal ? (
        <p className="text-xs">Saved {Rupiah(price.discountTotal ?? '0')}</p>
      ) : null}
    </div>
  );
}
