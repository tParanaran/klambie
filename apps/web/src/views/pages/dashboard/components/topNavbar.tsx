import formatDate from '@/utils/formatDate';
import useScrolled from '../../template/hooks/useScrolled';
import { useAuthStore } from '@/store/authStore';
import Notification from '../../template/notification';
import { IoGrid, IoPerson, IoSearch } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';
import SideNavbar from './sideNavbar';
import ModalContainer from '@/views/components/modalContainer';

const className = 'p-2.5 rounded-full bg-body';
const classIcon = 'text-2xl transition-transform hover:scale-125';

export default function TopNavbar() {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const isScroll = useScrolled();
  const { user } = useAuthStore();

  return (
    <>
      <nav
        style={{
          height: isScroll ? 'auto' : 110,
        }}
        className={`sticky flex justify-between flex-nowrap top-0 left-0 right-0 z-30 px-3 text-sm space-x-3 overflow-hidden ${isScroll ? 'py-2 text-secondary bg-secondary-opacity backdrop-blur-xl shadow-xs' : 'pt-3 md:pt-5'} `}
      >
        <div className="overflow-hidden h-10 sm:h-12">
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
        <div className="flex space-x-1 items-start">
          <button
            className={`${className} block sm:hidden`}
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

          <div className="px-2.5 bg-body rounded-full">
            <Notification />
          </div>
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
