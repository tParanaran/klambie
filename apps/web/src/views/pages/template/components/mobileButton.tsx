'use client';
import { useNavbarStore } from '@/store/navbarStore';
import { BiCategory } from 'react-icons/bi';

export default function MobileButton() {
  const { isOpen } = useNavbarStore();

  return (
    <button
      className="text-2xl hover:bg-black rounded-md p-1 bg-black/90 text-[#ededed]"
      type="button"
      aria-label="Open Menu"
      onClick={isOpen}
    >
      <BiCategory />
    </button>
  );
}
