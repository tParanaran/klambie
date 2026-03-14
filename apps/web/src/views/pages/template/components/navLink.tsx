import { useNavbarStore } from '@/store/navbarStore';
import { navLink } from '@/utils/navLink';
import Link from 'next/link';

export default function NavLink({
  classDiv,
  classLink,
}: {
  classDiv: string;
  classLink?: string;
}) {
  const { isClose } = useNavbarStore();

  return (
    <div className={classDiv}>
      {navLink.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className={`font-semibold uppercase ${classLink}`}
          onClick={isClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
