import Link from 'next/link';

interface ITagButton {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  active?: boolean;
  hexUrl?: string;
}

export default function TagButton({
  children,
  onClick,
  href,
  icon,
  className = '',
  active,
  hexUrl,
}: ITagButton) {
  const baseStyle =
    'px-2 py-1 text-sm rounded-full mt-1 text-light flex items-center cursor-pointer';

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
        className={`${baseStyle} ${className} ${active ? 'bg-active' : 'bg-orange-800 hover:bg-orange-700'}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className} ${active ? 'bg-active' : 'bg-orange-800 hover:bg-orange-700'}`}
      style={{ backgroundColor: `${hexUrl}` }}
    >
      {content}
    </button>
  );
}
