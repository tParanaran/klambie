import { useRouter } from 'next/navigation';
import { useToast } from './useToast';
import axiosInstanceClient from '@/lib/axios/client';

export default function useActions(id: number) {
  const { toast, showToast } = useToast();
  const router = useRouter();

  const archive = async () => {
    try {
      const { data } = await axiosInstanceClient.patch(`/product/status/${id}`);

      showToast({
        message: data.message,
        type: 'success',
      });
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while change status.',
        type: 'error',
      });
    }
  };

  const deleteHandler = async () => {
    try {
      const { data } = await axiosInstanceClient.delete(
        `/product/delete/${id}`,
      );
      showToast({
        message: data.message,
        type: 'success',
      });
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while change status.',
        type: 'error',
      });
    }
  };

  const deleteVariant = async () => {
    try {
      const { data } = await axiosInstanceClient.delete(
        `/product/deleteVariant/${id}`,
      );
      showToast({
        message: data.message,
        type: 'success',
      });
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while change status.',
        type: 'error',
      });
    }
  };

  return { toast, router, archive, deleteHandler, deleteVariant };
}
