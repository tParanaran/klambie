'use client';
import { useState, useRef } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

export interface ShowToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

export function useToast(defaultDuration = 3000) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    visible: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = ({
    message,
    type = 'info',
    duration,
  }: ShowToastOptions) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({
      message,
      type,
      visible: true,
    });

    const finalDuration = duration ?? defaultDuration;

    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, finalDuration);
  };

  return { toast, showToast };
}
