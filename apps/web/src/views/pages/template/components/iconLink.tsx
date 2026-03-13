import { IoSearch, IoPerson, IoBagHandle } from 'react-icons/io5';
import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import NoticationButton from './notificationButton';
import BagButton from './bagButton';

export default function IconLink() {
  const { isOpen } = useProfileStore();
  const { user } = useAuthStore();
  const redirect = useRouter();

  const ProfileHandler = () => {
    if (user) {
      isOpen();
    } else {
      redirect.push('/login');
    }
  };

  return (
    <div className="flex space-x-3 text-2xl">
      <button aria-label="Search" className="hover:scale-125">
        <IoSearch />
      </button>
      <BagButton />
      <NoticationButton />
      <button
        aria-label="Account"
        onClick={ProfileHandler}
        className="hover:scale-125"
      >
        <IoPerson />
      </button>
    </div>
  );
}
