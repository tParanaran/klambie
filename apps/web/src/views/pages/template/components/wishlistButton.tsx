import Link from 'next/link';
import { IoHeartOutline } from 'react-icons/io5';

export default function WishlistButton({
  className,
  iconClass,
}: {
  className: string;
  iconClass: string;
}) {
  return (
    <Link href={'/wishlist'} className={className}>
      <IoHeartOutline className={iconClass} />
      <p>Wishlist</p>
    </Link>
  );
}
