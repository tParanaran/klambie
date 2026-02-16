import { antonFont } from '@/utils/fonts';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex space-x-1 text-2xl sm:text-3xl items-center">
      <Link href={'/'}>
        <Image
          loading="lazy"
          src={'/icon.svg'}
          alt={'Klambie icon'}
          width={25}
          height={25}
          className="w-7 sm:w-8 h-auto"
        />
      </Link>

      <Link href={'/'}>
        <h1 className={`font-extrabold uppercase ${antonFont.className}`}>
          Klambie
        </h1>
      </Link>
    </div>
  );
}
