import { IoSearch, IoPerson, IoNotifications } from 'react-icons/io5';
import { Suspense, useRef, useState } from 'react';
import AccountMenu from './accountMenu';

import SearchRecent from './searchRecent';
import AnchorIconDropdown from './dropdown';
import BagMenu from './bagMenu';
import SearchBar from './searchBar';
import NotificationContent from './notificationContent';

interface IDropdown {
  search: boolean;
  notification: boolean;
  account: boolean;
}

export default function IconDropdown() {
  const [dropdowns, setDropdowns] = useState<IDropdown>({
    search: false,
    notification: false,
    account: false,
  });

  const dropdownRefs = {
    search: useRef<HTMLButtonElement>(null),
    notification: useRef<HTMLButtonElement>(null),
    account: useRef<HTMLButtonElement>(null),
  };

  const toggleDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="flex space-x-3 text-xs">
      <AnchorIconDropdown
        HandlerModal={() => toggleDropdown('search')}
        showModal={dropdowns.search}
        ref={dropdownRefs.search}
        Icon={IoSearch}
        label="Search"
      >
        {' '}
        <Suspense fallback={<div style={{ width: '384px' }} />}>
          <div className="w-sm h-fit max-h-[75vh] overflow-y-auto scrollbar-hide p-3">
            <SearchBar showSearch={dropdowns.search} />
            <SearchRecent />
          </div>{' '}
        </Suspense>
      </AnchorIconDropdown>

      <BagMenu />

      <AnchorIconDropdown
        HandlerModal={() => toggleDropdown('notification')}
        showModal={dropdowns.notification}
        ref={dropdownRefs.notification}
        Icon={IoNotifications}
        label="Notification"
      >
        <div className="w-sm h-fit max-h-[75vh] overflow-y-auto scrollbar-hide">
          <NotificationContent />
        </div>
      </AnchorIconDropdown>

      <AnchorIconDropdown
        HandlerModal={() => toggleDropdown('account')}
        showModal={dropdowns.account}
        ref={dropdownRefs.account}
        Icon={IoPerson}
        label="Account"
      >
        <AccountMenu />
      </AnchorIconDropdown>
    </div>
  );
}
