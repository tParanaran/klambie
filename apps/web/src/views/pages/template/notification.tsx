import { useAuthStore } from '@/store/authStore';
import LinkButton from '@/views/components/link';
import { IoNotificationsOutline } from 'react-icons/io5';

export default function NotificationContent() {
  const { user } = useAuthStore();

  return (
    <div className="p-3">
      <div className="space-y-5 w-full mx-auto text-center my-20">
        <div className="text-6xl p-10 sm:text-8xl sm:p-14 rounded-full bg-black/10 w-fit mx-auto">
          <IoNotificationsOutline />
        </div>
        <div>
          <h1 className="font-semibold">
            {user?.id
              ? 'Woowee! No notification yet'
              : 'Woowee! You are missing out'}
          </h1>
          <p>
            {user?.id
              ? 'Important updates and exclusive offers will be posted here.'
              : 'Log in to view personalized notifications and offers'}
          </p>
        </div>
        <div>
          {user?.id ? (
            <LinkButton linkName="Let's go shopping!" linkHref={'/d/men'} />
          ) : (
            <LinkButton linkName="Login" linkHref={'/login'} />
          )}
        </div>
      </div>
    </div>
  );
}
