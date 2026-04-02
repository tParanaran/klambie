import Link from 'next/link';
import { IconType } from 'react-icons';

interface IIconLink {
  className?: string;
  iconClass: string;
  href: string;
  name: string;
  Icon: IconType;
}

export default function IconLink({
  className,
  iconClass,
  href,
  name,
  Icon,
}: IIconLink) {
  return (
    <Link href={href} className={className}>
      <Icon className={iconClass} />
      <p>{name}</p>{' '}
    </Link>
  );
}
