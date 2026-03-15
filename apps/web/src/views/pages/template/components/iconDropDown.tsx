import { IoSearch, IoPerson, IoNotifications } from 'react-icons/io5';
import { useProfileStore } from '@/store/profileStore';
import { useRef, useState } from 'react';
import BagButton from './bagButton';
import AccountMenu from './accountMenu';
import NotificationContent from '../notification';
import SearchForm from './searchBar';
import SearchRecent from './searchRecent';
import AnchorIconDropdown from './dropdown';
import BagMenu from './bagMenu';

export default function IconDropdown() {
  const { isClose, isProfile, isOpen } = useProfileStore();
  const accountRef = useRef<HTMLButtonElement>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLButtonElement>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLButtonElement>(null);

  const notificationHandler = () => {
    setShowNotification(!showNotification);
  };

  const searchHandler = () => {
    setShowSearch(!showSearch);
  };

  const accountHandler = () => {
    if (isProfile) {
      isClose();
    } else {
      isOpen();
    }
  };

  return (
    <div className="flex space-x-3 text-2xl">
      <AnchorIconDropdown
        HandlerModal={searchHandler}
        showModal={showSearch}
        ref={searchRef}
        Icon={IoSearch}
        label="Search"
      >
        <div className="w-sm h-fit max-h-[75vh] overflow-y-auto scrollbar-hide p-5">
          <SearchForm showSearch={showSearch} />
          <SearchRecent />
        </div>
      </AnchorIconDropdown>

      <BagMenu />

      <AnchorIconDropdown
        HandlerModal={notificationHandler}
        showModal={showNotification}
        ref={notificationRef}
        Icon={IoNotifications}
        label="Notification"
      >
        <div className="w-sm h-fit max-h-[75vh] overflow-y-auto scrollbar-hide">
          <NotificationContent />
        </div>
      </AnchorIconDropdown>

      <AnchorIconDropdown
        HandlerModal={accountHandler}
        showModal={isProfile}
        ref={accountRef}
        Icon={IoPerson}
        label="Account"
      >
        <AccountMenu />
      </AnchorIconDropdown>
    </div>
  );
}
