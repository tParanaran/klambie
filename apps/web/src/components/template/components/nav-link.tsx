import { useNavbarStore } from '@/store/navbar-store';
import Link from 'next/link';

export default function NavLink({
  classDiv,
  classLink,
}: {
  classDiv: string;
  classLink: string;
}) {
  const navbar = useNavbarStore();

  const link = [
    { id: 1, name: 'About', href: '/about' },
    { id: 2, name: 'Shop', href: '/shop' },
    { id: 3, name: 'Men', href: '/men' },
    { id: 4, name: 'Women', href: '/women' },
    { id: 5, name: 'Kids', href: '/kids' },
    { id: 6, name: 'Contact', href: '/contact' },
  ];
  return (
    <div className={classDiv}>
      {link.map((item, idx) => (
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
