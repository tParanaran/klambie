import Link from 'next/link';
import { IoPersonOutline } from 'react-icons/io5';

export default function ProfileButton({ className }: { className: string }) {
  return (
    <Link href={'/account'} className={className}>
      <IoPersonOutline className="mr-2 text-lg" />
      <p>Profile</p>{' '}
    </Link>
  );
}
