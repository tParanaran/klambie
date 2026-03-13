import Link from 'next/link';
import { IoBagHandle } from 'react-icons/io5';
import CartBadge from '../pages/product/components/badge';

export default function BagIcon() {
  return (
    <div className="relative">
      <Link href={'/cart'} aria-label="Cart">
        <IoBagHandle className="text-2xl hover:scale-125" />
        <div className="absolute -top-4 -right-2">
          <CartBadge />
        </div>{' '}
      </Link>
    </div>
  );
}
