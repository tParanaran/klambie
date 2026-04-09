interface IToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ToastMessage({ message, type }: IToastProps) {
  const bgColor = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-gray-800',
  }[type];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2  transition-all duration-300">
      <p
        className={`${bgColor} text-white text-sm px-4 py-1.5 rounded-full shadow-lg`}
      >
        {message}
      </p>
    </div>
  );
}
