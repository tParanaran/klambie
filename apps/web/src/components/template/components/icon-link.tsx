import { IoSearch, IoPerson, IoBagHandle } from 'react-icons/io5';
import { useProfileStore } from '@/store/profile-store';
import Link from 'next/link';

export default function IconLink() {
  const profile = useProfileStore();

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
        onClick={profile.isOpen}
        className="hover:scale-125"
      >
        <IoPerson />
      </button>
    </div>
  );
}
