import { IoGrid, IoReceiptOutline } from 'react-icons/io5';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import AccountButton from './accountButton';
import LogoutButton from './logoutButton';
import WishlistButton from './wishlistButton';

export default function AccountMenu({ isScroll }: { isScroll: boolean }) {
  const { user } = useAuthStore();

  const className =
    'flex items-center px-2 sm:px-5 py-1.5 hover:bg-orange-800 w-full overflow-hidden';
  const iconClass = 'mr-2 text-lg';

  return (
    <div
      className={`fixed z-30 mt-1 -0.5 sm:mt-1.5 left-3 right-3 sm:left-10 sm:right-10  lg:max-w-7xl lg:mx-auto
         ${isScroll ? 'top-14' : 'top-24'}`}
    >
      <div className="absolute text-[#ededed] right-0 h-fit w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 lg:mr-10 rounded-2xl">
        <div className="h-fit w-full bg-black/70 backdrop-blur-lg py-3 sm:py-5 text-sm rounded-2xl">
          <h1 className="px-2 sm:px-5 py-2 font-semibold">Hi, {user?.name}</h1>
          {user?.role !== 6969 ? (
            <Link href={'/dashboard'} className={className}>
              <IoGrid className={iconClass} />
              <p>Dashboard</p>
            </Link>
          ) : null}
          <AccountButton className={className} iconClass={iconClass} />
          <Link href={'/order'} className={className}>
            <IoReceiptOutline className="mr-2 text-lg" />
            <p>Order</p>
          </Link>
          <WishlistButton className={className} iconClass={iconClass} />
          <LogoutButton
            className={className}
            name="Logout"
            iconClass={iconClass}
          />
        </div>
      </div>
    </div>
  );
}
