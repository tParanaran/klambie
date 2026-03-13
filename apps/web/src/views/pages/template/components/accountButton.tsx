import Link from 'next/link';
import { IoPersonOutline } from 'react-icons/io5';

export default function AccountButton({
  className,
  iconClass,
}: {
  className: string;
  iconClass: string;
}) {
  return (
    <Link href={'/account'} className={className}>
      <IoPersonOutline className={iconClass} />
      <p>Account</p>{' '}
    </Link>
  );
}
