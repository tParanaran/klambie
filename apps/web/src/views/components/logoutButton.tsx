'use client';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { useRouter } from 'next/navigation';
import { IoPower } from 'react-icons/io5';
import { Notify } from '@/lib/notify';
import axiosInstanceClient from '@/lib/axios/client';

export default function LogoutButton({ className }: { className: string }) {
  const redirect = useRouter();
  const { clearAuth } = useAuthStore();
  const { isClose } = useProfileStore();

  const LogoutHandler = async () => {
    try {
      const { data } = await axiosInstanceClient.post('/auth/logout');

      if (data.success) {
        clearAuth();
        isClose();
        redirect.push('/login');
        Notify(data.message);
      }
    } catch (error) {
      Notify((error as Error).message);
    }
  };

  return (
    <button className={className} onClick={LogoutHandler} aria-label="Logout">
      <IoPower className="mr-2 text-lg" /> Log out
    </button>
  );
}
