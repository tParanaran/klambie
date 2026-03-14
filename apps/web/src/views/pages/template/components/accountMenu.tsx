import {
  IoGrid,
  IoHeartOutline,
  IoPerson,
  IoPower,
  IoReceiptOutline,
} from 'react-icons/io5';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import LogoutButton from './logoutButton';
import IconLink from './iconLink';

export default function AccountMenu() {
  const { user } = useAuthStore();

  const className =
    'flex items-center px-2 sm:px-5 py-1.5 hover:bg-orange-800 hover:text-[#ededed] w-full overflow-hidden';
  const iconClass = 'mr-2 text-lg';

  return (
    <div className="w-64 py-3 text-sm">
      <h1 className="px-2 sm:px-5 py-2 font-semibold">
        Hi, {user?.name || 'Guest'}
      </h1>

      {user?.role && user.role !== 6969 ? (
        <Link href={'/dashboard'} className={className}>
          <IoGrid className={iconClass} />
          <p>Dashboard</p>
        </Link>
      ) : null}

      <IconLink
        className={className}
        iconClass={iconClass}
        href={'/account'}
        name={'Account'}
        Icon={IoPerson}
      />

      <IconLink
        className={className}
        iconClass={iconClass}
        href={'/order'}
        name={'Order'}
        Icon={IoReceiptOutline}
      />

      <IconLink
        className={className}
        iconClass={iconClass}
        href={'/wishlist'}
        name={'Wishlist'}
        Icon={IoHeartOutline}
      />

      {user?.id ? (
        <LogoutButton
          className={className}
          name="Logout"
          iconClass={iconClass}
        />
      ) : (
        <Link href={'/register'} className={className}>
          <IoPower className={iconClass} /> Register
        </Link>
      )}
    </div>
  );
}
