import Rupiah from '@/utils/rupiah';
import { ITotalPrice } from '../types';

export default function GrandPrice({ price }: { price: ITotalPrice }) {
  const { grandTotal, discountTotal } = price;

  return (
    <div className="text-orange-700 text-end">
      <p className="my-auto font-semibold">{Rupiah(grandTotal)}</p>
      <p className="text-xs">Saved {Rupiah(discountTotal)}</p>
    </div>
  );
}
