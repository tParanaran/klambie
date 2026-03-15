'use client';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { IoPower } from 'react-icons/io5';
import { Notify } from '@/lib/notify';
import axiosInstanceClient from '@/lib/axios/client';

export default function LogoutButton({
  className,
  iconClass,
  name,
}: {
  className?: string;
  iconClass: string;
  name?: string;
}) {
  const redirect = useRouter();
  const { clearAuth } = useAuthStore();

  const LogoutHandler = async () => {
    try {
      const { data } = await axiosInstanceClient.post('/auth/logout');

      if (data.success) {
        clearAuth();
        redirect.push('/login');
        Notify(data.message);
      }
    } catch (error) {
      Notify(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <button className={className} onClick={LogoutHandler} aria-label="Logout">
      <IoPower className={iconClass} /> {name}
    </button>
  );
}
