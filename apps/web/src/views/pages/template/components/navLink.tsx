import { useNavbarStore } from '@/store/navbar-store';
import { navLink } from '@/utils/navLink';
import Link from 'next/link';

export default function NavLink({
  classDiv,
  classLink,
}: {
  classDiv: string;
  classLink: string;
}) {
  const navbar = useNavbarStore();

  return (
    <div className={classDiv}>
      {navLink.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className={`font-semibold uppercase ${classLink}`}
          onClick={navbar.isClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
