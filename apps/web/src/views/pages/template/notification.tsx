import { useRef, useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import AnchorIconDropdown from './components/dropdown';
import NotificationContent from './components/notificationContent';
import useDetectIsMobile from './hooks/useDetectIsMobile';
import useMobileBehavior from './hooks/useMobile';

export default function Notification() {
  const { isMobile } = useDetectIsMobile({});
  const [notification, setNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setNotification(!notification);
  };

  useMobileBehavior({
    setShow: () => toggleDropdown(),
    show: notification,
    ref: notificationRef,
    isMobile: isMobile,
  });

  return (
    <AnchorIconDropdown
      HandlerModal={() => toggleDropdown()}
      showModal={notification}
      ref={notificationRef}
      Icon={IoNotifications}
      align={isMobile ? 'default' : 'right'}
      zIndex={isMobile ? 'z-10' : 'z-30'}
    >
      <div
        className={`overflow-y-auto scrollbar-hide p-3 ${isMobile ? 'w-screen h-screen mt-14 max-h-[93vh]' : 'w-sm h-fit max-h-[75vh]'}`}
      >
        <NotificationContent />
      </div>
    </AnchorIconDropdown>
  );
}
