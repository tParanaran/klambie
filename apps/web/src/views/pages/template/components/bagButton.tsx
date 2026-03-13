import { IoBagHandle } from 'react-icons/io5';
import Link from 'next/link';
import CartBadge from '../../product/components/badge';

export default function BagButton() {
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
