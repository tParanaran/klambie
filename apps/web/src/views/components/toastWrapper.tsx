'use client';

import { useToastStore } from '@/store/toastStore';
import ToastMessage from './toastMessage';

export default function ToastWrapper() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-3 right-3 lg:bottom-5 lg:right-5 flex flex-col gap-1 z-50">
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} {...toast} />
      ))}
    </div>
  );
}
