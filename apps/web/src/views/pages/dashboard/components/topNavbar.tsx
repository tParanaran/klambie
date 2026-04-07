import { IoGrid, IoPerson, IoSearch } from 'react-icons/io5';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import Notification from '../../template/notification';
import Link from 'next/link';
import SideNavbar from './sideNavbar';
import ModalContainer from '@/views/components/modalContainer';

const className = 'p-2.5 rounded-full bg-black/15 dark:bg-white/10';
const classIcon =
  'text-2xl transition-transform hover:scale-125 hover:text-orange-800 hover:dark:text-orange-700';

export default function TopNavbar() {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const { user } = useAuthStore();

  return (
    <>
      <nav className="sticky flex justify-between flex-nowrap flex-row md:flex-row-reverse top-0 left-0 right-0 px-3 max-w-screen text-sm overflow-y-scroll scrollbar-hide space-x-2 py-3 md:py-5 bg-dashboard">
        <div className="flex space-x-1 items-start">
          <button
            className={`${className} block md:hidden`}
            onClick={() => setShowNavbar(!showNavbar)}
          >
            <IoGrid className={classIcon} />
          </button>
          <Link href={'/account'} className={className}>
            <IoSearch className={classIcon} />
          </Link>

          <Link href={'/account'} className={className}>
            <IoPerson className={classIcon} />
          </Link>

          <div className="px-2.5 bg-black/15 dark:bg-white/10 rounded-full">
            <Notification />
          </div>
        </div>
        <div className="h-10 sm:h-12 overflow-hidden text-end sm:text-start">
          <h1 className="text-sm sm:text-base md:text-xl font-semibold">
            Welcome,{' '}
            <span className="text-orange-800 dark:text-orange-700">
              {user?.name.split(' ')[0]}
            </span>
          </h1>
          <p className="text-sm opacity-70 truncate">
            {formatDate(new Date().toLocaleString())}
          </p>
        </div>
      </nav>

      {showNavbar && (
        <ModalContainer
          isFilter={true}
          showModal={showNavbar}
          handlerModal={() => setShowNavbar(!showNavbar)}
          style="fixed top-0 bottom-0 text-secondary bg-secondary-opacity shadow-xs backdrop-blur-xl rounded-2xl"
        >
          <div className="flex">
            <SideNavbar />
          </div>
        </ModalContainer>
      )}
    </>
  );
}
