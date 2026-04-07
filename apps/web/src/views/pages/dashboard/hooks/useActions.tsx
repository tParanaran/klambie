import { useRouter } from 'next/navigation';
import { useToast } from './useToast';
import axiosInstanceClient from '@/lib/axios/client';
import { IEditVariants } from '../types';

export default function useActions(id: number, closeModal?: () => void) {
  const { toast, showToast } = useToast();
  const router = useRouter();

  const archive = async () => {
    try {
      const { data } = await axiosInstanceClient.patch(`/product/status/${id}`);

      showToast({
        message: data.message,
        type: 'success',
      });

      if (closeModal) closeModal();
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
      if (closeModal) closeModal();
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while delete product.',
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
      if (closeModal) closeModal();
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while delete variant.',
        type: 'error',
      });
    }
  };

  const updateVariant = async (newData: IEditVariants) => {
    try {
      const { data } = await axiosInstanceClient.patch(
        `/product/updateVariant/${id}`,
        { ...newData },
      );
      showToast({
        message: data.message,
        type: 'success',
      });
      if (closeModal) closeModal();
      router.refresh();
    } catch (error: any) {
      showToast({
        message: error.message || 'Something went wrong while update data.',
        type: 'error',
      });
    }
  };

  return {
    toast,
    router,
    archive,
    deleteHandler,
    deleteVariant,
    updateVariant,
  };
}
