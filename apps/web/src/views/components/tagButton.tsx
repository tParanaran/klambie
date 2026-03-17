import Link from 'next/link';

interface ITagButton {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  active?: boolean;
}

export default function TagButton({
  children,
  onClick,
  href,
  icon,
  className = '',
  active,
}: ITagButton) {
  const baseStyle =
    'px-3 py-1 text-sm rounded-full mt-1 text-[#ededed] flex items-center cursor-pointer';

  const content = (
    <>
      {icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyle} ${className} ${active ? 'bg-[#FF4500]' : 'bg-orange-800 hover:bg-orange-700'}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className} ${active ? 'bg-[#FF4500]' : 'bg-orange-800 hover:bg-orange-700'}`}
    >
      {content}
    </button>
  );
}
