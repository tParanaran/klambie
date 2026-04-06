import { useEffect, useState } from 'react';

interface IToastProps {
  style?: string;
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

export default function ToastMessage({
  message,
  type,
  visible,
  style,
}: IToastProps) {
  if (!visible) return null;

  const [shouldRender, setShouldRender] = useState<boolean>(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!shouldRender) return null;

  const bgColor = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-gray-800',
  }[type];

  return (
    <div
      className={`
        z-50 ${style}
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
    >
      <p
        className={`${bgColor} text-white text-sm px-4 py-1.5 rounded-full shadow-lg`}
      >
        {message}
      </p>
    </div>
  );
}
