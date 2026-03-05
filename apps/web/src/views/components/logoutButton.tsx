'use client';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { useRouter } from 'next/navigation';
import { IoPower } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutButton({ className }: { className: string }) {
  const redirect = useRouter();
  const { clearAuth } = useAuthStore();
  const { isClose } = useProfileStore();
  const queryClient = useQueryClient();

  const LogoutHandler = async () => {
    await clearAuth();
    isClose();
    queryClient.removeQueries({ queryKey: ['cart'] });
    redirect.push('/login');
  };

  return (
    <button className={className} onClick={LogoutHandler} aria-label="Logout">
      <IoPower className="mr-2 text-lg" /> Log out
    </button>
  );
}
