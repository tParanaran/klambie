'use client';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { IoPower } from 'react-icons/io5';
import axiosInstanceClient from '@/lib/axios/client';
import ToastMessage from '@/views/components/toastMessage';
import { useToast } from '../../dashboard/hooks/useToast';

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
  const { toast, showToast } = useToast();
  const { clearAuth } = useAuthStore();

  const LogoutHandler = async () => {
    try {
      const { data } = await axiosInstanceClient.post('/auth/logout');

      if (data.success) {
        clearAuth();
        redirect.push('/');
        showToast({
          type: 'success',
          message: data.message,
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <>
      {' '}
      <button className={className} onClick={LogoutHandler} aria-label="Logout">
        <IoPower className={iconClass} /> {name}
      </button>
      {toast.visible && (
        <ToastMessage {...toast} style="fixed bottom-3 right-3" />
      )}
    </>
  );
}
