import { IoSearch, IoPerson, IoBagHandle } from 'react-icons/io5';
import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function IconLink() {
  const profile = useProfileStore();
  const authStore = useAuthStore();
  const redirect = useRouter();

  const ProfileHandler = () => {
    if (authStore.user) {
      profile.isOpen();
    } else {
      redirect.push('/login');
    }
  };

  return (
    <div className="flex space-x-2 text-2xl">
      <button aria-label="Search" className="hover:scale-125">
        <IoSearch />
      </button>
      <div className="relative hover:scale-125">
        <Link href={'/cart'} aria-label="Cart">
          <IoBagHandle />
        </Link>
        <div className="absolute top-0 -right-2 text-xs px-1 text-[#ededed] rounded-full bg-orange-700">
          1
        </div>
      </div>
      <button
        aria-label="Profile"
        onClick={ProfileHandler}
        className="hover:scale-125"
      >
        <IoPerson />
      </button>
    </div>
  );
}
