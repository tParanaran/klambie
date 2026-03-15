import { IoBagHandle } from 'react-icons/io5';
import Link from 'next/link';
import CartBadge from '../../product/components/badge';

export default function BagButton({ isMobile = true }: { isMobile?: boolean }) {
  const content = (
    <>
      <IoBagHandle className="text-2xl hover:scale-125" />
      <p className="text-xs">Bag</p>
      <div className="absolute -top-1 -right-2">
        <CartBadge />
      </div>
    </>
  );

  return (
    <div className="relative">
      {isMobile ? (
        <Link href="/cart" aria-label="Bag Menu">
          {content}
        </Link>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}
