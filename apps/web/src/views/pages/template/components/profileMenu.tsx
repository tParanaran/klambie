import { IoReceiptOutline } from 'react-icons/io5';
import Link from 'next/link';
import ProfileButton from './profileButton';
import LogoutButton from '@/views/components/logoutButton';

export default function ProfileMenu({ isScroll }: { isScroll: boolean }) {
  return (
    <div
      className={`fixed z-30 mt-1 -0.5 sm:mt-1.5 left-3 right-3 sm:left-10 sm:right-10  lg:max-w-7xl lg:mx-auto
         ${isScroll ? 'top-14' : 'top-24'}`}
    >
      <div className="absolute text-[#ededed] right-0 h-fit w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 lg:mr-10 rounded-2xl">
        <div className="h-fit w-full bg-black/70 backdrop-blur-lg py-3 sm:py-5 text-sm rounded-2xl">
          <ProfileButton className="flex items-center px-2 sm:px-5 py-1.5 hover:bg-orange-800 overflow-hidden" />
          <Link
            href={'/account/order'}
            className="hover:bg-orange-800 px-2 sm:px-5 py-1.5 flex items-center overflow-hidden"
          >
            <IoReceiptOutline className="mr-2 text-lg" />
            <p>Order</p>
          </Link>
          <LogoutButton className="hover:bg-orange-800 px-2 sm:px-5 py-1.5 text-semibold w-full text-left flex items-center overflow-hidden" />
        </div>
      </div>
    </div>
  );
}
