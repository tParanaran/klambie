interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled,
  loading,
  className = '',
}: IButton) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded-full py-2 sm:py-3 px-4 font-semibold text-[#ededed] uppercase w-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={children?.toString()}
    >
      {children}
    </button>
  );
}
