import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';

export default function DeliveryAddress() {
  const { user } = useAuthStore();
  return (
    <Link href={'/login'}>
      <div className="flex bg-black/10 dark:bg-white/10 rounded-2xl px-2 md:px-3 py-5 mb-5 space-x-2">
        <IoLocationOutline className="text-2xl" />
        <div>
          <p className="font-semibold">Delivery Address</p>
          <p className="text-sm text-red-800">
            Login/Register to Add an address (or) View saved addressed
          </p>
        </div>
      </div>
    </Link>
  );
}
