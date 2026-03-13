import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import AccountButton from './components/accountButton';

import WishlistButton from './components/wishlistButton';
import BagButton from './components/bagButton';

export default function NavbarMobile() {
  return (
    <nav className="fixed md:hidden z-40 bottom-0 left-0 right-0 text-[#ededed] bg-black/80 backdrop-blur-lg px-3 sm:px-10 py-4 max-h-[70vh] overflow-y-auto text-sm sm:text-md">
      <div className="flex items-center space-x-4 justify-between">
        <Link href={'/'} className="flex flex-col items-center justify-center">
          <Image
            src="/icon.svg"
            alt="Klambie"
            height={20}
            width={20}
            className="transition-transform hover:scale-125"
          />

          <p className="text-xs">Klambie</p>
        </Link>

        <div className="flex flex-col items-center justify-center">
          <BiCategory className="text-2xl transition-transform hover:scale-125" />
          <p className="text-xs">Categories</p>
        </div>

        <div>
          <BagButton />
          <p className="text-xs">Bag</p>
        </div>

        <WishlistButton
          className={'flex flex-col items-center justify-center text-xs'}
          iconClass={'text-2xl transition-transform hover:scale-125'}
        />

        <AccountButton
          className={'flex flex-col items-center justify-center text-xs'}
          iconClass={'text-2xl transition-transform hover:scale-125'}
        />
      </div>
    </nav>
  );
}
