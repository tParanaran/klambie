import Link from 'next/link';
import { IoNotifications } from 'react-icons/io5';

export default function NoticationButton() {
  return (
    <Link href={'/notification'}>
      <IoNotifications className="text-2xl hover:scale-125" />
    </Link>
  );
}
