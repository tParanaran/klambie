'use client';
import { useNavbarStore } from '@/store/navbarStore';
import { IoMenu } from 'react-icons/io5';

export default function MobileButton() {
  const navbar = useNavbarStore();

  return (
    <button
      className="text-2xl hover:bg-black rounded-md p-1 bg-black/90 text-[#ededed]"
      type="button"
      aria-label="Open Menu"
      onClick={navbar.isOpen}
    >
      <IoMenu />
    </button>
  );
}
