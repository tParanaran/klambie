import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

interface ISeeMoreButton {
  href: string;
  name: string;
  style?: string;
}

export default function SeeMoreButton({ href, name, style }: ISeeMoreButton) {
  return (
    <Link
      href={href}
      className={`flex w-44 justify-between bg-primary rounded-full pl-3 py-1 items-center uppercase mt-3 relative max-w-full ${style}`}
    >
      <h1 className="flex-none text-sm text-orange-700">{name}</h1>
      <span className="text-2xl p-1 rounded-full flex-none mx-1 text-light bg-round-button">
        <IoArrowForward />
      </span>
    </Link>
  );
}
